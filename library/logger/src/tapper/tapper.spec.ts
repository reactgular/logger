import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {MockConsole} from '../../tests/mock-console';
import {LOGGER_CONFIG, LOGGER_CONSOLE} from '../logger-types';
import {LoggerService} from '../logger/logger.service';
import {Tapper} from './tapper';

describe(Tapper.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoggerService,
                {provide: LOGGER_CONFIG, useValue: {enabled: true}},
                {provide: LOGGER_CONSOLE, useValue: new MockConsole()}
            ]
        });
    });

    it('prefix should end with $', () => {
        const log: LoggerService = TestBed.get(LoggerService);
        const prefix = log.withPrefix('App').withPrefix('Widget').tap().getLogger().getPrefix();
        expect(prefix).toBe('App:Widget$');
    });

    it('should have console methods', () => {
        const log: LoggerService = TestBed.get(LoggerService);
        const tapper = log.tap();
        MockConsole.METHODS.forEach(name => {
            expect(typeof tapper[name]).toBe('function');
        });
    });

    MockConsole.METHODS.forEach(name => {
        it(`should call console.${name}() method from observable`, () => {
            const mock: MockConsole = TestBed.get(LOGGER_CONSOLE);
            const log: LoggerService = TestBed.get(LoggerService);
            const tapper = log.tap();
            expect(typeof tapper[name]).toBe('function');

            of('hello').pipe(tapper[name]()).subscribe();

            console.log(mock.buffer);
        });
    });

    it('should map values', () => {
        const mock: MockConsole = TestBed.get(LOGGER_CONSOLE);
        let log: LoggerService = TestBed.get(LoggerService);
        log = log.withPrefix('App').withPrefix('Widget');

        of({value: 'hello'}).pipe(
            log.tap(v => v.value).debug()
        ).subscribe();
    });
});
