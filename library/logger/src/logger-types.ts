import {InjectionToken} from '@angular/core';

/**
 * Token used to inject the configuration object.
 */
export const LOGGER_CONFIG: InjectionToken<LoggerConfig> = new InjectionToken<LoggerConfig>('LOGGER_CONFIG');

/**
 * Configuration options for the logger. Can be provided in the root module.
 */
export interface LoggerConfig {
    enable: boolean;
}
