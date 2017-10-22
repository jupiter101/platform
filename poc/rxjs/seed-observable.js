/**
 *
 * @see http://xgrommx.github.io/rx-book/index.html
 */
const Rx = require('rxjs/Rx');
Rx.DOM = require('rx-dom').DOM;

require('rxjs/observable/range');
require('rxjs/observable/from');
require('rxjs/observable/of');

require('rxjs/operator/catch');
require('rxjs/operator/map');
require('rxjs/operator/filter');
require('rxjs/operator/reduce');
require('rxjs/operator/merge');
require('rxjs/operator/delay');






const logger = s => console.log(s);

/*
  Interval and merge Operators
 */
const intervalObsvr = require('./interval');
// console.log('############## Interval and merge Operators ##############');
// intervalObsvr().subscribe(logger);

/*
  Range operator
 */
console.log('\n############## Filter operator ##############');
var srcRange = Rx.Observable.range(1, 5);
var isEven = (function(val) { return val % 2 !== 0; });
var even = srcRange.filter(isEven);
even.subscribe( logger);


/*
  Reduce operator
 */
console.log('\n############## Reduce operator ##############');
var srcReduce = Rx.Observable.range(1, 5);
var sum = srcReduce.reduce( (acc, n) => acc + n);
sum.subscribe(logger);


/*
  Aggregate Operators custom average
 */
console.log('\n############## Aggregate Operators custom average ##############');
var avg = Rx.Observable.range(0, 5)
  .reduce(function(prev, cur) {
    return {
      sum: prev.sum + cur,
      count: prev.count + 1
    };
  }, { sum: 0, count: 0 })
  .map(function(o) {
    return o.sum / o.count;
  });
var avgSubscription = avg.subscribe(function(x) {
  console.log('Average is: ', x);
});

avgSubscription.unsubscribe();


/*
  Average infinite calculation
 */
console.log('\n############## Average infinite calculation ##############');
const avgInfinite = require('./infinite');
const avgInfiniteSubscription = avgInfinite.subscribe(logger);

// Explicitly dispose Observable
setTimeout(() => {
  console.log('Cancelling infinite calculation...');
  // avgInfiniteSubscription.dispose();
  avgInfiniteSubscription.unsubscribe();
}, 5);





/*
  ConcatAll function to flatten jagged arrays (NO Observables)
 */
console.log('\n############## ConcatAll function to flatten jagged arrays (NO Observables) ##############');
function concatAll(source) {
  return source.reduce(function(a, b) {
    return a.concat(b);
  });
}
concatAll([[0, 1, 2], [3, 4, 5], [6, 7, 8]]).forEach(logger);

/*
  flatMap Operator

  TODO
 */
const jaggedArrayObsrv = Rx.Observable.from([[0, 1, 2], [3, 4, 5], [6, 7, 8]]);
// jaggedArrayObsrv.flatMap().subscribe(logger);


/*
  Error Handling
 */

function getJSON(arr) {
  return Rx.Observable.from(arr).map(function(str) {
    var parsedJSON = JSON.parse(str);
    return parsedJSON;
  });
}

getJSON([
  '{"1": 1, "2": 2}',
  '{"success: true}', // Invalid JSON string
  '{"enabled": true}'
]).subscribe(
  function(json) {
    console.log('Parsed JSON: ', json);
  },
  function(err) {
    console.log(err.message);
  }
);


/*
  Catching Errors
 */
const caught = getJSON(['{"1": 1, "2": 2}', '{"1: 1}']).catch(
  Rx.Observable.of({
    error: 'There was an error parsing JSON'
  })
);

caught.subscribe(
  function(json) {
    console.log('Parsed JSON: ', json);
  },
// Because we catch errors now, `onError` will not be executed
  function(e) {
    console.log('ERROR', e.message);
  }
);


/*
  Retrying Sequences
  Works only inside a browser not with Node.js
 */
Rx.DOM.get('/products').retry(5)
  .subscribe(
    function(xhr) { console.log(xhr); },
    function(err) { console.error('ERROR: ', err); }
  );


/*
  Subject
  In the example we create a new Subject and a source Observable
  that emits an integer every second. Then we subscribe the Subject to the
  Observable. After that, we subscribe an Observer to the Subject itself. The
  Subject now behaves as an Observable.
  Next we make the Subject emit values of its own (message1 and message2). In
  the final result, we get the Subject’s own messages and then the proxied values
  from the source Observable. The values from the Observable come later
  because they are asynchronous, whereas we made the Subject’s own values
  immediate. Notice that even if we tell the source Observable to take the first
  five values, the output shows only the first three. That’s because after one
  second we call onCompleted on the Subject. This finishes the notifications to all
  subscriptions and overrides the take operator in this case.
  The Subject class provides the base for creating more specialized Subjects. In
  fact, RxJS comes with some interesting ones: AsyncSubject, ReplaySubject, and
  BehaviorSubject.
 */
const subject = new Rx.Subject();
const source = Rx.Observable.interval(300)
  .map(function(v) { return 'Interval message #' + v; })
  .take(5);

source.subscribe(subject);

const subscription = subject.subscribe(
  function onNext(x) { console.log('onNext: ' + x); },
  function onError(e) { console.log('onError: ' + e.message); },
  function onCompleted() { console.log('onCompleted'); }
);

subject.next('Our message #1');
subject.next('Our message #2');

setTimeout(function() {
  subject.complete();
}, 1000);


/*
  AsyncSubject
  AsyncSubject emits the last value of a sequence only if the sequence completes.
  This value is then cached forever, and any Observer that subscribes after the
  value has been emitted will receive it right away. AsyncSubject is convenient for
  asynchronous operations that return a single value, such as Ajax requests.
  Let’s see a simple example of an AsyncSubject subscribing to a range.
  In that example, delayedRange emits the values 0 to 4 after a delay of a second.
  Then we create a new AsyncSubject subject and subscribe it to delayedRange.
  As expected, we get only the last value that the Observer emits.
 */
const delayedRange = Rx.Observable.range(0, 5).delay(1000);
const asynSubject = new Rx.AsyncSubject();
delayedRange.subscribe(asynSubject);
asynSubject.subscribe(
  function onNext(item) { console.log('Value:', item); },
  function onError(err) { console.log('Error:', err); },
  function onCompleted() { console.log('Completed.'); }
);

/*
  BehaviorSubject
  When an Observer subscribes to a BehaviorSubject, it receives the last emitted
  value and then all the subsequent values. BehaviorSubject requires that we provide
  a starting value, so that all Observers will always receive a value when
  they subscribe to a BehaviorSubject.

 */
