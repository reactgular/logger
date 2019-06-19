import {CommonModule} from '@angular/common';
import {NgModule, Provider} from '@angular/core';
import {LogNoopService} from './log-noop/log-noop.service';
import {LogService} from './log/log.service';
import {LOGGER_ALL, LOGGER_CONSOLE, LOGGER_LEVELS, LOGGER_TAILS, LOGGER_TAILS_DEFAULT, LoggerConfig} from './logger-types';
import {LogConsoleService} from './log-console/log-console.service';

@NgModule({})
export class LoggerModule {
    /**
     * Call this method to import the logger module into the app module.
     */
    public static forRoot(options?: LoggerConfig): NgModule {
        options = Object.assign({
            enabled: true,
            levels: LOGGER_ALL,
            tails: LOGGER_TAILS_DEFAULT,
            console: console
        } as LoggerConfig, options || {});

        const imports = [CommonModule];

        const providers: Provider[] = [
            {provide: LOGGER_LEVELS, useValue: options.levels},
            {provide: LOGGER_TAILS, useValue: options.tails},
            {provide: LOGGER_CONSOLE, useValue: options.console}
        ];

        if (options && options.enabled) {
            providers.push({provide: LogService, useClass: LogConsoleService});
        } else {
            providers.push({provide: LogService, useClass: LogNoopService});
        }

        return {imports, providers};
    }
}
