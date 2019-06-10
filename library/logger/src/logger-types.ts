import {InjectionToken} from '@angular/core';
import {OperatorFunction} from 'rxjs';

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

/**
 * Defines configuration for the logger module.
 */
export interface LoggerConfig {
    /**
     * A reference to the browser's console.
     */
    console?: ConsoleMethods<void>;
    /**
     * False to replace logger with a noop service that disables all console output.
     */
    enabled?: boolean;
    /**
     * Logging levels settings to 0 is not as effective as setting enabled to false.
     */
    levels?: LOGGER_LEVEL;
    /**
     * Strings to be removed from the tail of logger prefixes.
     */
    tails?: string[];
}

/**
 * Defines the methods for a logger service.
 */
export interface LoggerMethods extends ConsoleMethods<void> {
    /**
     * Gets the current prefix.
     */
    getPrefix(): string;

    /**
     * Changes the loggers prefix.
     */
    setPrefix(value: string): LoggerMethods;

    /**
     * Creates a tapper object that can log output from an observable.
     */
    tap<TObservable>(): TapperMethods<TObservable>;

    /**
     * Creates a logger with an automatic prefix.
     */
    withPrefix(value?: string, separator?: string): LoggerMethods;
}

/**
 * Defines the methods for the tapper of an observable.
 */
export interface TapperMethods<TObservable> {
    /**
     * Prints debug messages to the console.
     */
    debug(...args: any[]): OperatorFunction<TObservable, TObservable>;

    /**
     * Prints error messages to the console.
     */
    error(...args: any[]): OperatorFunction<TObservable, TObservable>

    /**
     * Prints info messages to the console.
     */
    info(...args: any[]): OperatorFunction<TObservable, TObservable>

    /**
     * Prints log messages to the console.
     */
    log(...args: any[]): OperatorFunction<TObservable, TObservable>

    /**
     * Gets the logger associated with the tapper.
     */
    logger(): LoggerMethods;

    /**
     * Adds observable operators to the inner observable that is tapping into the outer observables. Operators added to the
     * tapper will have no effect on the outer observable, but will be applied to the output for the console.
     */
    pipe(...args: OperatorFunction<any, any>[]): TapperMethods<TObservable>

    /**
     * Prints warn messages to the console.
     */
    warn(...args: any[]): OperatorFunction<TObservable, TObservable>;
}
