import {Observable, OperatorFunction, Subject} from 'rxjs';
import {finalize, takeUntil, tap} from 'rxjs/operators';
import {LoggerService} from '../logger/logger.service';
import {LogOperator} from '../operators/log.operator';

export class Tapper<TObservable> {
    /**
     * The inner subject that will emit log values.
     */
    private readonly _subject$: Subject<TObservable> = new Subject();

    /**
     * The observable used to apply pipe operators.
     */
    private _observable$: Observable<TObservable> = this._subject$.asObservable();

    /**
     * Constructor
     */
    public constructor(private _logger: LoggerService) {
    }

    /**
     * Prints debug messages to the console.
     */
    public debug(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._subscribe(new LogOperator('debug', this._logger, args));
    }

    /**
     * Prints error messages to the console.
     */
    public error(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._subscribe(new LogOperator('error', this._logger, args));
    }

    /**
     * Prints info messages to the console.
     */
    public info(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._subscribe(new LogOperator('info', this._logger, args));
    }

    /**
     * Prints log messages to the console.
     */
    public log(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._subscribe(new LogOperator('log', this._logger, args));
    }

    /**
     * Gets the logger associated with the tapper.
     */
    public logger(): LoggerService {
        return this._logger;
    }

    /**
     * @todo Look at how the types for pipe() are done in rxjs.
     */
    public pipe(...args: OperatorFunction<any, any>[]): Tapper<TObservable> {
        this._observable$ = this._observable$.pipe.apply(this._observable$, args);
        return this;
    }

    /**
     * Prints warn messages to the console.
     */
    public warn(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._subscribe(new LogOperator('warn', this._logger, args));
    }

    private _subscribe(log: LogOperator<TObservable>): OperatorFunction<TObservable, TObservable> {
        return (source: Observable<TObservable>) => {
            const destroy$ = new Subject<void>();

            this._observable$.pipe(
                takeUntil(destroy$)
            ).subscribe(value => log.pipe(value));

            return source.pipe(
                tap(value => this._subject$.next(value)),
                finalize(() => destroy$.next())
            );
        };
    }
}
