import {TapOperator, TapPayload} from '../logger-types';

export class HashOperator<TType> implements TapOperator<TType, TType> {
    public pipe(value: TapPayload<TType>, next: (value: TapPayload<TType>) => void) {
        next(value);
    }
}
