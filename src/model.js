import Example from './example';
import FlexItemSize from './flexitemsize';
const examplesData = require('../examples.json');

if (!Array.isArray(examplesData.examples) || examplesData.examples.length < 1) {
  throw new RangeError('Examples must be an array of a least length 1.');
}

const examples = new Map();

for (const [index, e] of examplesData.examples.entries()) {
  examples.set(index, new Example(e.title, 
    Object.assign({}, examplesData.baseStyles.flexItemsStyle, e.flexItemsStyle), 
    Object.assign({}, examplesData.baseStyles.flexContainerStyle, e.flexContainerStyle)
  ));
}

const maxNumberOfFlexItems = 100;
const minNumberOfFlexItems = 1;

const flexItemSizes = new Map();
flexItemSizes.set(0, new FlexItemSize(100, 100));
flexItemSizes.set(1, new FlexItemSize(200, 200));

const defaultState = {
  version: VERSION,
  leftStates: [],
  rightStates: [],
  selectedExample: 0,
  numberOfFlexItems: 5,
  flexItemSize: 0
};

export {
  defaultState, 
  minNumberOfFlexItems,
  maxNumberOfFlexItems,
  examples,
  flexItemSizes
};