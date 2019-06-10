import {Observable, OperatorFunction, Subject, throwError} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {LoggerMethods, TapperMethods} from '../logger-types';

/**
 * Tappers are used to listen into observable streams and log the emitted values to the console. A tapper can have observable
 * operators piped that effect only the console output.
 */
export class Tapper<TObservable> implements TapperMethods<TObservable> {
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
    public constructor(private _logger: LoggerMethods) {
    }

    /**
     * Prints debug messages to the console.
     */
    public debug(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._subscribe('debug', args);
    }

    /**
     * Prints error messages to the console.
     */
    public error(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._subscribe('error', args);
    }

    /**
     * Prints info messages to the console.
     */
    public info(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._subscribe('info', args);
    }

    /**
     * Prints log messages to the console.
     */
    public log(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._subscribe('log', args);
    }

    /**
     * Gets the logger associated with the tapper.
     */
    public logger(): LoggerMethods {
        return this._logger;
    }

    /**
     * @todo Look at how the types for pipe() are done in rxjs.
     */
    public pipe(...args: OperatorFunction<any, any>[]): TapperMethods<TObservable> {
        this._observable$ = this._observable$.pipe.apply(this._observable$, args);
        return this;
    }

    /**
     * Prints warn messages to the console.
     */
    public warn(...args: any[]): OperatorFunction<TObservable, TObservable> {
        return this._subscribe('warn', args);
    }

    /**
     * Subscribes to the source observable and emits values to the tapper observable.
     */
    private _subscribe(method: string, args: any[]): OperatorFunction<TObservable, TObservable> {
        return (source: Observable<TObservable>) => {
            const write = (method: string, args: any[]) => {
                (<Function> this._logger[method]).apply(this, args);
            };

            this._observable$.subscribe(
                value => write(method, [...args, value]),
                error => write(method, [...args, error])
            );

            return source.pipe(
                tap(value => this._subject$.next(value)),
                catchError(err => {
                    this._subject$.error(err);
                    return throwError(err);
                }),
                finalize(() => this._subject$.complete())
            );
        };
    }
}
