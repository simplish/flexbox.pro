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

  static getRandomInInterval(min, max, seed = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Util.random(seed) * (max - min)) + min;
  }

  static random(n) {
    const x = Math.sin(n) * 10000;
    return x - Math.floor(x);
  }

  static toUpperCaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static addToggleMarkListener(elm) {
    elm.addEventListener('click', function (event) {
        if (event.target.classList.contains('markable')) {
          event.target.classList.toggle("active");
        }
      });
  }
}