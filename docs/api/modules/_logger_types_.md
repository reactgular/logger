> # External module: "logger-types"

### Index

#### Enumerations

* [LOGGER_LEVEL](../enums/_logger_types_.logger_level.md)

#### Interfaces

* [ConsoleMethods](../interfaces/_logger_types_.consolemethods.md)
* [LoggerConfig](../interfaces/_logger_types_.loggerconfig.md)
* [TapperMethods](../interfaces/_logger_types_.tappermethods.md)

#### Type aliases

* [ConsoleMethod](_logger_types_.md#consolemethod)

#### Variables

* [ConsoleNoop](_logger_types_.md#const-consolenoop)
* [LOGGER_ALL](_logger_types_.md#const-logger_all)
* [LOGGER_CONSOLE](_logger_types_.md#const-logger_console)
* [LOGGER_LEVELS](_logger_types_.md#const-logger_levels)
* [LOGGER_TAILS](_logger_types_.md#const-logger_tails)
* [LOGGER_TAILS_DEFAULT](_logger_types_.md#const-logger_tails_default)

## Type aliases

###  ConsoleMethod

Ƭ **ConsoleMethod**: *function*

Defines the function type for a console method.

#### Type declaration:

▸ (...`params`: any[]): *`TReturn`*

**Parameters:**

Name | Type |
------ | ------ |
`...params` | any[] |

___

## Variables

### `Const` ConsoleNoop

● **ConsoleNoop**: *[ConsoleMethod](_logger_types_.md#consolemethod)‹*void*›* =  Function.prototype as ConsoleMethod<void>

Defines a console method that does not log output.

___

### `Const` LOGGER_ALL

● **LOGGER_ALL**: *number* =  LOGGER_LEVEL.DEBUG | LOGGER_LEVEL.ERROR | LOGGER_LEVEL.INFO | LOGGER_LEVEL.LOG | LOGGER_LEVEL.WARN

Logs all levels

___

### `Const` LOGGER_CONSOLE

● **LOGGER_CONSOLE**: *`InjectionToken<ConsoleMethods<void>>`* =  new InjectionToken<Console>('LOGGER_CONSOLE')

Token to inject the browser's console.

___

### `Const` LOGGER_LEVELS

● **LOGGER_LEVELS**: *`InjectionToken<LOGGER_LEVEL>`* =  new InjectionToken<LOGGER_LEVEL>('LOGGER_LEVELS')

Token to inject logging levels.

___

### `Const` LOGGER_TAILS

● **LOGGER_TAILS**: *`InjectionToken<string[]>`* =  new InjectionToken<string[]>('LOGGER_TAILS')

Token to inject tails that should removed from prefixes.

___

### `Const` LOGGER_TAILS_DEFAULT

● **LOGGER_TAILS_DEFAULT**: *string[]* =  ['Component', 'Directive', 'Service', 'Factory', 'Pipe', 'Module', 'Resolver', 'Provider']

Defaults list of tails to remove.

___