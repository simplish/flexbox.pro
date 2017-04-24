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
        const isSelected = state.flexItemSize === v;
        return option('.option', {
          attrs: {
            value: v,
            selected: isSelected
          },
          props: {
            selected: isSelected
          }
        }, size.width + 'X' + size.height);
      });
  }
}