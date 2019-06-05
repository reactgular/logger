import {TapOperator} from '../logger-types';

export class FilterOperator<TType> implements TapOperator<TType, TType> {
    public constructor(private _cond: (value: TType) => boolean) {

    }

    public pipe(value: TType, next: (value: TType) => void) {
        if (this._cond(value)) {
            next(value);
        }
    }
}
