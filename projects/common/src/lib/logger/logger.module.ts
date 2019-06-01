import {NgModule} from '@angular/core';
import {LoggerService} from './log/loggerService';
import {StackTraceService} from './stack-trace/stack-trace.service';

@NgModule({
    providers: [
        LoggerService,
        StackTraceService
    ]
})
export class LoggerModule {
}
