import {TestBed} from '@angular/core/testing';
import {LOGGER_CONFIG} from '../logger-types';

import {PrefixService} from './prefix.service';

describe('PrefixService', () => {
    it('should be configurable', () => {
        const prefix: PrefixService = TestBed
            .configureTestingModule({
                providers: [
                    {provide: LOGGER_CONFIG, useValue: {tails: ['House']}}
                ]
            })
            .get(PrefixService);
        expect(prefix.tails).toEqual(['House']);
        expect(prefix.prefix('WhiteHouse')).toBe('White');
    });

    it('should compute a prefix', () => {
        const prefix: PrefixService = TestBed.get(PrefixService);
        expect(prefix.prefix('AppComponent')).toBe('App');
    });

    it('should have default tails', () => {
        const prefix: PrefixService = TestBed.get(PrefixService);
        expect(prefix.tails).toEqual(['Component', 'Directive', 'Service', 'Factory', 'Pipe', 'Module', 'Resolver', 'Provider']);
    });

    it('should add tails to be removed', () => {
        const prefix: PrefixService = TestBed.get(PrefixService);
        prefix.addTails(['Mouse', 'Space']);
        expect(prefix.tails).toEqual([
            'Component', 'Directive', 'Service', 'Factory', 'Pipe', 'Module', 'Resolver', 'Provider', 'Mouse', 'Space'
        ]);
    });
});
