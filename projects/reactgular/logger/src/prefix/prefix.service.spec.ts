import {TestBed} from '@angular/core/testing';
import {LOGGER_ALL, LOGGER_LEVELS, LOGGER_TAILS, LOGGER_TAILS_DEFAULT} from '../logger-types';

import {PrefixService} from './prefix.service';

describe('PrefixService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: LOGGER_TAILS, useValue: LOGGER_TAILS_DEFAULT}
            ]
        });
    });

    it('should be configurable', () => {
        const prefix: PrefixService = TestBed
            .configureTestingModule({
                providers: [
                    {provide: LOGGER_LEVELS, useValue: LOGGER_ALL},
                    {provide: LOGGER_TAILS, useValue: ['House']}
                ]
            })
            .inject(PrefixService);
        expect(prefix.tails).toEqual(['House']);
        expect(prefix.prefix('WhiteHouse')).toBe('White');
    });

    it('should use unknown with IE browsers', () => {
        const prefix: PrefixService = TestBed.inject(PrefixService);
        expect(prefix.prefix(undefined)).toBe('unknown');
    });

    it('should support optional tails injectable', () => {
        const prefix: PrefixService = TestBed
            .configureTestingModule({
                providers: [
                    {provide: LOGGER_LEVELS, useValue: LOGGER_ALL},
                    {provide: LOGGER_TAILS, useValue: undefined}
                ]
            })
            .inject(PrefixService);
        expect(prefix.tails).toEqual([]);
    });

    it('should compute a prefix', () => {
        const prefix: PrefixService = TestBed.inject(PrefixService);
        expect(prefix.prefix('AppComponent')).toBe('App');
    });

    it('should have default tails', () => {
        const prefix: PrefixService = TestBed.inject(PrefixService);
        expect(prefix.tails).toEqual(['Component', 'Directive', 'Service', 'Factory', 'Pipe', 'Module', 'Resolver', 'Provider']);
    });

    it('should add tails to be removed', () => {
        const prefix: PrefixService = TestBed.inject(PrefixService);
        prefix.addTails(['Mouse', 'Space']);
        expect(prefix.tails).toEqual([
            'Component', 'Directive', 'Service', 'Factory', 'Pipe', 'Module', 'Resolver', 'Provider', 'Mouse', 'Space'
        ]);
    });
});
