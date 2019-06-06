import {TapOperator, TapPayload} from '../logger-types';

export class MapOperator<TIn, TOut> implements TapOperator<TIn, TOut> {

    public constructor(private _mapper: (value: TIn) => TOut) {

    }

    public pipe(value: TapPayload<TIn>, next: (value: TapPayload<TOut>) => void) {
        next({...value, payload: this._mapper(value.payload)});
    }
}
