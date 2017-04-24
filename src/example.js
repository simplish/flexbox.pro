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

  static setStyleDeclarationValue(declaration, value) {
    const n = declaration[1].slice();
    n[0] = value;
    declaration[1] = n;

    return declaration;
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
        const isSelected = state.selectedExample === v;
        const opt = option('.option', {
          attrs: {
            value: v,
            selected: isSelected
          },
          props: {
            selected: isSelected
          }
        }, example.title);

        acc.set(example.group, (acc.get(example.group) || []).concat(opt));
        return acc;
      }, new Map());

    return Array.from(exampleGroups.entries())
      .map(([groupName, examples]) => {
        return optgroup('.group', { attrs: {
          label: groupName
        }}, examples);
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


  getContainerStyleObj(directionStyle) {
    const startObj = {};
    
    for (const [directionProperty, value] of Object.entries(directionStyle.flexContainerStyle)) {
      startObj[directionProperty] = value[0];
    }

    return Object.entries(this.flexContainerStyle).reduce(
      (styleObj, [property, value]) => {
        let propertyValue = value[0];

        const existingStyle = styleObj[property];
        if (existingStyle) {
          propertyValue = existingStyle + propertyValue;
        }

        styleObj[property] = propertyValue;
        return styleObj;
      },
      startObj
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

  prefixDeclarations(declarationList, prefixDeclaration) {
    return declarationList.map(declaration => {
      if (Example.getStyleDeclarationProperty(declaration) === Example.getStyleDeclarationProperty(prefixDeclaration)) {
        return Example.setStyleDeclarationValue(declaration, Example.getStyleDeclarationValue(prefixDeclaration) + Example.getStyleDeclarationValue(declaration));
      } else {
        return declaration;
      }
    });
  }

  renderStyleObject(styleObject, prefixStyle = {}) {
    const styleObjectEntries = Object.entries(styleObject);

    for (const declaration of Object.entries(prefixStyle)) {
      if (styleObject[Example.getStyleDeclarationProperty(declaration)]) {
        // prefix everything.
        this.prefixDeclarations(styleObjectEntries, declaration);
      } else {
        styleObjectEntries.unshift(declaration);
      }
    }


    if (styleObjectEntries.length === 0) {
      return [ p('.text-muted', 'No specific style.') ];
    } else {
      const sortedStyleObjectEntries = styleObjectEntries.sort(
        (left, right) => {
          if (Example.getStyleDeclarationProperty(left) < Example.getStyleDeclarationProperty(right)) {
            return -1;
          } else if (Example.getStyleDeclarationProperty(left) > Example.getStyleDeclarationProperty(right)) {
            return 1;
          }
          return 0;
        });

      return sortedStyleObjectEntries.map(
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

  toHyperscript(directionStyle) {
    return [
      h1('.example-style-heading', this.title),
      h2('Flex items style'),
      div('.key-value-container', this.renderStyleObject(this.flexItemsStyle)),
      h2('Flex container style'),
      div('.key-value-container', this.renderStyleObject(this.flexContainerStyle, directionStyle.flexContainerStyle))
    ];
  }
}