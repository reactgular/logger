import {TapOperator, TapPayload} from '../logger-types';

export class MapOperator<TIn, TOut> implements TapOperator<TIn, TOut> {

    public constructor(private _mapper: (value: TIn) => TOut) {

    }

    public pipe({count, payload}: TapPayload<TIn>, next: (value: TapPayload<TOut>) => void) {
        next({count, payload: this._mapper(payload)});
    }
}
