import {Observable, OperatorFunction} from 'rxjs';
import {MockConsole} from '../../tests/mock-console';
import {LogNoopService} from '../log-noop/log-noop.service';
import {TapperNoop} from './tapper-noop';
import {LogService} from '../log/log.service';

describe(TapperNoop.name, () => {
    it('should have console methods', () => {
        const tapper = new TapperNoop(undefined);
        MockConsole.METHODS.forEach(name => expect(typeof tapper[name]).toBe('function'));
    });

    it('should not lift the observable', () => {
        const tapper = new TapperNoop(undefined);
        MockConsole.METHODS.forEach(name => {
            const op: OperatorFunction<any, any> = tapper[name]();
            const before = new Observable();
            const after = op(before);
            expect(before).toBe(after);
        });
    });

    it('should return the logger', () => {
        const logger: LogService = new LogNoopService();
        const tapper = new TapperNoop(logger);
        expect(logger).toBe(tapper.logger());
    });
});
