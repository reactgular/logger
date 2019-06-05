/* tslint:disable:no-this._console */
import {Inject, Optional} from '@angular/core';
import {ConsoleMethod, ConsoleMethods, ConsoleNoop, LOGGER_CONFIG, LOGGER_CONSOLE, LoggerConfig} from '../logger-types';
import {PrefixService} from '../prefix/prefix.service';
import {Tapper} from '../tapper/tapper';

const PREFIX_SEPARATOR = ':';

export class LoggerService implements ConsoleMethods<void> {
    /**
     * Global access to a logger.
     */
    public static Logger: LoggerService = new LoggerService({}, console, new PrefixService());

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
                       @Inject(LOGGER_CONSOLE) private _console: ConsoleMethods<void>,
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
     * Gets the current prefix.
     */
    public getPrefix(): string {
        return this._prefixName;
    }

    /**
     * Changes the loggers prefix.
     */
    public setPrefix(value: string): LoggerService {
        this._prefixName = value;
        return this;
    }

    /**
     * Creates a tapper object that can log output from an observable.
     */
    public tap<T>(mapper?: (T) => any): Tapper<T> {
        return new Tapper<T>(this.withPrefix('$'), mapper || ((value) => value));
    }

    /**
     * Creates a logger with an automatic prefix.
     */
    public withPrefix(value?: string, seperator?: string): LoggerService {
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
