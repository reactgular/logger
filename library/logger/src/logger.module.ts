import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {LogConsoleService} from './log-console/log-console.service';
import {LogNoopService} from './log-noop/log-noop.service';
import {LogService} from './log/log.service';
import {
    ConsoleMethods,
    LOGGER_ALL,
    LOGGER_CONSOLE,
    LOGGER_LEVEL,
    LOGGER_LEVELS,
    LOGGER_TAILS,
    LOGGER_TAILS_DEFAULT,
    LoggerConfig
} from './logger-types';
import {PrefixService} from './prefix/prefix.service';

export const LOGGER_OPTIONS: InjectionToken<LoggerConfig> = new InjectionToken<LoggerConfig>('LOGGER_OPTIONS');

export function LogServiceFactory(
    levels: LOGGER_LEVEL,
    console: ConsoleMethods<void>,
    prefixService: PrefixService,
    loggerConfig: LoggerConfig
) {
    return loggerConfig && loggerConfig.enabled
        ? new LogConsoleService(levels, console, prefixService)
        : new LogNoopService();
}

// @dynamic
@NgModule({})
export class LoggerModule {
    /**
     * Call this method to import the logger module into the app module.
     */
    public static forRoot(loggerConfig?: LoggerConfig): ModuleWithProviders<LoggerModule> {
        return {
            ngModule: LoggerModule,
            providers: [
                {provide: LOGGER_LEVELS, useValue: loggerConfig.levels || LOGGER_ALL},
                {provide: LOGGER_TAILS, useValue: loggerConfig.tails || LOGGER_TAILS_DEFAULT},
                {provide: LOGGER_CONSOLE, useValue: loggerConfig.console || console},
                {provide: LOGGER_OPTIONS, useValue: loggerConfig || {}},
                {
                    provide: LogService,
                    useFactory: LogServiceFactory,
                    deps: [LOGGER_LEVELS, LOGGER_CONSOLE, PrefixService, LOGGER_OPTIONS]
                }
            ]
        };
    }
}
