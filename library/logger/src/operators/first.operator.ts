import {TapOperator, TapValue} from '../logger-types';

/**
 * @todo What about observables that are subscribed to more than once?
 */
export class FirstOperator<TType> implements TapOperator<TType, TType> {
    public pipe(value: TapValue<TType>, next: (value: TapValue<TType>) => void) {
        if (value.count === 1) {
            next(value);
        }
    }
}
