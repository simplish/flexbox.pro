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

  static getStyleDeclarationValue(declaration) {
    return declaration[1][0];
  }

  static getStyleDeclarationProperty(declaration) {
    return declaration[0];
  }

  static getStyleDeclarationProperties(declaration) {
    return declaration[1][1] || {};
  }

  static generateHyperScriptOptions(exampleMap, state) {
    return Array.from(exampleMap.entries())
      .map(([v, example]) => {
        return option('.option', {
          attrs: {
            value: v,
            selected: state.selectedExample === v ? 'selected' : null
          }
        }, example.title);
      });
  }

  toHyperscript() {
    return [
      h1(this.title),
      h2('Flex items style'),
      div('.key-value-container', Object.entries(this.flexItemsStyle).map(
        (declaration) => div('.key-value', [ 
          div('.key', Example.getStyleDeclarationProperty(declaration)), 
          div('.eq', [i('.icon-eq')]), 
          div('.value', [
            Example.getStyleDeclarationValue(declaration), 
            Example.getStyleDeclarationProperties(declaration).isDefault ? i('.icon-star-filled.default-value') : undefined
          ])
        ])
      )),
      h2('Flex container style'),
      div('.key-value-container', Object.entries(this.flexContainerStyle).map(
        (declaration) => div('.key-value', [ 
          div('.key', Example.getStyleDeclarationProperty(declaration)), 
          div('.eq', [i('.icon-eq')]), 
          div('.value', [
            Example.getStyleDeclarationValue(declaration), 
            Example.getStyleDeclarationProperties(declaration).isDefault ? i('.icon-star-filled.default-value') : undefined
          ])
        ])
      ))
    ];
  }
}