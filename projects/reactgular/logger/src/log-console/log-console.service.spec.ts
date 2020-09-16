import {TestBed} from '@angular/core/testing';
import {MockConsole} from '../../test/mock-console';
import {LogService} from '../log/log.service';
import {ConsoleNoop, LOGGER_ALL, LOGGER_CONSOLE, LOGGER_LEVELS, LOGGER_TAILS, LOGGER_TAILS_DEFAULT} from '../logger-types';
import {LogConsoleService} from './log-console.service';

describe(LogConsoleService.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: LogService, useClass: LogConsoleService},
                {provide: LOGGER_LEVELS, useValue: LOGGER_ALL},
                {provide: LOGGER_TAILS, useValue: LOGGER_TAILS_DEFAULT},
                {provide: LOGGER_CONSOLE, useValue: new MockConsole()}
            ]
        });
    });

    describe('console', () => {
        MockConsole.METHODS.forEach(name => {
            it(`should call console.${name}() method`, () => {
                const mock: MockConsole = TestBed.inject<MockConsole>(LOGGER_CONSOLE);
                const log: LogService = TestBed.inject(LogService);
                const args = ['hello world'];

                expect(typeof log[name]).toBe('function');
                log[name](...args);

                expect(mock.buffer).toEqual([{name, args}]);
            });

            it(`should not call console.${name} when disabled`, () => {
                const log = TestBed.configureTestingModule({
                    providers: [
                        {provide: LOGGER_LEVELS, useValue: 0}
                    ]
                }).inject(LogService);
                const mock: MockConsole = TestBed.inject<MockConsole>(LOGGER_CONSOLE);

                log[name]('hello world');

                expect(mock.buffer).toEqual([]);
            });
        });
    });

    describe('method()', () => {
        it('should use ConsoleNoop for unsupported methods', () => {
            const log: LogConsoleService = TestBed.inject(LogService) as LogConsoleService;
            expect(log.method('example')).toBe(ConsoleNoop);
        });

        it('should bind console methods', () => {
            const log: LogConsoleService = TestBed.inject(LogService) as LogConsoleService;
            MockConsole.METHODS.forEach(name => {
                expect(log.method(name)).not.toBe(ConsoleNoop);
            });
        });
    });
});
