import {TestBed} from '@angular/core/testing';
import {LOGGER_CONFIG} from '../logger-types';
import {LoggerService} from './logger.service';

describe(LoggerService.name, () => {
    let log: LoggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoggerService,
                {provide: LOGGER_CONFIG, useValue: {enabled: true}}
            ]
        });
        log = TestBed.get(LoggerService);
    });

    it('should debug', () => {
        log.debug('hello world');
    });

    it('should have be accessible as static property', () => {
        expect(LoggerService.Logger instanceof LoggerService).toBeTruthy();
    });
});
