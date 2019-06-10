import {Observable, OperatorFunction} from 'rxjs';
import {LoggerMethods, TapperMethods} from '../logger-types';

/**
 * A do nothing observable operator.
 */
const NOOP_OPERATOR = (source: Observable<any>) => source;

/**
 * Implements a no operation tapper the effectively disables all console output from an observable.
 */
export class TapperNoop<TObservable> implements TapperMethods<TObservable> {
    /**
     * Constructor
     */
    public constructor(private readonly _logger: LoggerMethods) {

    }

    /**
     * Does nothing
     */
    public debug(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return NOOP_OPERATOR;
    }

    /**
     * Does nothing
     */
    public error(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return NOOP_OPERATOR;
    }

    /**
     * Does nothing
     */
    public info(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return NOOP_OPERATOR;
    }

    /**
     * Does nothing
     */
    public log(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return NOOP_OPERATOR;
    }

    /**
     * Gets the logger associated with this tapper.
     */
    public logger(): LoggerMethods {
        return this._logger;
    }

    /**
     * Does nothing
     */
    public pipe(...args: OperatorFunction<any, any>[]): TapperNoop<TObservable> {
        return this;
    }

    /**
     * Does nothing
     */
    public warn(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return NOOP_OPERATOR;
    }
}
