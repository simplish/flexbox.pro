import {
  div
} from '@cycle/dom';
import util from './util';

export default class FlexItem {
  constructor(content = '', style = {}, width, height) {
    this.content = content;
    this.style = style; // An object like {'background-color': '#22f'
    this.padding = "0px";

    if (width) {
      this.width = width.width + 'px';
    } else {
      this.width = 'auto';
    }

    if (height) {
      this.height = height.height + 'px';
      this.lineHeight = height.height;
    } else {
      this.height = 'auto';
      this.lineHeight = 80;

    if (!width && !height) {
      this.padding = "30px";
    }
    }
  }

  generateHyperScript() {
    return div('.flex-item.markable', {
      style: Object.assign({}, 
        this.style, 
        {
          'font-size': this.lineHeight / 2 + 'px',
          lineHeight: this.lineHeight + 'px',
          height: this.height,
          width: this.width,
          paddingLeft: this.padding,
          paddingRight: this.padding,
        }
      ),
      hook: {
        insert: vnode => util.addToggleMarkListener(vnode.elm)
      }
    }, [this.content]);
  }

  static generateFlexItems(numberOfFlexItems, example, width, height) {
    return [...Array(numberOfFlexItems)].map((curr, index, arr) => 
      new FlexItem(index + 1, example.getItemStyleObj(index, arr.length), width, height)
    );
  }
}