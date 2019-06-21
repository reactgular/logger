[![Build Status](https://travis-ci.org/reactgular/logger.svg?branch=master)](https://travis-ci.org/reactgular/logger)
[![Coverage Status](https://coveralls.io/repos/github/reactgular/logger/badge.svg?branch=master)](https://coveralls.io/github/reactgular/logger?branch=master)
[![npm version](https://badge.fury.io/js/%40reactgular%2Flogger.svg)](https://badge.fury.io/js/%40reactgular%2Flogger)


## What is Logger?

Logger is a small Angular service that writes output to the browser's console. It helps make
console messages easier to filter by prefixing messages with the current class name. So if you have a component named `MainComponent` you
can filter by `Main:` and see only console messages from that component. It also supports tapping *observables* so you can see how
data is flowing through your application.

> Logger extends console so messages continue to display the current *filename* and *line number*.

For example;

```typescript
@Component({...})
export class MainComponent implements OnInit {
   private _log: LogService;
   
   private _subject: Subject<string> = new Subject();
   
   public constructor(log: LogService) {
      this._log = log.withPrefix(MainComponent.name);
   }
   
   public ngOnInit() {
      this._log.debug('Hello world!');
      // ^^^ outputs "Main: Hello world!"
      
      this._subject.pipe(
         this._log.tap().debug('Hello world!')
      ).subscribe();
      
      this._subject.next("Everyone!");
      // ^^^ outputs "Main$ Hello world! Everyone!"
   }
}
```

## Why another console logger for Angular? 

I've been copying and pasting the same log service between projects for several years. Everything else I tried
was either too complicated or *erased* the *file name* and *line number* from the browser's console output, and I just kept reusing my trusty
logger code. I decided it was time to make it an official library that could be easily installed and reused.

### Simple

Logger works exactly the same as the *console* object in your browser. The only differences are:

- you have to inject LogService
- you have to give it a prefix

It can be added to your classes quickly with an extra parameter on the constructor and two more lines of code. I feel that it
greatly improves the readability of the console messages making this small extra work worthwhile.

For example;

```typescript
@Component({..})
export class MainComponent {
   private _log: LogService;
   
   constructor(log: LogService) {
      this._log = log.withPrefix(MainComponent.name);
   }
}
```

The prefix value can be anything that you want, but using `MainComponent.name` means that the value is 
updated if you rename the class using an IDE that automatically updates all usages.

## Installation

To get started, install the package from npm. The latest version (1.x) supports Angular 8.

```bash
npm install --save @reactgular/logger

# or if you are using yarn
yarn add @reactgular/logger
```

then in `app.module.ts`, import the `LoggerModule`:

```typescript
import {NgModule} from '@angular/core';
import {LoggerModule} from '@reactgular/logger';

@NgModule({
    imports: [
        LoggerModule.forRoot({enabled: true})
    ]
})
export class AppModule {}
```

When you include the module in the import, you can pass a configuration object of type LoggerConfig.
If you are lazy loading, you can just use the `LoggerModule` module.

Options such as `enabled` can be passed to the module as the second argument in the `forRoot` method. When `enabled` is
set to *false* the log service is replaced with a tiny *proxy* service that outputs nothing.

It's important that you add `LoggerModule.forRoot()` at the root of your modules.

## LoggerConfig

You can provide a config object of type `LoggerConfig`, as the first parameter for `LoggerModule.forRoot()`.

```typescript
@NgModule({
  imports: [
    LoggerModule.forRoot({
      console: window.console,
      enabled: !environment.production,
      levels: LOGGER_LEVEL.DEBUG | LOGGER_LEVEL.ERROR | LOGGER_LEVEL.INFO | LOGGER_LEVEL.LOG | LOGGER_LEVEL.WARN,
      tails: ['Component', 'Directive', 'Service', 'Factory', 'Pipe', 'Module', 'Resolver', 'Provider']
    })
  ]
})
export class AppModule {}
```
