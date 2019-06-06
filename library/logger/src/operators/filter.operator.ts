import {TapOperator, TapValue} from '../logger-types';

export class FilterOperator<TType> implements TapOperator<TType, TType> {
    public constructor(private _cond: (value: TType) => boolean) {

    }

    public pipe(value: TapValue<TType>, next: (value: TapValue<TType>) => void) {
        if (this._cond(value.value)) {
            next(value);
        }
    }
}
