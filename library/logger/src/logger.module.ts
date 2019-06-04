import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LoggerService} from './logger/logger.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        LoggerService
    ]
})
export class LoggerModule {
}
