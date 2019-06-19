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
