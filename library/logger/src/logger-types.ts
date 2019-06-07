import {InjectionToken} from '@angular/core';

/**
 * Bitwise enum for configuring log levels.
 */
export enum LOGGER_LEVEL {
    DEBUG = 0b00000001,
    ERROR = 0b00000010,
    INFO = 0b00000100,
    LOG = 0b00001000,
    WARN = 0b00010000
}

/**
 * Token to inject logging levels.
 */
export const LOGGER_LEVELS: InjectionToken<LOGGER_LEVEL> = new InjectionToken<LOGGER_LEVEL>('LOGGER_LEVELS');

/**
 * Token to inject tails that should removed from prefixes.
 */
export const LOGGER_TAILS: InjectionToken<string[]> = new InjectionToken<string[]>('LOGGER_TAILS');

/**
 * Token to inject the browser's console.
 */
export const LOGGER_CONSOLE: InjectionToken<ConsoleMethods<void>> = new InjectionToken<Console>('LOGGER_CONSOLE');

/**
 * Logs all levels
 */
export const LOGGER_ALL = LOGGER_LEVEL.DEBUG | LOGGER_LEVEL.ERROR | LOGGER_LEVEL.INFO | LOGGER_LEVEL.LOG | LOGGER_LEVEL.WARN;

/**
 * Defaults list of tails to remove.
 */
export const LOGGER_TAILS_DEFAULT = ['Component', 'Directive', 'Service', 'Factory', 'Pipe', 'Module', 'Resolver', 'Provider'];

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
