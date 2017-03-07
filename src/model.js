import Example from './example';
const examplesData = require('../examples.json');

console.log('type of json examples', typeof examplesData, examplesData);
const examples = new Map();

for (const [index, e] of examplesData.examples.entries()) {
  console.log("bases", examplesData.baseStyles.flexItemsStyle, examplesData.baseStyles.flexContainerStyle);
  examples.set(index, new Example(e.title, 
    Object.assign({}, examplesData.baseStyles.flexItemsStyle, e.flexItemsStyle), 
    Object.assign({}, examplesData.baseStyles.flexContainerStyle, e.flexContainerStyle)
  ));
}

const maxNumberOfFlexItems = 100;
const minNumberOfFlexItems = 1;

const defaultState = {
  controlSettings: {
    selectedExample: examples.get(0),
    numberOfFlexItems: 5
  },
  controlsDescription: ''
};

export {
  defaultState, 
  minNumberOfFlexItems,
  maxNumberOfFlexItems,
  examples
};