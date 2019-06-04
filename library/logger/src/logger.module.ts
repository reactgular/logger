import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgtUniversalModule} from '@ng-toolkit/universal';
import {LoggerService} from './logger/logger.service';

@NgModule({
    imports: [
        CommonModule,
        NgtUniversalModule
    ],
    providers: [
        LoggerService
    ]
})
export class LoggerModule {
}
