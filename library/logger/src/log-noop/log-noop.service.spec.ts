import {MockConsole} from '../../tests/mock-console';
import {ConsoleNoop, LoggerMethods} from '../logger-types';
import {TapperNoop} from '../tapper-noop/tapper-noop';
import {LogNoopService} from './log-noop.service';

describe(LogNoopService.name, () => {
    describe('console', () => {
        MockConsole.METHODS.forEach(name => {
            it(`should provide noop for console.${name}() method`, () => {
                const log: LoggerMethods = new LogNoopService();
                expect(typeof log[name]).toBe('function');
                expect(log[name]).toBe(ConsoleNoop);
            });
        });
    });

    it('should not set prefix', () => {
        const log = new LogNoopService();
        expect(log.getPrefix()).toBe('');
        expect(log.setPrefix('Hello')).toBe(log);
        expect(log.getPrefix()).toBe('');
        expect(log.withPrefix('Hello', '#')).toBe(log);
        expect(log.getPrefix()).toBe('');
    });

    it(`should provide ${TapperNoop.name}`, () => {
        const log = new LogNoopService();
        const tapper = log.tap();
        expect(tapper instanceof TapperNoop).toBeTruthy();
        expect(tapper.logger()).toBe(log);
    });
});
