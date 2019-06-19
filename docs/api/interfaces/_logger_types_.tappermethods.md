> # Interface: TapperMethods <**TObservable**>

Defines the methods for the tapper of an observable.

## Type parameters

■` TObservable`

## Hierarchy

* **TapperMethods**

## Implemented by

* [Tapper](../classes/_tapper_tapper_.tapper.md)

### Index

#### Methods

* [debug](_logger_types_.tappermethods.md#debug)
* [error](_logger_types_.tappermethods.md#error)
* [info](_logger_types_.tappermethods.md#info)
* [log](_logger_types_.tappermethods.md#log)
* [logger](_logger_types_.tappermethods.md#logger)
* [pipe](_logger_types_.tappermethods.md#pipe)
* [warn](_logger_types_.tappermethods.md#warn)

## Methods

###  debug

▸ **debug**(...`args`: any[]): *`OperatorFunction<TObservable, TObservable>`*

Prints debug messages to the console.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *`OperatorFunction<TObservable, TObservable>`*

___

###  error

▸ **error**(...`args`: any[]): *`OperatorFunction<TObservable, TObservable>`*

Prints error messages to the console.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *`OperatorFunction<TObservable, TObservable>`*

___

###  info

▸ **info**(...`args`: any[]): *`OperatorFunction<TObservable, TObservable>`*

Prints info messages to the console.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *`OperatorFunction<TObservable, TObservable>`*

___

###  log

▸ **log**(...`args`: any[]): *`OperatorFunction<TObservable, TObservable>`*

Prints log messages to the console.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *`OperatorFunction<TObservable, TObservable>`*

___

###  logger

▸ **logger**(): *[LogService](../classes/_log_log_service_.logservice.md)*

Gets the logger associated with the tapper.

**Returns:** *[LogService](../classes/_log_log_service_.logservice.md)*

___

###  pipe

▸ **pipe**(...`args`: `OperatorFunction<any, any>`[]): *[TapperMethods](_logger_types_.tappermethods.md)‹*`TObservable`*›*

Adds observable operators to the inner observable that is tapping into the outer observables. Operators added to the
tapper will have no effect on the outer observable, but will be applied to the output for the console.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | `OperatorFunction<any, any>`[] |

**Returns:** *[TapperMethods](_logger_types_.tappermethods.md)‹*`TObservable`*›*

___

###  warn

▸ **warn**(...`args`: any[]): *`OperatorFunction<TObservable, TObservable>`*

Prints warn messages to the console.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *`OperatorFunction<TObservable, TObservable>`*

___