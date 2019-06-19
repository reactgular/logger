[![Build Status](https://travis-ci.org/reactgular/logger.svg?branch=master)](https://travis-ci.org/reactgular/logger)
[![Coverage Status](https://coveralls.io/repos/github/reactgular/logger/badge.svg?branch=master)](https://coveralls.io/github/reactgular/logger?branch=master)
[![npm version](https://badge.fury.io/js/%40reactgular%2Flogger.svg)](https://badge.fury.io/js/%40reactgular%2Flogger)

# Logger

Logger allows you to add `console.log()` messages to Angular applications and easily disable them in production. It helps make
console messages easier to filter by prefixing messages with the current class name. So if you have a component named `MainComponent` you
can filter by `Main:` to see only console messages from that component.

For example;

```
@Component({...})
export class MainComponent implements OnInit {
   private readonly _log: LogService;
   
   public constructor(log: LogService) {
      this._log = log.withPrefix(MainComponent.name);
   }
   
   public ngOnInit() {
      this._log.debug('Hello world!');
      // ^^^ outputs "Main: Hello world!"
   }
}
```

This library is based on the idea of *logging often* so that when a *bug* is discovered the *context* is known without any extra effort. If
you have to add log messages *later* to understand *why* the bug happened, then you haven't been logging *enough*.

# Installation

```
npm install --save @reactgular/logger
```

# Usage

Logger is enabled by default, but it's recommended to disable logging on production.

```
import {LOGGER_CONFIG, LoggerModule} from '@reactgular/logger';

@NgModule({
    imports: [
        LoggerModule
    ],
    providers: [
        {provide: LOGGER_CONFIG, useValue: {enable: true}}        
    ]
})
export class AppModule {}
```

Example usage inside a component.

```
@Component({...})
export class ExampleComponent implements OnInit {
  private readonly _log: LoggerService;
  
  public constructor(log: LoggerService) {
    this._log = log.withPrefix(ExampleComponent.name);
  }
  
  public ngOnInit() {
    this._log.debug('Initialize');
  }
}
```
