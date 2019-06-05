import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LOGGER_CONSOLE} from './logger-types';
import {LoggerService} from './logger/logger.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        LoggerService,
        {provide: LOGGER_CONSOLE, useValue: console}
    ]
})
export class LoggerModule {
}
