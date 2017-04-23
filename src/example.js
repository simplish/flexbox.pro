import {
  option, optgroup,
  h1, h2,
  div, i, a, p
} from '@cycle/dom';
import util from './util';

export default class Example {
  constructor(title = '', flexItemsStyle = {}, flexContainerStyle = {}, group) {
    this.title = title;
    this.flexItemsStyle = flexItemsStyle;
    this.flexContainerStyle = flexContainerStyle;
    this.group = group;
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
    const exampleGroups = Array.from(exampleMap.entries())
      .reduce((acc, [v, example]) => {
        const opt = option('.option', {
          attrs: {
            value: v,
            selected: state.selectedExample === v ? 'selected' : null
          }
        }, example.title);

        acc.set(example.group, (acc.get(example.group) || []).concat(opt));
        return acc;
      }, new Map());

    return Array.from(exampleGroups.entries())
      .map(([groupName, examples]) => {
        return optgroup('.group', { attrs: {
            label: groupName
          }
        }, examples);
      });
  }

  static numberOfExampleGroupsAndExamples(exampleMap) {
    return Array.from(exampleMap)
      .reduce((acc, example) => {
        acc.add(example.group);
        return acc;
      }, new Set()).size + exampleMap.size;
  }


  static getExampleSelectAttributes(showMultipleExamples = false, examples) {
    const attr = {};

    attr.multiple = showMultipleExamples;

    if (showMultipleExamples) {
      attr.size = Example.numberOfExampleGroupsAndExamples(examples);
    }
    
    return attr;
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
    const styleObjectEntries = Object.entries(styleObject);
    if (styleObjectEntries.length === 0) {
      return [ p(".text-muted", "No specific style.") ];
    } else {
      return styleObjectEntries.map(
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
  }

  toHyperscript() {
    return [
      h1('.example-style-heading', this.title),
      h2('Flex items style'),
      div('.key-value-container', this.renderStyleObject(this.flexItemsStyle)),
      h2('Flex container style'),
      div('.key-value-container', this.renderStyleObject(this.flexContainerStyle))
    ];
  }
}