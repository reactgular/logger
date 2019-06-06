import {TapOperator, TapValue} from '../logger-types';

export class HashOperator<TType> implements TapOperator<TType, TType> {
    public pipe(value: TapValue<TType>, next: <TType>(value: TapValue<TType>) => void) {
        value.id.show = true;
        next(value);
    }
}
