import {NgModule} from '@angular/core';
import {LogService} from './log/log.service';
import {StackTraceService} from './stack-trace/stack-trace.service';

@NgModule({
    providers: [
        LogService,
        StackTraceService
    ]
})
export class LoggerModule {
}
