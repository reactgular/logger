/* tslint:disable:no-this._console */
import {Inject, Optional} from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ConsoleMethod, ConsoleMethods, ConsoleNoop, Logger, LOGGER_CONFIG, LOGGER_CONSOLE, LoggerConfig} from '../logger-types';

const PREFIX_SEPARATOR = ':';

export class LoggerService implements Logger {
    /**
     * Global access to a logger.
     */
    public static Logger: LoggerService = new LoggerService({}, console);

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
                       @Inject(LOGGER_CONSOLE) private _console: Console) {
        this._prefixName = '';
        this._config = Object.assign({
            debug: true,
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

    public tap<T>(): ConsoleMethods<OperatorFunction<T, T>> {
        return undefined;
    }

    /**
     * Creates a logger with an automatic prefix.
     */
    public withPrefix(value?: string): Logger {
        // Will be "unknown" in all IE browsers if class name is used.
        const prefix = (value || 'unknown').replace(/(Component|Directive|Service|Factory|Pipe|Resource|Module|Resolver|Provider)$/, '');
        const log = new LoggerService(this._config, this._console);
        log.setPrefix((this._prefixName || '') + prefix + PREFIX_SEPARATOR);
        return log;
    }

    private _method(name: string): ConsoleMethod<void> {
        if (!this._config[name] || !this._console || !this._console[name]) {
            return ConsoleNoop;
        }
        return this._prefixName
            ? this._console[name].bind(this._console, this._prefixName)
            : this._console[name].bind(this._console);
    }

    /**
     * Changes the loggers prefix.
     */
    private setPrefix(value: string) {
        this._prefixName = value;
    }
}
