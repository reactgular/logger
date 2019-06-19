> # Class: LogService

Defines a base class which can double as an injection token in Angular. This allows the module to
replace the service with a different class without requiring users to use a @Inject() decorator.

## Hierarchy

* **LogService**

### Index

#### Accessors

* [debug](_log_log_service_.logservice.md#debug)
* [error](_log_log_service_.logservice.md#error)
* [info](_log_log_service_.logservice.md#info)
* [log](_log_log_service_.logservice.md#log)
* [warn](_log_log_service_.logservice.md#warn)

#### Methods

* [getPrefix](_log_log_service_.logservice.md#abstract-getprefix)
* [setPrefix](_log_log_service_.logservice.md#abstract-setprefix)
* [tap](_log_log_service_.logservice.md#abstract-tap)
* [withPrefix](_log_log_service_.logservice.md#abstract-withprefix)

## Accessors

###  debug

● **get debug**(): *[ConsoleMethod](../modules/_logger_types_.md#consolemethod)‹*void*›*

Debug method

**Returns:** *[ConsoleMethod](../modules/_logger_types_.md#consolemethod)‹*void*›*

___

###  error

● **get error**(): *[ConsoleMethod](../modules/_logger_types_.md#consolemethod)‹*void*›*

Error method

**Returns:** *[ConsoleMethod](../modules/_logger_types_.md#consolemethod)‹*void*›*

___

###  info

● **get info**(): *[ConsoleMethod](../modules/_logger_types_.md#consolemethod)‹*void*›*

Info method

**Returns:** *[ConsoleMethod](../modules/_logger_types_.md#consolemethod)‹*void*›*

___

###  log

● **get log**(): *[ConsoleMethod](../modules/_logger_types_.md#consolemethod)‹*void*›*

Log method

**Returns:** *[ConsoleMethod](../modules/_logger_types_.md#consolemethod)‹*void*›*

___

###  warn

● **get warn**(): *[ConsoleMethod](../modules/_logger_types_.md#consolemethod)‹*void*›*

Warn method

**Returns:** *[ConsoleMethod](../modules/_logger_types_.md#consolemethod)‹*void*›*

___

## Methods

### `Abstract` getPrefix

▸ **getPrefix**(): *any*

Gets the prefix for the logger

**Returns:** *any*

___

### `Abstract` setPrefix

▸ **setPrefix**(`value`: string): *any*

Sets a new prefix for the logger.

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |

**Returns:** *any*

___

### `Abstract` tap

▸ **tap**<**TObservable**>(): *[TapperMethods](../interfaces/_logger_types_.tappermethods.md)‹*`TObservable`*›*

Creates an observable tapper

**Type parameters:**

■` TObservable`

**Returns:** *[TapperMethods](../interfaces/_logger_types_.tappermethods.md)‹*`TObservable`*›*

___

### `Abstract` withPrefix

▸ **withPrefix**(`value?`: string, `separator?`: string): *[LogService](_log_log_service_.logservice.md)*

Creates a new logger and appends the prefix.

**Parameters:**

Name | Type |
------ | ------ |
`value?` | string |
`separator?` | string |

**Returns:** *[LogService](_log_log_service_.logservice.md)*

___