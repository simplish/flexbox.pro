import {
  option,
  h1,
  h2,
  div, i
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
    console.log("entries", Object.entries(this.flexItemsStyle));
    return [
      h1(this.title),
      h2('Flex items style'),
      div('.key-value-container', Object.entries(this.flexItemsStyle).map(
        ([key, value]) => div('.key-value', [ div('.key', key), div('.eq', [i('.icon-eq')]), div('.value', value)])
      )),
      h2('Flex container style'),
      div('.key-value-container', Object.entries(this.flexContainerStyle).map(
        ([key, value]) => div('.key-value', [ div('.key', key), div('.eq', [i('.icon-eq')]), div('.value', value)])
      ))
    ];
  }
}