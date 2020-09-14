import {TestBed} from '@angular/core/testing';
import {MockConsole} from '../../test/mock-console';
import {LogConsoleService} from '../log-console/log-console.service';
import {LOGGER_ALL, LOGGER_CONSOLE, LOGGER_LEVELS, LOGGER_TAILS, LOGGER_TAILS_DEFAULT} from '../logger-types';
import {LogService} from './log.service';

describe(LogService.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: LogService, useClass: LogConsoleService},
                {provide: LOGGER_LEVELS, useValue: LOGGER_ALL},
                {provide: LOGGER_TAILS, useValue: LOGGER_TAILS_DEFAULT},
                {provide: LOGGER_CONSOLE, useValue: new MockConsole()}
            ]
        });
    });

    it('should set/get the prefix', () => {
        const log: LogService = TestBed.inject(LogService);
        expect(log.getPrefix()).toBe('');
        log.setPrefix('Example');
        expect(log.getPrefix()).toBe('Example');
    });

    it('should create a new logger with prefix', () => {
        let log: LogService = TestBed.inject(LogService);
        expect(log.getPrefix()).toBe('');
        log = log.withPrefix('AppComponent');
        expect(log.getPrefix()).toBe('App:');
        log = log.withPrefix('WidgetComponent');
        expect(log.getPrefix()).toBe('App:Widget:');
    });

    it('should use a separator', () => {
        let log: LogService = TestBed.inject(LogService);
        log = log.withPrefix('AppComponent', '@');
        expect(log.getPrefix()).toBe('App@');
    });
});
