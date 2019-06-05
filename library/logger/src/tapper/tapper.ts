import {Observable, OperatorFunction} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ConsoleMethod, Logger, TapLogger} from '../logger-types';

export class Tapper<TType> implements TapLogger<TType> {

    /**
     * Constructor
     */
    public constructor(private _logger: Logger,
                       private _mapper: (T) => any) {
        console.error('here');
    }

    public get debug(): ConsoleMethod<OperatorFunction<TType, TType>> {
        return this._method('debug');
    }

    public get error(): ConsoleMethod<OperatorFunction<TType, TType>> {
        return this._method('error');
    }

    public get info(): ConsoleMethod<OperatorFunction<TType, TType>> {
        return this._method('info');
    }

    public get log(): ConsoleMethod<OperatorFunction<TType, TType>> {
        return this._method('log');
    }

    public get warn(): ConsoleMethod<OperatorFunction<TType, TType>> {
        return this._method('warn');
    }

    /**
     * Gets the logger associated with the tapper.
     */
    public getLogger(): Logger {
        return this._logger;
    }

    private _method(name: string): ConsoleMethod<OperatorFunction<TType, TType>> {
        return (...args: any[]) => {
            return (source: Observable<TType>) => {
                return source.pipe(
                    tap(value => this._logger[name](...[...args, this._mapper(value)]))
                );
            };
        };
    }
}
