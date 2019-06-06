import {TapOperator, TapPayload} from '../logger-types';

/**
 * @todo What about observables that are subscribed to more than once?
 */
export class FirstOperator<TType> implements TapOperator<TType, TType> {
    public pipe(value: TapPayload<TType>, next: (value: TapPayload<TType>) => void) {
        if (value.count === 1) {
            next(value);
        }
    }
}
