import FlexItem from './flexitem';
import Example from './example';

const defaultState = {
  selectedExample: null,
  numberOfFlexItems: 5,
  controlsDescription: '',
  flexItems: FlexItem.generateFlexItems(3) //todo generate this when doing the view.
};

const examples = new Map();

examples.set(100, new Example('Test 1')); // Integer index only.
examples.set(200, new Example('Test 2'));

const maxNumberOfFlexItems = 100;
const minNumberOfFlexItems = 1;

defaultState.selectedExample = examples.get(100);

export {
  defaultState, 
  minNumberOfFlexItems,
  maxNumberOfFlexItems,
  examples
};