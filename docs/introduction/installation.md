## Installation

To get started, install the package from npm. The latest version (1.x) supports Angular 8.

```bash
npm install --save @reactgular/logger

# or if you are using yarn
yarn add @reactgular/logger
```

then in `app.module.ts`, import the `NgxsModule`:

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

When you include the module in the import, you can pass root stores along with [options](../advanced/options.md).
If you are lazy loading, you can just use the `LoggerModule` module.

Options such as `enabled` can be passed to the module as the second argument in the `forRoot` method. When `enabled` is
set to *false* the log service is replaced with a tiny *proxy* service that outputs nothing.

It's important that you add `LoggerModule.forRoot()` at the root of your modules.
