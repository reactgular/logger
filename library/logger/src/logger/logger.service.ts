/* tslint:disable:no-this._console */
import {Inject, Optional} from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ConsoleMethod, ConsoleMethods, ConsoleNoop, Logger, LOGGER_CONFIG, LOGGER_CONSOLE, LoggerConfig} from '../logger-types';
import {PrefixService} from '../prefix/prefix.service';

const PREFIX_SEPARATOR = ':';

export class LoggerService implements Logger {
    /**
     * Global access to a logger.
     */
    public static Logger: LoggerService = new LoggerService({}, console, new PrefixService({}));

    /**
     * Configuration
     */
    private readonly _config: LoggerConfig;

    /**
     * Output prefix
     */
    private _prefixName: string;

    /**
     * Allows for optional prefix.
     */
    public constructor(@Inject(LOGGER_CONFIG) @Optional() config: Partial<LoggerConfig>,
                       @Inject(LOGGER_CONSOLE) private _console: Console,
                       private _prefixService: PrefixService) {
        this._prefixName = '';
        this._config = Object.assign({
            debug: true,
            tails: [],
            log: true,
            error: true,
            info: true,
            warn: true
        }, config || {});
    }

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

    /**
     * Changes the loggers prefix.
     */
    public setPrefix(value: string): Logger {
        this._prefixName = value;
        return this;
    }

    /**
     * Creates an observable operator that tags into the stream and logs values.
     */
    public streamDebug<T>(...args): OperatorFunction<T, T> {
        if (!this._config.debug || !this._console || !this._console.log) {
            return (source: Observable<T>): Observable<T> => source;
        }
        return (source: Observable<T>): Observable<T> => {
            return source.pipe(tap(value => {
                const prefix = this._prefixName ? this._prefixName.replace(/:$/, '') + '$' : '$';
                this._console.debug(...[prefix, ...args, value]);
            }));
        };
    }

    /**
     * Creates an observable operator that tags into the stream and logs values.
     */
    public streamError<T>(...args): OperatorFunction<T, T> {
        if (!this._config.error || !this._console || !this._console.log) {
            return (source: Observable<T>): Observable<T> => source;
        }
        return (source: Observable<T>): Observable<T> => {
            return source.pipe(tap(value => {
                const prefix = this._prefixName ? this._prefixName.replace(/:$/, '') + '$' : '$';
                this._console.error(...[prefix, ...args, value]);
            }));
        };
    }

    public tap<T, R>(mapper: (T) => R): ConsoleMethods<OperatorFunction<R, R>> {
        return undefined;
    }

    /**
     * Creates a logger with an automatic prefix.
     */
    public withPrefix(value?: string, seperator?: string): Logger {
        return new LoggerService(this._config, this._console, this._prefixService)
            .setPrefix(this._prefixName + this._prefixService.prefix(value) + (seperator || PREFIX_SEPARATOR));
    }

    private _method(name: string): ConsoleMethod<void> {
        if (!this._config[name] || !this._console || !this._console[name]) {
            return ConsoleNoop;
        }
        return this._prefixName
            ? this._console[name].bind(this._console, this._prefixName)
            : this._console[name].bind(this._console);
    }
}
