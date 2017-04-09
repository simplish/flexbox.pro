import {
  div
} from '@cycle/dom';

import util from './util';

export default class FlexItem {
  constructor(content = '', style = {}, size) {
    this.content = content;
    this.style = style; // An object like {'background-color': '#22f'
    this.size = size;
  }

  generateHyperScript() {
    return div('.flex-item', {
      style: Object.assign({}, 
        this.style, 
        {
          width: this.size.width + 'px',
          height: this.size.height + 'px',
          'font-size': this.size.height / 2 + 'px',
          lineHeight: this.size.height + 'px',
        })
    }, [this.content]);
  }

  static generateFlexItems(numberOfFlexItems, example, size) {
    const flexItems = [];
    for (let index of util.positiveNumbers(numberOfFlexItems)) {
      flexItems.push(new FlexItem(index, example.getItemStyleObj(), size));
    }
    return flexItems;
  }
}