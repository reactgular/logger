import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgtUniversalModule} from '@ng-toolkit/universal';
import {LoggerService} from './logger/logger.service';
import {StackTraceService} from './stack-trace/stack-trace.service';

@NgModule({
    imports: [
        CommonModule,
        NgtUniversalModule
    ],
    providers: [
        LoggerService,
        StackTraceService
    ]
})
export class LoggerModule {
}
