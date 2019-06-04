import {TestBed} from '@angular/core/testing';

import {PrefixService} from './prefix.service';

describe('PrefixService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: PrefixService = TestBed.get(PrefixService);
        expect(service).toBeTruthy();
    });
});
