import {MockConsole} from '../../test/mock-console';
import {ConsoleNoop} from '../logger-types';
import {LogNoopService} from './log-noop.service';

describe(LogNoopService.name, () => {
    describe('console', () => {
        MockConsole.METHODS.forEach(name => {
            it(`should provide noop for console.${name}() method`, () => {
                const log: LogNoopService = new LogNoopService();
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
});
