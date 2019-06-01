import {NgModule} from '@angular/core';
import {LoggerModule} from './logger/logger.module';

@NgModule({
    imports: [
        LoggerModule
    ],
    exports: [
        LoggerModule
    ]
})
export class CommonModule {
}
