import Example from './example';
import FlexItemSize from './flexitemsize';
const examplesData = require('../examples.json');
import util from './util';

if (!Array.isArray(examplesData.examples) || examplesData.examples.length < 1) {
  throw new RangeError('Examples must be an array of a least length 1.');
}

const examples = new Map();

let exampleIndex = 0;
for (const [a, groupOfExamples] of examplesData.examples.entries()) {
  
  for (const [b, e] of groupOfExamples.examplesInGroup.entries()) {
    examples.set(exampleIndex, new Example(e.title,
      Object.assign({}, examplesData.baseStyles.flexItemsStyle, e.flexItemsStyle), 
      Object.assign({}, examplesData.baseStyles.flexContainerStyle, e.flexContainerStyle),
      util.toUpperCaseFirst(groupOfExamples.group),
      exampleIndex,
      e.flexItemsStyleIdentical, 
      e.flexContainerStyleIdentical
    ));
    exampleIndex = exampleIndex + 1;
  }
}

const directionExamples = new Map();

for (const directionExample of examplesData.baseStyles.directionExamples.values()) {
  directionExamples.set(directionExample.title, directionExample);
}


const maxNumberOfFlexItems = 60;
const minNumberOfFlexItems = 1;

const flexItemSizes = new Map();
flexItemSizes.set(0, undefined);
flexItemSizes.set(1, new FlexItemSize(50, 50));
flexItemSizes.set(2, new FlexItemSize(100, 100));
flexItemSizes.set(3, new FlexItemSize(200, 200));
flexItemSizes.set(4, new FlexItemSize(250, 250));

const defaultState = {
  version: VERSION,
  leftStates: [],
  rightStates: [],
  selectedExample: 0,
  showMultipleExamples: false,
  numberOfFlexItems: 3,
  flexItemWidth: 0,
  flexItemHeight: 0,
  direction: 'row',
};

export {
  defaultState, 
  minNumberOfFlexItems,
  maxNumberOfFlexItems,
  examples,
  flexItemSizes,
  directionExamples
};