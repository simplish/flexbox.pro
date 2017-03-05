import {
  div
} from '@cycle/dom';

import util from './util';

export default class FlexItem {
  constructor(content = '') {
    this.content = content;
  }

  generateHyperScript() {
    return div('.flex-item.dimension-100', {}, [this.content]);
  }

  static generateFlexItems(numberOfFlexItems) {
    const flexItems = [];
    for (let index of util.positiveNumbers(numberOfFlexItems)) {
      flexItems.push(new FlexItem(index));
    }
    return flexItems;
  }
}