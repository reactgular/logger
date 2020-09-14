import {Inject, Injectable} from '@angular/core';
import {ConsoleMethod, ConsoleMethods, ConsoleNoop, LOGGER_CONSOLE, LOGGER_LEVEL, LOGGER_LEVELS, TapperMethods} from '../logger-types';
import {PrefixService} from '../prefix/prefix.service';
import {Tapper} from '../tapper/tapper';
import {LogService} from '../log/log.service';

const PREFIX_SEPARATOR = ':';

/**
 * @hidden
 */
@Injectable()
export class LogConsoleService extends LogService {
    /**
     * Output prefix
     */
    private _prefixName: string;

    /**
     * Allows for optional prefix.
     */
    public constructor(@Inject(LOGGER_LEVELS) private _levels: LOGGER_LEVEL,
                       @Inject(LOGGER_CONSOLE) private _console: ConsoleMethods<void>,
                       private _prefixService: PrefixService) {
        super();
        this._prefixName = '';
    }

    /**
     * Gets the method from the console object.
     */
    public get debug(): ConsoleMethod<void> {
        return this._levels & LOGGER_LEVEL.DEBUG
            ? this._method('debug')
            : ConsoleNoop;
    }

    /**
     * Gets the method from the console object.
     */
    public get error(): ConsoleMethod<void> {
        return this._levels & LOGGER_LEVEL.ERROR
            ? this._method('error')
            : ConsoleNoop;
    }

    /**
     * Gets the method from the console object.
     */
    public get info(): ConsoleMethod<void> {
        return this._levels & LOGGER_LEVEL.INFO
            ? this._method('info')
            : ConsoleNoop;
    }

    /**
     * Gets the method from the console object.
     */
    public get log(): ConsoleMethod<void> {
        return this._levels & LOGGER_LEVEL.LOG
            ? this._method('log')
            : ConsoleNoop;
    }

    /**
     * Gets the method from the console object.
     */
    public get warn(): ConsoleMethod<void> {
        return this._levels & LOGGER_LEVEL.WARN
            ? this._method('warn')
            : ConsoleNoop;
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
    public setPrefix(value: string): LogService {
        this._prefixName = value;
        return this;
    }

    /**
     * Creates a tapper object that can log output from an observable.
     */
    public tap<TObservable>(): TapperMethods<TObservable> {
        const log = this.withPrefix('$', '');
        log.setPrefix(log.getPrefix().replace(/(:\$)$/, '$'));
        return new Tapper<TObservable>(log);
    }

    /**
     * Creates a logger with an automatic prefix.
     */
    public withPrefix(value?: string, separator?: string): LogService {
        return new LogConsoleService(this._levels, this._console, this._prefixService)
            .setPrefix(this._prefixName + this._prefixService.prefix(value) + (separator === undefined ? PREFIX_SEPARATOR : separator));
    }

    /**
     * Returns the logging function from the console object.
     */
    private _method(name: string): ConsoleMethod<void> {
        if (!this._console || !this._console[name]) {
            return ConsoleNoop;
        }
        return this._prefixName
            ? this._console[name].bind(this._console, this._prefixName)
            : this._console[name].bind(this._console);
    }
}
