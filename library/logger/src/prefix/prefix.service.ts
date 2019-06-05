import {Inject, Injectable, Optional} from '@angular/core';
import {LOGGER_CONFIG, LoggerConfig} from '../logger-types';

/**
 * Computes the prefix string used for loggers.
 */
@Injectable({
    providedIn: 'root'
})
export class PrefixService {
    /**
     * The regex used to remove tails.
     */
    private _replacer: RegExp;

    /**
     * Constructor
     */
    public constructor(@Inject(LOGGER_CONFIG) @Optional() config?: LoggerConfig) {
        const defaultTails = ['Component', 'Directive', 'Service', 'Factory', 'Pipe', 'Module', 'Resolver', 'Provider'];
        const tails = (config && config.tails) || defaultTails;
        this.addTails(tails);
    }

    /**
     * A list of tail strings.
     */
    private _tails: string[] = [];

    /**
     * Collection of strings that will be removed from the tail of logger prefixes.
     */
    public get tails(): string[] {
        return this._tails;
    }

    /**
     * Appends string values that will be removed from prefix tails.
     */
    public addTails(values: string[]) {
        this._tails = [...this._tails, ...values];
        this._replacer = undefined;
    }

    /**
     * Computes the prefix for a logger.
     */
    public prefix(value?: string): string {
        // Will be "unknown" in all IE browsers if class name is used.
        return (value || 'unknown').replace(this._getReplacer(), '');
    }

    /**
     * Gets the regex used to remove tails.
     */
    private _getReplacer(): RegExp {
        if (!this._replacer) {
            this._replacer = new RegExp(`(${this._tails.join('|')})$`);
        }
        return this._replacer;
    }
}
