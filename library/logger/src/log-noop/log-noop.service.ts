import {Injectable} from '@angular/core';
import {ConsoleMethod, ConsoleNoop, TapperMethods} from '../logger-types';
import {TapperNoop} from '../tapper-noop/tapper-noop';
import {LogService} from '../log/log.service';

/**
 * Implements a no operation logger the effectively disables all console output.
 */
@Injectable()
export class LogNoopService extends LogService {
    /**
     * The noop tapper
     */
    private readonly _tapper: TapperMethods<any>;

    /**
     * Constructor
     */
    public constructor() {
        super();
        this._tapper = new TapperNoop(this);
    }

    /**
     * Does nothing
     */
    public get debug(): ConsoleMethod<void> {
        return ConsoleNoop;
    }

    /**
     * Does nothing
     */
    public get error(): ConsoleMethod<void> {
        return ConsoleNoop;
    }

    /**
     * Does nothing
     */
    public get info(): ConsoleMethod<void> {
        return ConsoleNoop;
    }

    /**
     * Does nothing
     */
    public get log(): ConsoleMethod<void> {
        return ConsoleNoop;
    }

    /**
     * Does nothing
     */
    public get warn(): ConsoleMethod<void> {
        return ConsoleNoop;
    }

    /**
     * Does nothing
     */
    public getPrefix(): string {
        return '';
    }

    /**
     * Does nothing
     */
    public setPrefix(value: string): LogService {
        return this;
    }

    /**
     * Does nothing
     */
    public tap<TObservable>(): TapperMethods<TObservable> {
        return this._tapper;
    }

    /**
     * Does nothing
     */
    public withPrefix(value?: string, separator?: string): LogService {
        return this;
    }
}
