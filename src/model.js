import Example from './example';
const examplesData = require('../examples.json');

console.log('type of json examples', typeof examplesJ);
const examples = new Map();

for (const [index, e] of examplesData.entries()) {
  examples.set(index, new Example(e.title, e.flexItemsStyle, e.flexContainerStyle));
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