import {TapOperator, TapValue} from '../logger-types';

export class MapOperator<TIn, TOut> implements TapOperator<TIn, TOut> {

    public constructor(private _mapper: (value: TIn) => TOut) {

    }

    public pipe({count, value}: TapValue<TIn>, next: (value: TapValue<TOut>) => void) {
        next({count, value: this._mapper(value)});
    }
}
