'use strict';

export default class Util {
  static *positiveNumbers(max) {
    let i = 1;

    while (!max || i <= max) {
      yield i;
      i++;
    }
  }

  static assertNum(num, minSize) {
    if (typeof num !== 'number') {
      throw new TypeError('Assertion error; this is not a number: ' + num);
    } else if (typeof minSize === 'number' && num < minSize) {
      throw new TypeError('Assertion error; this number (' + num + ') schould be equal to or larger than ' + minSize);
    }
    return true;
  }
}
