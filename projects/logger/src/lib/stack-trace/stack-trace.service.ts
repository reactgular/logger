import {Injectable} from '@angular/core';

@Injectable()
export class StackTraceService {
    // noinspection JSMethodCanBeStatic
    /**
     * Returns the call stack from an error object or the current stack.
     *
     * Note: Does not work in any IE or Edge and returns undefined.
     */
    public trace(err?: Error): string[] | undefined {
        const ex = err || new Error();
        if (typeof ex === 'object' && typeof ex['stack'] === 'string') {
            return ex['stack'].split('\n');
        }
        return undefined;
    }
}
