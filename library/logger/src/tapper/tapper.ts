import {Observable, OperatorFunction} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ConsoleMethod, ConsoleMethods} from '../logger-types';
import {LoggerService} from '../logger/logger.service';

export class Tapper<TType> implements ConsoleMethods<OperatorFunction<TType, TType>> {

    private readonly _mapper: (T) => any;

    /**
     * Constructor
     */
    public constructor(private _logger: LoggerService,
                       mapper?: (T) => any) {
        this._mapper = mapper || ((value) => value);
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
    public getLogger(): LoggerService {
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
