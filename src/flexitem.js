import {
  div
} from '@cycle/dom';

import util from './util';

export default class FlexItem {
  constructor(content = '', style = {}) {
    this.content = content;
    this.style = style; // An object like {'background-color': '#22f'}
  }

  generateHyperScript() {
    return div('.flex-item.dimension-100', {
      style: this.style
    }, [this.content]);
  }

  static generateFlexItems(numberOfFlexItems, example) {
    const flexItems = [];
    for (let index of util.positiveNumbers(numberOfFlexItems)) {
      flexItems.push(new FlexItem(index, example.flexItemsStyle));
    }
    return flexItems;
  }
}