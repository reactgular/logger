import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {filter, first, map} from 'rxjs/operators';
import {MockConsole} from '../../tests/mock-console';
import {LogService} from '../log/log.service';
import {LOGGER_ALL, LOGGER_CONSOLE, LOGGER_LEVELS} from '../logger-types';
import {Tapper} from './tapper';
import {LogConsoleService} from '../log-console/log-console.service';

describe(Tapper.name, () => {
    let mock: MockConsole;
    let log: LogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: LogService, useClass: LogConsoleService},
                {provide: LOGGER_LEVELS, useValue: LOGGER_ALL},
                {provide: LOGGER_CONSOLE, useValue: new MockConsole()}
            ]
        });
        log = TestBed.inject(LogService);
        mock = TestBed.inject<MockConsole>(LOGGER_CONSOLE);
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
        of({value: 'hello'}).pipe(
            log.tap().pipe(map(v => v.value)).debug()
        ).subscribe();

        expect(mock.buffer).toEqual([{name: 'debug', args: ['$', 'hello']}]);
    });

    it('should filter values', () => {
        of(1, 2, 3, 4, 5).pipe(
            log.tap().pipe(filter(v => v >= 3)).debug()
        ).subscribe();

        expect(mock.buffer).toEqual([
            {name: 'debug', args: ['$', 3]},
            {name: 'debug', args: ['$', 4]},
            {name: 'debug', args: ['$', 5]}
        ]);
    });

    it('should log first value', () => {
        of(1, 2, 3, 4, 5).pipe(
            log.tap().pipe(first()).debug()
        ).subscribe();

        expect(mock.buffer).toEqual([
            {name: 'debug', args: ['$', 1]}
        ]);
    });

    it('should log extra messages', () => {
        of('world').pipe(
            log.tap().debug('hello')
        ).subscribe();

        expect(mock.buffer).toEqual([
            {name: 'debug', args: ['$', 'hello', 'world']}
        ]);
    });
});
