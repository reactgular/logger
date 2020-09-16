import {Injectable} from '@angular/core';
import {LogService} from '../log/log.service';
import {ConsoleMethod, ConsoleNoop} from '../logger-types';

/**
 * Implements a no operation logger the effectively disables all console output.
 *
 * @hidden
 */
@Injectable()
export class LogNoopService extends LogService {
    /**
     * Constructor
     */
    public constructor() {
        super();
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
    public withPrefix(value?: string, separator?: string): LogService {
        return this;
    }
}
