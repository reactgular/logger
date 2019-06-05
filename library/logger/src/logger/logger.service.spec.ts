import {TestBed} from '@angular/core/testing';
import {MockConsole} from '../../tests/mock-console';
import {LOGGER_CONFIG, LOGGER_CONSOLE} from '../logger-types';
import {Tapper} from '../tapper/tapper';
import {LoggerService} from './logger.service';

describe(LoggerService.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoggerService,
                {provide: LOGGER_CONFIG, useValue: {enabled: true}},
                {provide: LOGGER_CONSOLE, useValue: new MockConsole()}
            ]
        });
    });

    describe('console', () => {
        MockConsole.METHODS.forEach(name => {
            it(`should call console.${name}() method`, () => {
                const mock: MockConsole = TestBed.get(LOGGER_CONSOLE);
                const log: LoggerService = TestBed.get(LoggerService);
                const args = ['hello world'];

                expect(typeof log[name]).toBe('function');
                log[name](...args);

                expect(mock.buffer).toEqual([{name, args}]);
            });
        });
    });

    describe('logger', () => {
        it('should set/get the prefix', () => {
            const log: LoggerService = TestBed.get(LoggerService);
            expect(log.getPrefix()).toBe('');
            log.setPrefix('Example');
            expect(log.getPrefix()).toBe('Example');
        });

        it('should create a new logger with prefix', () => {
            let log: LoggerService = TestBed.get(LoggerService);
            expect(log.getPrefix()).toBe('');
            log = log.withPrefix('AppComponent');
            expect(log.getPrefix()).toBe('App:');
            log = log.withPrefix('WidgetComponent');
            expect(log.getPrefix()).toBe('App:Widget:');
        });

        it('should use a separator', () => {
            let log: LoggerService = TestBed.get(LoggerService);
            log = log.withPrefix('AppComponent', '@');
            expect(log.getPrefix()).toBe('App@');
        });
    });

    describe('tapping', () => {
        it('should create a tapper', () => {
            const log: LoggerService = TestBed.get(LoggerService);
            const tapper = log.tap();
            expect(tapper instanceof Tapper).toBeTruthy();
        });

        it('prefix should end with $', () => {
            const log: LoggerService = TestBed.get(LoggerService);
            const prefix = log.withPrefix('App').withPrefix('Widget').tap().getLogger().getPrefix();
            expect(prefix).toBe('App:Widget$');
        });
    });
});

describe(`${LoggerService.name}.Logger`, () => {
    it('should have instance', () => {
        expect(LoggerService.Logger instanceof LoggerService).toBeTruthy();
    });

    it('should not have a prefix', () => {
        expect(LoggerService.Logger.getPrefix()).toBe('');
    });
});
