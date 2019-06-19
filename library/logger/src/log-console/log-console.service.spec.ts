import {TestBed} from '@angular/core/testing';

import {LogConsoleService} from './log-console.service';

describe(LogConsoleService.name, () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: LogConsoleService = TestBed.get(LogConsoleService);
        expect(service).toBeTruthy();
    });
});
