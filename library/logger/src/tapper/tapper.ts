import {Observable, OperatorFunction} from 'rxjs';
import {map, scan, tap} from 'rxjs/operators';
import {TapOperator} from '../logger-types';
import {LoggerService} from '../logger/logger.service';
import {FilterOperator} from '../operators/filter.operator';
import {FirstOperator} from '../operators/first.operator';
import {LogOperator} from '../operators/log.operator';
import {MapOperator} from '../operators/map.operator';

export class Tapper<TObservable, TOperator> {
    /**
     * A list of operators for this tapper instance.
     */
    private readonly _operators: TapOperator<TOperator, TOperator>[] = [];

    /**
     * Constructor
     */
    public constructor(private _logger: LoggerService,
                       operators?: TapOperator<TOperator, TOperator>[]) {
        this._operators = operators || [];
    }

    /**
     * Prints debug messages to the console.
     */
    public debug(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._finish(new LogOperator('debug', this._logger, args));
    }

    /**
     * Prints error messages to the console.
     */
    public error(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._finish(new LogOperator('error', this._logger, args));
    }

    public filter(cond: (value: TOperator) => boolean): Tapper<TObservable, TOperator> {
        return this._next(new FilterOperator(cond));
    }

    public first(...args: any[]): Tapper<TObservable, TOperator> {
        return this._next(new FirstOperator());
    }

    /**
     * Prints info messages to the console.
     */
    public info(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._finish(new LogOperator('info', this._logger, args));
    }

    /**
     * Prints log messages to the console.
     */
    public log(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._finish(new LogOperator('log', this._logger, args));
    }

    /**
     * Gets the logger associated with the tapper.
     */
    public logger(): LoggerService {
        return this._logger;
    }

    public map<TReturn>(mapper: (TOperator) => TReturn): Tapper<TObservable, TReturn> {
        return this._next<TReturn>(new MapOperator<TOperator, TReturn>(mapper));
    }

    /**
     * Prints warn messages to the console.
     */
    public warn(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._finish(new LogOperator('warn', this._logger, args));
    }

    /**
     * Creates the observable operator that will tab into the stream.
     */
    private _finish(op: TapOperator<TOperator, TOperator>): OperatorFunction<TObservable, TObservable> {
        const operators = this._next(op)._operators;

        function tapNext(value, indx: number) {
            if (indx < operators.length) {
                operators[indx].pipe(value, (next) => tapNext(next, indx + 1));
            }
        }

        return (source: Observable<TObservable>) => {
            return source.pipe(
                scan((acc, value) => ({count: acc.count + 1, value}), {count: 0, value: null}),
                tap(value => tapNext(value, 0)),
                map(value => value.value)
            );
        };
    }

    private _next<TReturn>(op: TapOperator<TOperator, TReturn>): Tapper<TObservable, TReturn> {
        return new Tapper<TObservable, TReturn>(this._logger, [...this._operators, op as any]);
    }
}
