import {InjectionToken} from '@angular/core';
import {OperatorFunction} from 'rxjs';

/**
 * Token to inject the logger configuration.
 */
export const LOGGER_CONFIG: InjectionToken<Partial<LoggerConfig>> = new InjectionToken<Partial<LoggerConfig>>('LOGGER_CONFIG');

/**
 * Token to inject the browser's console.
 */
export const LOGGER_CONSOLE: InjectionToken<ConsoleMethods<void>> = new InjectionToken<Console>('LOGGER_CONSOLE');

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

/**
 * Defines a console method that does not log output.
 */
export const ConsoleNoop: ConsoleMethod<void> = Function.prototype as ConsoleMethod<void>;

/**
 * Defines the methods that can be called on the console.
 */
export interface ConsoleMethods<TReturn> {
    /**
     * Defined as a function property to ensure console logs the correct file/line reference.
     */
    debug: ConsoleMethod<TReturn>;
    /**
     * Defined as a function property to ensure console logs the correct file/line reference.
     */
    error: ConsoleMethod<TReturn>;
    /**
     * Defined as a function property to ensure console logs the correct file/line reference.
     */
    info: ConsoleMethod<TReturn>;
    /**
     * Defined as a function property to ensure console logs the correct file/line reference.
     */
    log: ConsoleMethod<TReturn>;
    /**
     * Defined as a function property to ensure console logs the correct file/line reference.
     */
    warn: ConsoleMethod<TReturn>;
}

/**
 * Defines a logger service interface.
 */
export interface Logger extends ConsoleMethods<void> {
    /**
     * Gets the prefix of this log service.
     */
    getPrefix(): string;

    /**
     * Sets the prefix of this log service.
     */
    setPrefix(prefix?: string): Logger;

    /**
     * Taps an observable and logs output.
     */
    tap<T>(mapper?: (T) => any): TapLogger<T>;

    /**
     * Creates a new logger service with the appended prefix.
     */
    withPrefix(prefix?: string, seperator?: string): Logger;
}

export interface TapLogger<T> extends ConsoleMethods<OperatorFunction<T, T>> {
    /**
     * Gets the logger associated with the tapper.
     */
    getLogger(): Logger;
}
