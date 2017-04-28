import {
  option
} from '@cycle/dom';

export default class FlexItemSize {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  static generateHyperScriptOptions(flexItemSizesMap, state, sizeProperty) {
    return Array.from(flexItemSizesMap.entries())
      .map(([v, size]) => {
        const isSelected = state[sizeProperty] === v;
        return option('.option', {
          attrs: {
            value: v,
            selected: isSelected
          },
          props: {
            selected: isSelected
          }
        }, size ? size.width : 'Auto');
      });
  }
}