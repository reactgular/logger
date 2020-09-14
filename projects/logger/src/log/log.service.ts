import {ConsoleMethod, TapperMethods} from '../logger-types';

/**
 * Defines a base class which can double as an injection token in Angular. This allows the module to
 * replace the service with a different class without requiring users to use a @Inject() decorator.
 */
export abstract class LogService {
    /**
     * Debug method
     */
    public abstract get debug(): ConsoleMethod<void>;

    /**
     * Error method
     */
    public abstract get error(): ConsoleMethod<void>;

    /**
     * Info method
     */
    public abstract get info(): ConsoleMethod<void>;

    /**
     * Log method
     */
    public abstract get log(): ConsoleMethod<void>;

    /**
     * Warn method
     */
    public abstract get warn(): ConsoleMethod<void>;

    /**
     * Gets the prefix for the logger
     */
    public abstract getPrefix();

    /**
     * Sets a new prefix for the logger.
     */
    public abstract setPrefix(value: string);

    /**
     * Creates an observable tapper
     */
    public abstract tap<TObservable>(): TapperMethods<TObservable>;

    /**
     * Creates a new logger and appends the prefix.
     */
    public abstract withPrefix(value?: string, separator?: string): LogService;
}
