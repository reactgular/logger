import {TapOperator} from '../logger-types';

export class MapOperator<TIn, TOut> implements TapOperator<TIn, TOut> {

    public constructor(private _mapper: (value: TIn) => TOut) {

    }

    public pipe(value: TIn, next: (value: TOut) => void) {
        next(this._mapper(value));
    }
}
