> # Interface: LoggerConfig

Defines configuration for the logger module.

## Hierarchy

* **LoggerConfig**

### Index

#### Properties

* [console](_logger_types_.loggerconfig.md#optional-console)
* [enabled](_logger_types_.loggerconfig.md#optional-enabled)
* [levels](_logger_types_.loggerconfig.md#optional-levels)
* [tails](_logger_types_.loggerconfig.md#optional-tails)

## Properties

### `Optional` console

● **console**? : *[ConsoleMethods](_logger_types_.consolemethods.md)‹*void*›*

A reference to the browser's console.

___

### `Optional` enabled

● **enabled**? : *boolean*

False to replace logger with a noop service that disables all console output.

___

### `Optional` levels

● **levels**? : *[LOGGER_LEVEL](../enums/_logger_types_.logger_level.md)*

Logging levels settings to 0 is not as effective as setting enabled to false.

___

### `Optional` tails

● **tails**? : *string[]*

Strings to be removed from the tail of logger prefixes.

___