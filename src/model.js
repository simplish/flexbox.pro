import FlexItem from './Flexitem';
import Example from './Example';

const defaultState = {
  changedTo: '',
  numberOfFlexItems: 5,
  flexItems: FlexItem.generateFlexItems(3) //todo generate this when doing the view.
};

const examples = new Map();

examples.set(100, new Example('Test 1'));
examples.set(200, new Example('Test 2'));

const maxNumberOfFlexItems = 100;
const minNumberOfFlexItems = 1;

export {
  defaultState, 
  minNumberOfFlexItems,
  maxNumberOfFlexItems,
  examples
};