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

## Table Of Contents

- [What is Logger?](#what-is-logger)
- [Table Of Contents](#table-of-contents)
- [Why another console logger for Angular?](#why-another-console-logger-for-angular)
  * [Simple](#simple)
- [Installation](#installation)
- [LoggerConfig](#loggerconfig)
- [LogService](#logservice)
- [LogService Prefixes](#logservice-prefixes)
- [LogService Methods](#logservice-methods)
  * [LogService.debug()](#logservicedebug)
  * [LogService.error()](#logserviceerror)
  * [LogService.info()](#logserviceinfo)
  * [LogService.warn()](#logservicewarn)
  * [LogService.getPrefix()](#logservicegetprefix)
  * [LogService.setPrefix()](#logservicesetprefix)
  * [LogService.tap()](#logservicetap)
  * [LogService.withPrefix()](#logservicewithprefix)
- [TapperMethods](#tappermethods)
  * [TapperMethods.debug/error/info/log/warn()](#tappermethodsdebugerrorinfologwarn)
  * [TapperMethods.pipe()](#tappermethodspipe)
  * [TapperMethods.logger()](#tappermethodslogger)

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

## LogService

The `LogService` object provides access to the browser's debugging console, because the specifics of how the console works
across different browsers varies the available methods are `debug()`, `log()`, `info()`, `error()` and `warn()`.

```typescript
constructor(log: LogService) {
   log.info('The constructor method was executed.');
}
```

## LogService Prefixes

When you're using the `LogService` with Angular classes like components, services, pipes and etc. The name of those classes can be used to set the
prefix string for each log message to the console. Using a prefix value of `"MainComponent"` can create *wide* console messages. So this function
creates a new `LogService` object with a *trimmed* prefix where the *tail* strings have been removed.

For example;

The following prefix `"MainComponent"` will be rewritten to `"Main"`.

```typescript
@Component({...})
export class MainComponent {
   private _log: LogService;
   constructor(log: LogService) {
      this._log = log.withPrefix(MainComponent.name);
   }
}
```

When *tail* strings are removed is configured in the `LoggerConfig` you used when calling `LoggerModule.forRoot()`. If you don't define an
array of strings for `tails: string[]` then these default values are used.

```typescript
/**
 * Defaults list of tails to remove.
 */
export const LOGGER_TAILS_DEFAULT = ['Component', 'Directive', 'Service', 'Factory', 'Pipe', 'Module', 'Resolver', 'Provider'];
```

If you want to add additional tails to be removed you can configure the logger like this:

```typescript
import {LoggerModule, LOGGER_TRAILS_DEFAULT} from '@reactgular/logger';

@NgModule({
  imports: [
    LoggerModule.forRoot({
      enabled: !environment.production,
      tails: [...LOGGER_TAILS_DEFAULT, 'FooBar', 'Magic', 'Proxy']
    })
  ]
})
export class AppModule {}

```

## LogService Methods

This section documents methods available on the `LogService` object and gives a few usage examples.

### LogService.debug()

Outputs a message to the console with the log level "debug".

This method can be disabled by excluding `LOGGER_LEVEL.DEBUG` from the `levels` property of `LoggerConfig`.

> Starting with Chromium 58 this method only appears in Chromium browser consoles when level "Verbose" is selected.

### LogService.error()

Outputs an error message. You may use [string substitution](https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions) and additional arguments with this method.

This method can be disabled by excluding `LOGGER_LEVEL.ERROR` from the `levels` property of `LoggerConfig`.

### LogService.info()

Informative logging of information. You may use [string substitution](https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions) and additional arguments with this method.

This method can be disabled by excluding `LOGGER_LEVEL.INFO` from the `levels` property of `LoggerConfig`.

### LogService.warn()

Outputs a warning message. You may use [string substitution](https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions) and additional arguments with this method.

This method can be disabled by excluding `LOGGER_LEVEL.WARN` from the `levels` property of `LoggerConfig`.

### LogService.getPrefix()

Returns the prefix string used by the `LogService` object.

### LogService.setPrefix()

Sets a new prefix for the logger. This will change the *internal* prefix value used by the `LogService`. This function does not have the same
effect as `withPrefix()` which returns a new `LogService` object with a trail strings removed for the prefix.

### LogService.tap()

Creates an observable tapper that can listen for emitted values and output them to the browser's console. See [TapperMethods](#tappermethods) for more information.

### LogService.withPrefix()

Creates a new `LogService` object with the given prefix. 

## TapperMethods

Create a `TapperMethods` object by calling `LogService.tap()` inside the `pipe()` of an observable. A tapper subscribes to an outer observable, 
and creates a new inner observable that will only emit values to the browser's console. You can apply observable operators to this inner observable 
via the [pipe()](#tappermethodspipe) and they will have no side effects on the outer observable.

For example, you can filter values:

```typescript
of(1,2,3,4,5).pipe(
   logService.tap().pipe(filter(x => x === 3)).log()
).subscribe();
// prints "3" the console
```

The above applies a `filter()` operator to the tapper observable, but this filter has no side effects on the 
original observable. Only output to the console is filter.

### TapperMethods.debug/error/info/log/warn()

The `TapperMethods` object has the same console methods as the `LogService`. The difference is that the tapper logging methods return an
observable operator. That means that the tapper logging methods have to be used inside an `observable.pipe()` method.

For example:

```typescript
of(1,2,3,4).pipe(
   logService.tap().log()
).subscribe();
```

Because the tapper has to create an operator function the browser's console can not report the correct file name and line number. You
can use the `LogService` with a regular `tap()` operator if you need the file name, but you loose the ability to filter or map values
before they are printed to the console.

For example:

```typescript
of(1,2,3,4,5).pipe(
  tap(val => logService.log(val))
).subscribe()
```

### TapperMethods.pipe()

Adds observable operators to the inner observable that is tapping into the outer observables. Operators added to the
tapper will have no effect on the outer observable, but will be applied to the output for the console.

### TapperMethods.logger()

Returns the inner `LogService` used by the tapper for logging to the console.
