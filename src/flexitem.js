import {
  div
} from '@cycle/dom';

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
          'font-size': this.size.height / 2 + 'px',
          lineHeight: this.size.height + 'px',
        }
      )
    }, [this.content]);
  }

  static generateFlexItems(numberOfFlexItems, example, size) {
    return [...Array(numberOfFlexItems)].map((curr, index, arr) => 
      new FlexItem(index + 1, example.getItemStyleObj(index, arr.length), size)
    );
  }
}