import {
  option,
  h1,
  h2,
  div
} from '@cycle/dom';

export default class Example {
  constructor(title = '', flexItemsStyle, flexContainerStyle = {}) {
    this.title = title;
    this.flexItemsStyle = flexItemsStyle;
    this.flexContainerStyle = flexContainerStyle;
  }

  static generateHyperScriptOptions(exampleMap) {
    return Array.from(exampleMap.entries())
      .map(([v, example]) => {
        return option('.option', {
          attrs: {
            value: v
          }
        }, example.title);
      });
  }

  toHyperscript() {
    return [
      h1(this.title),
      h2('Flex items style'),
      div([JSON.stringify(this.flexItemsStyle, null, 2)]),
      h2('Flex container style'),
      div([JSON.stringify(this.flexContainerStyle, null, 2)])
    ];
  }
}