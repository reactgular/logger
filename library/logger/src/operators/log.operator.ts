import {ConsoleMethods} from '../logger-types';

/**
 * Sends values from the observable to the logger.
 */
export class LogOperator<TType> {

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
    public write(value: TType) {
        this._console[this._method](value);
    }
}
