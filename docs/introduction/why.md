# Why?

Why another console logger for Angular? I've been copying and pasting the same log service between projects for several years. Everything else I tried
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

# Easy to install and use

Please see the following section, but adding Logger to an existing project is very easy. Once it's installed you just use it when you need it.
