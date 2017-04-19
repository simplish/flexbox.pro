import {
  option,
  h1,
  h2,
  div, i, a
} from '@cycle/dom';
import util from './util';

export default class Example {
  constructor(title = '', flexItemsStyle = {}, flexContainerStyle = {}) {
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

  getContainerStyleObj() {
    return Object.entries(this.flexContainerStyle).reduce(
      (styleObj, [property, value]) => {
        styleObj[property] = value[0];
        return styleObj;
      },
      {}
    );
  }

  getItemStyleObj(itemIndex = 0, totalNumberOfItems = 0) {
    return Object.entries(this.flexItemsStyle).reduce(
      (styleObj, [property, value]) => {
        styleObj[property] = this.replaceRandom(value[0], itemIndex, totalNumberOfItems);
        return styleObj;
      },
      {}
    );
  }

  replaceRandom(value, index, upperLimit) {
    return value.replace(/\{random\}/g, util.getRandomInInterval(0, upperLimit, upperLimit + index));
  }

  renderStyleObject(styleObject, label) {
    return Object.entries(styleObject).map(
        (declaration) => div('.key-value', [ 
          div('.key', Example.getStyleDeclarationProperty(declaration)), 
          div('.eq', [i('.icon-eq')]), 
          div('.value', [
            Example.getStyleDeclarationValue(declaration), 
            Example.getStyleDeclarationProperties(declaration).isDefault ? i('.icon-star-filled.default-value') : undefined,
            Example.getStyleDeclarationProperties(declaration).moreInfo ? a({ 
              attrs: {
                href: Example.getStyleDeclarationProperties(declaration).moreInfo,
                target: '_blank'
              } 
            }, [ i('.icon-info.more-info') ]) : undefined
          ])
        ])
      );
  }

  toHyperscript() {
    return [
      h1(this.title),
      h2('Flex items style'),
      div('.key-value-container', this.renderStyleObject(this.flexItemsStyle)),
      h2('Flex container style'),
      div('.key-value-container', this.renderStyleObject(this.flexContainerStyle))
    ];
  }
}