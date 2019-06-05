import {TapOperator} from '../logger-types';

/**
 * @todo What about observables that are subscribed to more than once?
 */
export class FirstOperator<TType> implements TapOperator<TType, TType> {
    public pipe(value: TType, next: (value: TType) => void) {
    }
}
