import {InjectionToken} from '@angular/core';
import {OperatorFunction} from 'rxjs';

/**
 * Token used to inject the configuration object.
 */
export const LOGGER_CONFIG: InjectionToken<Partial<LoggerConfig>> = new InjectionToken<Partial<LoggerConfig>>('LOGGER_CONFIG');

/**
 * Token to inject the browser's console.
 */
export const LOGGER_CONSOLE: InjectionToken<Console> = new InjectionToken<Console>('LOGGER_CONSOLE');

/**
 * Configuration options for the logger. Can be provided in the root module.
 */
export interface LoggerConfig {
    debug: boolean;
    error: boolean;
    info: boolean;
    log: boolean;
    tails: string[];
    warn: boolean;
}

/**
 * Defines the function type for a console method.
 */
export type ConsoleMethod<TReturn> = (...params: any[]) => TReturn;

export const ConsoleNoop: ConsoleMethod<void> = Function.prototype as ConsoleMethod<void>;

/**
 * Defines the methods that can be called on the console.
 */
export interface ConsoleMethods<TReturn> {
    debug: ConsoleMethod<TReturn>;

    error: ConsoleMethod<TReturn>;

    info: ConsoleMethod<TReturn>;

    log: ConsoleMethod<TReturn>;

    warn: ConsoleMethod<TReturn>;
}

/**
 * Defines a logger service interface.
 */
export interface Logger extends ConsoleMethods<void> {
    /**
     * Sets the prefix of this log service.
     */
    setPrefix(prefix?: string): Logger;

    /**
     * Taps an observable and logs output.
     */
    tap<T, R>(mapper?: (T) => R): ConsoleMethods<OperatorFunction<T, T>>;

    /**
     * Creates a new logger service with the appended prefix.
     */
    withPrefix(prefix?: string, seperator?: string): Logger;
}
