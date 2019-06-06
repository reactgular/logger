import {ConsoleMethods, TapOperator, TapValue} from '../logger-types';

/**
 * Sends values from the observable to the logger.
 */
export class LogOperator<TType> implements TapOperator<TType, TType> {

    /**
     * Constructor
     */
    public constructor(private _method: string,
                       private _console: ConsoleMethods<void>,
                       private _args: any[]) {
    }

    /**
     * Pipes the value to the logger. Calls next but there likely aren't any more operators.
     */
    public pipe(value: TapValue<TType>, next: (value: TapValue<TType>) => void) {
        this._console[this._method](value.value);
        next(value);
    }
}
