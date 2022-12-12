# BetterMutationObserver
A "better" implementation of the native [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) web interface.

## Background
The design of the native [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) interface separates the definition of the observer `callback()` function, which is provided as the sole argument when creating a new `MutationObserver` instance, from the definition of the target node and observer options, which define what DOM mutations are reported and are provided as arguments when calling the `observe()` method of the observer.

This separation of the callback, target node, and observer options arguments is unnecessary and makes reading the through code that implements the `MutationObserver` interface confusing. In almost all cases, the target node and observer options could be defined alongside the observe callback when the observer is instantiated. Doing so allows the code for creating mutation observers to be written in a more logical order.

Furthermore, in cases where it is necessary to observe multiple nodes, the `MutationObserver` constructor could be adapted to accept a node array or [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) in order to observe multiple nodes with a single observer.

This library adds a `BetterMutationObserver` interface that extends the native `MutationObserver` interface and implements the design improvements described above.

## Installation

Install the library with NPM or Yarn.

**NPM:**
```sh
npm install better-mutation-observer
```

**Yarn:**
```sh
yarn better-mutation-observer
```

Import the library to your project using CommonJS or ES Modules syntax.

**CommonJS**
```js
const BetterMutationObserver = require('better-mutation-observer')
```

**ES Modules**
```js
import { BetterMutationObserver } from 'better-mutation-observer'
```

## API
The `BetterMutationObserver` interface is largely the same as the native `MutationObserver` interface with key changes to the required arguments for the observer constructor and the `observe()` method on the instance.

### Constructor
`BetterMutationObserver()` – Creates and returns a new `BetterMutationObserver` instance, which will invoke a specified callback function when DOM changes occur on the specified node(s).

```js
new BetterMutationObserver(target, options, callback)
```
- `target` – A DOM [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node), `Node` array, or [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) within the DOM tree to watch for changes, or to be the root of a subtree of nodes to be watched.
- `options` – An object providing options that describe which DOM mutations should be reported to the `callback` function. Implements the same options parameters as the native `MutationObserver` interface. [See MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#parameters).
  - **Note:** In contrast to the native `MutationObserver` interface, the options object is not optional when instantiating the observer.
- `callback` – A function which will be called on each DOM change that qualifies given the observed node or subtree and options. Implements the same parameters as the native `MutationObserver` interface. [See MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver#parameters).

### Instance Methods
- `observe()` – Initiates the observer instance to begin receiving notifications through its callback function when DOM changes matching the given target and options occur. Unlike the native `MutationObserver` interface, this version of the `observe()` method accepts no arguments.
- `disconnect()` – Stops the observer instance from receiving further notifications until and unless `observe()` is called again. Implements the same functionality as the native `MutationObserver` interface. [See MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/disconnect).
- `takeRecords()` – Removes all pending notifications from the observer's notification queue and returns them in a new array of [`MutationRecord`](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) objects. Implements the same functionality as the native `MutationObserver` interface. [See MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/takeRecords).

### Example
The following example was adapted from [the example provided in the MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#example) for the native `MutationObserver` interface.
```js
// Import the `BetterMutationObserver` class
import { BetterMutationObserver } from 'better-mutation-observer'

// Select the node that will be observed for mutations
const targetNode = document.getElementById('some-id');

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    } else if (mutation.type === 'attributes') {
      console.log(`The ${mutation.attributeName} attribute was modified.`);
    }
  }
};

// Create an observer instance linked to the target node(s), configured mutations, and callback function
const observer = new MutationObserver(targetNode, config, callback);

// Start observing the target node(s)
observer.observe();

// Later, you can stop observing
observer.disconnect();
```

## License
This project uses the MIT License for open source software. See [LICENSE](LICENSE).