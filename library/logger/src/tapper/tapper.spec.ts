import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {MockConsole} from '../../tests/mock-console';
import {LOGGER_CONFIG, LOGGER_CONSOLE} from '../logger-types';
import {LoggerService} from '../logger/logger.service';
import {Tapper} from './tapper';

describe(Tapper.name, () => {
    let mock: MockConsole;
    let log: LoggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoggerService,
                {provide: LOGGER_CONFIG, useValue: {enabled: true}},
                {provide: LOGGER_CONSOLE, useValue: new MockConsole()}
            ]
        });
        log = TestBed.get(LoggerService);
        mock = TestBed.get(LOGGER_CONSOLE);
    });

    it('should have console methods', () => {
        const tapper = new Tapper(log);
        MockConsole.METHODS.forEach(name => expect(typeof tapper[name]).toBe('function'));
    });

    MockConsole.METHODS.forEach(name => {
        it(`should call console.${name}() method from observable`, () => {
            const tapper = new Tapper(log);
            const args = ['hello'];
            of(...args).pipe(tapper[name]()).subscribe();
            expect(mock.buffer).toEqual([{name, args}]);
        });
    });

    it('should map values', () => {
        of({value: 'hello'}).pipe(log.tap(v => v.payload).debug()).subscribe();
        expect(mock.buffer).toEqual([{name: 'debug', args: ['$', 'hello']}]);
    });

    it('should filter values', () => {
        of(1, 2, 3, 4, 5).pipe(log.tap().filter(v => v >= 3).debug()).subscribe();
        expect(mock.buffer).toEqual([
            {name: 'debug', args: ['$', 3]},
            {name: 'debug', args: ['$', 4]},
            {name: 'debug', args: ['$', 5]}
        ]);
    });

    it('should log first value', () => {
        const observe$ = of(1, 2, 3, 4, 5).pipe(log.tap().first().debug());
        observe$.subscribe();
        observe$.subscribe();
        observe$.subscribe();
        expect(mock.buffer).toEqual([
            {name: 'debug', args: ['$', 1]},
            {name: 'debug', args: ['$', 1]},
            {name: 'debug', args: ['$', 1]}
        ]);
    });
});
