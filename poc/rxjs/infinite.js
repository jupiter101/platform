const Rx = require('rxjs');
require('rxjs/observable/range');

require('rxjs/operator/timeInterval');
require('rxjs/operator/map');
require('rxjs/operator/scan');

/*
Imagine we’re writing a program that gives users their average speed while they walk.
Even if the user hasn’t finished walking, we need to be able to make a calculation
using the speed values we know so far. We want to log the average of an infinite
sequence in real time. The problem is that if the sequence never ends, an aggregate
operator like reduce will never call its Observers’ onNext operator.
Luckily for us, the RxJS team has thought of this kind of scenario and provided us
with the scan operator, which acts like reduce but emits each intermediate result.

This way, we can aggregate sequences that take a long time to complete or that are
infinite. In the preceding example, we generated an incremental integer every second
and substituted the previous reduce call for scan. We now get the average of the values
generated so far, every second.
 */

// For convenient purpose I restrict the number of values to 5
const avgInfinite = Rx.Observable.interval(1000)//.take(5)
  .scan(function (prev, cur) {
    return {
      sum: prev.sum + cur,
      count: prev.count + 1
    };
  }, { sum: 0, count: 0 })
  .map(function(o) {
    return o.sum / o.count;
  });

module.exports = avgInfinite;
