import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {ConsoleMethod, ConsoleMethods, Logger, LOGGER_CONFIG, LOGGER_CONSOLE} from '../logger-types';
import {LoggerService} from './logger.service';

class MockConsole implements ConsoleMethods<void> {
    public buffer: Array<{ name: string, args: any[] }> = [];

    public get debug(): ConsoleMethod<void> {
        return this._method('debug');
    }

    public get error(): ConsoleMethod<void> {
        return this._method('error');
    }

    public get info(): ConsoleMethod<void> {
        return this._method('info');
    }

    public get log(): ConsoleMethod<void> {
        return this._method('log');
    }

    public get warn(): ConsoleMethod<void> {
        return this._method('warn');
    }

    private _method(name: string): ConsoleMethod<void> {
        return (...args: any[]): void => {
            this.buffer.push({name, args});
        };
    }

}

describe(LoggerService.name, () => {
    const methods = ['debug', 'warn', 'info', 'log', 'error'];

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
        methods.forEach(name => {
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
            let log: Logger = TestBed.get(LoggerService);
            expect(log.getPrefix()).toBe('');
            log = log.withPrefix('AppComponent');
            expect(log.getPrefix()).toBe('App:');
            log = log.withPrefix('WidgetComponent');
            expect(log.getPrefix()).toBe('App:Widget:');
        });

        it('should use a separator', () => {
            let log: Logger = TestBed.get(LoggerService);
            log = log.withPrefix('AppComponent', '@');
            expect(log.getPrefix()).toBe('App@');
        });
    });

    describe('tapping', () => {
        it('prefix should end with $', () => {
            const log: LoggerService = TestBed.get(LoggerService);
            const prefix = log.withPrefix('App').withPrefix('Widget').tap().getLogger().getPrefix();
            expect(prefix).toBe('App:Widget$');
        });

        it('should have console methods', () => {
            const log: LoggerService = TestBed.get(LoggerService);
            const tapper = log.tap();
            methods.forEach(name => {
                expect(typeof tapper[name]).toBe('function');
            });
        });

        methods.forEach(name => {
            it(`should call console.${name}() method from observable`, () => {
                const mock: MockConsole = TestBed.get(LOGGER_CONSOLE);
                const log: LoggerService = TestBed.get(LoggerService);
                const tapper = log.tap();
                expect(typeof tapper[name]).toBe('function');

                of('hello').pipe(tapper[name]()).subscribe();

                console.log(mock.buffer);
            });
        });

        it('should map values', () => {
            const mock: MockConsole = TestBed.get(LOGGER_CONSOLE);
            let log: Logger = TestBed.get(LoggerService);
            log = log.withPrefix('App').withPrefix('Widget');

            of({value: 'hello'}).pipe(
                log.tap(v => v.value).debug()
            ).subscribe();
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
