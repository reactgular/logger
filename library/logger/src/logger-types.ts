import {InjectionToken} from '@angular/core';

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
