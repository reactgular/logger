import {TapOperator, TapPayload} from '../logger-types';

export class HashOperator<TType> implements TapOperator<TType, TType> {
    public pipe(value: TapPayload<TType>, next: <TType>(value: TapPayload<TType>) => void) {
        value.id.show = true;
        next(value);
    }
}
