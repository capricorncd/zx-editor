# EventEmitter

This module, in particular, offers the EventEmitter class, which we'll use to handle our events.

```js
// For example, let's create a start event, and as a matter of providing a sample,
// we react to that by just logging to the console:
const eventEmitter = new EventEmitter()

eventEmitter.on('start', () => {
  console.log('started')
})

// When we run
eventEmitter.emit('start')
// the event handler function is triggered, and we get the console log.
```

## Methods

### destroyEventEmitter()

remove all listeners for an event.

- @returns `void`

### emit(eventName, arg1, arg2, ..., argN)

`emit` is used to trigger an event.

- @param eventName `string`
- @param args `any`

- @returns `EventEmitter`

### off(eventName, fn)

remove an event listener from an event.

- @param eventName `string` custom event name.
- @param fn `Function` callback function.

- @returns `EventEmitter`

### on(eventName, fn)

`on` is used to add a callback function that's going to be executed when the event is triggered.

- @param eventName `string` custom event name.
- @param fn `Function` callback function.

- @returns `EventEmitter`

### once(eventName, fn)

`once` add a one-time listener.

- @param eventName `string` custom event name.
- @param fn `Function` callback function.

- @returns `EventEmitter`

## Types

### EventEmitterCallback

```ts
type EventEmitterCallback = (...args: any[]) => void
```

## License

MIT License © 2018-Present [Capricorncd](https://github.com/capricorncd).