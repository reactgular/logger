[![Build Status](https://travis-ci.org/reactgular/logger.svg?branch=master)](https://travis-ci.org/reactgular/logger)
[![Coverage Status](https://coveralls.io/repos/github/reactgular/logger/badge.svg?branch=master)](https://coveralls.io/github/reactgular/logger?branch=master)
[![npm version](https://badge.fury.io/js/%40reactgular%2Flogger.svg)](https://badge.fury.io/js/%40reactgular%2Flogger)

# Welcome to Logger's Documentation

This site covers Logger's usage and API documentation.

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

## Need help?

For questions, support or bugs, please open an issue on our GitHub page.

https://github.com/reactgular/logger/issues
