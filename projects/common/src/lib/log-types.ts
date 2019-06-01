import {InjectionToken} from '@angular/core';

/**
 * Token used to inject the configuration object.
 */
export const LOG_CONFIG: InjectionToken<LogConfig> = new InjectionToken<LogConfig>('LOG_CONFIG');

/**
 * Configuration options for the logger. Can be provided in the root module.
 */
export interface LogConfig {
    enable: boolean;
}
