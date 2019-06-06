import {TapOperator, TapPayload} from '../logger-types';

export class FilterOperator<TType> implements TapOperator<TType, TType> {
    public constructor(private _cond: (value: TType) => boolean) {

    }

    public pipe(value: TapPayload<TType>, next: (value: TapPayload<TType>) => void) {
        if (this._cond(value.payload)) {
            next(value);
        }
    }
}
