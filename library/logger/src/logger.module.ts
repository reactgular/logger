import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LogService} from './log/log.service';
import {LOGGER_ALL, LOGGER_CONSOLE, LOGGER_LEVELS, LOGGER_TAILS, LOGGER_TAILS_DEFAULT} from './logger-types';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        LogService,
        {provide: LOGGER_LEVELS, useValue: LOGGER_ALL},
        {provide: LOGGER_TAILS, useValue: LOGGER_TAILS_DEFAULT},
        {provide: LOGGER_CONSOLE, useValue: console}
    ]
})
export class LoggerModule {
}
