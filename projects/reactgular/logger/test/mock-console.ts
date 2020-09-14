import {ConsoleMethod, ConsoleMethods} from '../src/logger-types';

export class MockConsole implements ConsoleMethods<void> {
    public static METHODS: string[] = ['debug', 'warn', 'info', 'log', 'error'];

    public buffer: Array<{ name: string, args: any[] }> = [];

    public get debug(): ConsoleMethod<void> {
        return this._method('debug');
    }

    public get error(): ConsoleMethod<void> {
        return this._method('error');
    }

    public get info(): ConsoleMethod<void> {
        return this._method('info');
    }

    public get log(): ConsoleMethod<void> {
        return this._method('log');
    }

    public get warn(): ConsoleMethod<void> {
        return this._method('warn');
    }

    private _method(name: string): ConsoleMethod<void> {
        return (...args: any[]): void => {
            this.buffer.push({name, args});
        };
    }
}
