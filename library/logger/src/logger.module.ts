import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LOGGER_CONSOLE} from './logger-types';
import {LogService} from './log/log.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        LogService,
        {provide: LOGGER_CONSOLE, useValue: console}
    ]
})
export class LoggerModule {
}
