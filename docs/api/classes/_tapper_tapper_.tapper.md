> # Class: Tapper <**TObservable**>

Tappers are used to listen into observable streams and log the emitted values to the console. A tapper can have observable
operators piped that effect only the console output.

## Type parameters

■` TObservable`

## Hierarchy

* **Tapper**

## Implements

* [TapperMethods](../interfaces/_logger_types_.tappermethods.md)‹*`TObservable`*›

### Index

#### Constructors

* [constructor](_tapper_tapper_.tapper.md#constructor)

#### Methods

* [debug](_tapper_tapper_.tapper.md#debug)
* [error](_tapper_tapper_.tapper.md#error)
* [info](_tapper_tapper_.tapper.md#info)
* [log](_tapper_tapper_.tapper.md#log)
* [logger](_tapper_tapper_.tapper.md#logger)
* [pipe](_tapper_tapper_.tapper.md#pipe)
* [warn](_tapper_tapper_.tapper.md#warn)

## Constructors

###  constructor

\+ **new Tapper**(`_log`: [LogService](_log_log_service_.logservice.md)): *[Tapper](_tapper_tapper_.tapper.md)*

Constructor

**Parameters:**

Name | Type |
------ | ------ |
`_log` | [LogService](_log_log_service_.logservice.md) |

**Returns:** *[Tapper](_tapper_tapper_.tapper.md)*

___

## Methods

###  debug

▸ **debug**(...`args`: any[]): *`OperatorFunction<TObservable, TObservable>`*

*Implementation of [TapperMethods](../interfaces/_logger_types_.tappermethods.md)*

Prints debug messages to the console.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *`OperatorFunction<TObservable, TObservable>`*

___

###  error

▸ **error**(...`args`: any[]): *`OperatorFunction<TObservable, TObservable>`*

*Implementation of [TapperMethods](../interfaces/_logger_types_.tappermethods.md)*

Prints error messages to the console.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *`OperatorFunction<TObservable, TObservable>`*

___

###  info

▸ **info**(...`args`: any[]): *`OperatorFunction<TObservable, TObservable>`*

*Implementation of [TapperMethods](../interfaces/_logger_types_.tappermethods.md)*

Prints info messages to the console.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *`OperatorFunction<TObservable, TObservable>`*

___

###  log

▸ **log**(...`args`: any[]): *`OperatorFunction<TObservable, TObservable>`*

*Implementation of [TapperMethods](../interfaces/_logger_types_.tappermethods.md)*

Prints log messages to the console.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *`OperatorFunction<TObservable, TObservable>`*

___

###  logger

▸ **logger**(): *[LogService](_log_log_service_.logservice.md)*

*Implementation of [TapperMethods](../interfaces/_logger_types_.tappermethods.md)*

Gets the logger associated with the tapper.

**Returns:** *[LogService](_log_log_service_.logservice.md)*

___

###  pipe

▸ **pipe**(...`args`: `OperatorFunction<any, any>`[]): *[TapperMethods](../interfaces/_logger_types_.tappermethods.md)‹*`TObservable`*›*

*Implementation of [TapperMethods](../interfaces/_logger_types_.tappermethods.md)*

**`todo`** Look at how the types for pipe() are done in rxjs.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | `OperatorFunction<any, any>`[] |

**Returns:** *[TapperMethods](../interfaces/_logger_types_.tappermethods.md)‹*`TObservable`*›*

___

###  warn

▸ **warn**(...`args`: any[]): *`OperatorFunction<TObservable, TObservable>`*

*Implementation of [TapperMethods](../interfaces/_logger_types_.tappermethods.md)*

Prints warn messages to the console.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *`OperatorFunction<TObservable, TObservable>`*

___