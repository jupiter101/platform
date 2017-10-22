const Rx = require('rxjs');


require('rxjs/operator/timeInterval');
require('rxjs/operator/merge');

/*
  Interval and merge Operators
 */
const getIntervalObserver = () => {
  console.log('############## Interval and merge Operators ##############');
  const srcIntervalA = Rx.Observable.interval(200).take(5).map(function(i) {
    return 'A' + i;
  });

  const srcIntervalB = Rx.Observable.interval(100).take(5).map(function(i) {
    return 'B' + i;
  });

  return  Rx.Observable.merge(srcIntervalA, srcIntervalB);

};

module.exports = getIntervalObserver;
