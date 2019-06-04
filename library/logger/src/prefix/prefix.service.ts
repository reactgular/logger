import {Inject, Injectable, Optional} from '@angular/core';
import {LOGGER_CONFIG, LoggerConfig} from '../logger-types';

@Injectable({
    providedIn: 'root'
})
export class PrefixService {
    private _replacer: RegExp;

    private _tails: string[] = [];

    public constructor(@Inject(LOGGER_CONFIG) @Optional() config: Partial<LoggerConfig>) {
        const defaultTails = ['Component', 'Directive', 'Service', 'Factory', 'Pipe', 'Module', 'Resolver', 'Provider'];
        const tails = (config && config.tails) || defaultTails;
        this.removeTails(tails);
    }

    public prefix(value?: string): string {
        // Will be "unknown" in all IE browsers if class name is used.
        return (value || 'unknown').replace(this._getReplacer(), '');
    }

    public removeTail(value: string) {
        this.removeTails([value]);
    }

    public removeTails(values: string[]) {
        this._tails = [...this._tails, ...values];
        this._replacer = undefined;
    }

    private _getReplacer(): RegExp {
        if (!this._replacer) {
            this._replacer = new RegExp(`(${this._tails.join('|')})$`);
        }
        return this._replacer;
    }
}
