import {
  option
} from '@cycle/dom';

export default class FlexItemSize {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  static generateHyperScriptOptions(flexItemSizesMap, state) {
    return Array.from(flexItemSizesMap.entries())
      .map(([v, size]) => {
        return option('.option', {
          attrs: {
            value: v,
            selected: state.flexItemSize === v ? 'selected' : null
          }
        }, size.width + 'X' + size.height);
      });
  }
}