import {Inject, Injectable} from '@angular/core';
import {LogService} from '../log/log.service';
import {ConsoleMethod, ConsoleMethods, ConsoleNoop, LOGGER_CONSOLE, LOGGER_LEVEL, LOGGER_LEVELS} from '../logger-types';
import {PrefixService} from '../prefix/prefix.service';

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
            ? this.method('debug')
            : ConsoleNoop;
    }

    /**
     * Gets the method from the console object.
     */
    public get error(): ConsoleMethod<void> {
        return this._levels & LOGGER_LEVEL.ERROR
            ? this.method('error')
            : ConsoleNoop;
    }

    /**
     * Gets the method from the console object.
     */
    public get info(): ConsoleMethod<void> {
        return this._levels & LOGGER_LEVEL.INFO
            ? this.method('info')
            : ConsoleNoop;
    }

    /**
     * Gets the method from the console object.
     */
    public get log(): ConsoleMethod<void> {
        return this._levels & LOGGER_LEVEL.LOG
            ? this.method('log')
            : ConsoleNoop;
    }

    /**
     * Gets the method from the console object.
     */
    public get warn(): ConsoleMethod<void> {
        return this._levels & LOGGER_LEVEL.WARN
            ? this.method('warn')
            : ConsoleNoop;
    }

    /**
     * Gets the current prefix.
     */
    public getPrefix(): string {
        return this._prefixName;
    }

    /**
     * Returns the logging function from the console object.
     */
    public method(name: string): ConsoleMethod<void> {
        if (!this._console || !this._console[name]) {
            return ConsoleNoop;
        }
        return this._prefixName
            ? this._console[name].bind(this._console, this._prefixName)
            : this._console[name].bind(this._console);
    }

    /**
     * Changes the loggers prefix.
     */
    public setPrefix(value: string): LogService {
        this._prefixName = value;
        return this;
    }

    /**
     * Creates a logger with an automatic prefix.
     */
    public withPrefix(value?: string, separator?: string): LogService {
        return new LogConsoleService(this._levels, this._console, this._prefixService)
            .setPrefix(this._prefixName + this._prefixService.prefix(value) + (separator === undefined ? PREFIX_SEPARATOR : separator));
    }
}
