import {TestBed} from '@angular/core/testing';
import {MockConsole} from '../../tests/mock-console';
import {LOGGER_ALL, LOGGER_CONSOLE, LOGGER_LEVELS, LOGGER_TAILS, LOGGER_TAILS_DEFAULT} from '../logger-types';
import {Tapper} from '../tapper/tapper';
import {LogService} from './log.service';

describe(LogService.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LogService,
                {provide: LOGGER_LEVELS, useValue: LOGGER_ALL},
                {provide: LOGGER_TAILS, useValue: LOGGER_TAILS_DEFAULT},
                {provide: LOGGER_CONSOLE, useValue: new MockConsole()}
            ]
        });
    });

    describe('console', () => {
        MockConsole.METHODS.forEach(name => {
            it(`should call console.${name}() method`, () => {
                const mock: MockConsole = TestBed.get(LOGGER_CONSOLE);
                const log: LogService = TestBed.get(LogService);
                const args = ['hello world'];

                expect(typeof log[name]).toBe('function');
                log[name](...args);

                expect(mock.buffer).toEqual([{name, args}]);
            });
        });
    });

    describe('logger', () => {
        it('should set/get the prefix', () => {
            const log: LogService = TestBed.get(LogService);
            expect(log.getPrefix()).toBe('');
            log.setPrefix('Example');
            expect(log.getPrefix()).toBe('Example');
        });

        it('should create a new logger with prefix', () => {
            let log: LogService = TestBed.get(LogService);
            expect(log.getPrefix()).toBe('');
            log = log.withPrefix('AppComponent');
            expect(log.getPrefix()).toBe('App:');
            log = log.withPrefix('WidgetComponent');
            expect(log.getPrefix()).toBe('App:Widget:');
        });

        it('should use a separator', () => {
            let log: LogService = TestBed.get(LogService);
            log = log.withPrefix('AppComponent', '@');
            expect(log.getPrefix()).toBe('App@');
        });
    });

    describe('tapping', () => {
        it('should create a tapper', () => {
            const log: LogService = TestBed.get(LogService);
            const tapper = log.tap();
            expect(tapper instanceof Tapper).toBeTruthy();
        });

        it('prefix should end with $', () => {
            const log: LogService = TestBed.get(LogService);
            const prefix = log.withPrefix('App').withPrefix('Widget').tap().logger().getPrefix();
            expect(prefix).toBe('App:Widget$');
        });
    });
});

describe(`${LogService.name}.Logger`, () => {
    it('should have instance', () => {
        expect(LogService.instance instanceof LogService).toBeTruthy();
    });

    it('should not have a prefix', () => {
        expect(LogService.instance.getPrefix()).toBe('');
    });
});
