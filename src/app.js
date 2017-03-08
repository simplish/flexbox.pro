//require('../public/style/bootstrap/bootstrap-theme.css');
require('../public/style/bootstrap/bootstrap.css');
require('../public/style/style.css');
require('../public/fontello/css/fontello.css');
require('file-loader?name=[name].[ext]!../public/index.html');

import storageDriver from '@cycle/storage';

const Rx = require('rxjs/Rx');
import {
  run
} from '@cycle/rxjs-run';
import {
  makeDOMDriver
} from '@cycle/dom';

import {
  defaultState,
  examples
} from './model';

import view from './view';


const Operations = {
  change: value => state => {
    console.log(value, typeof value, examples, examples.get(value));
    const selectedValue = parseInt(value);
    return Object.assign({},
      state, { 
        selectedExample: selectedValue,
        lastSelectedExample: state.selectedExample
      }
    );
  },
  switchToLastExample: () => state => {
    return Object.assign({},
      state, { 
        selectedExample: state.lastSelectedExample,
        lastSelectedExample: state.selectedExample
      }
    );
  },
  changeNumberOfFlexItems: value => state => {
    return Object.assign({}, state, 
      { numberOfFlexItems: parseInt(value) }
    );
  }
};

function intent(DOM) {
  return {
    changed: DOM.select('#selecter').events('change')
      .map(evt => {
        return evt.target.value;
      }),
    numberOfFlexItemsChanged: DOM.select('#number-of-flex-items').events('change')
      .map(evt => {
        return evt.target.value;
      }),
    lastExampleSwitchClicked: DOM.select('#last-example-switch').events('click')
  };
}

function model(intents) {
  const changeOperations$ = intents.changed
    .map(value => {
      return Operations.change(value);
    });

  const changeNumberOfFlexItemsOperations$ = intents.numberOfFlexItemsChanged
    .map(value => {
      return Operations.changeNumberOfFlexItems(value);
    });

  const switchToLastExampleOperations$ = intents.lastExampleSwitchClicked
    .map(value => {
        return Operations.switchToLastExample();
      });

  return Rx.Observable.merge(changeOperations$, changeNumberOfFlexItemsOperations$, switchToLastExampleOperations$)
    .scan((state, operation) => operation(state), defaultState);
}

function main({DOM, storage}) {
  const state$ = storage.local
    .getItem('state')
    .map(storedValue => JSON.parse(storedValue))
    .map(state => state === null || state.version != VERSION ? defaultState : state);

  return {
    DOM: view(state$),
    storage: model(intent(DOM))
      .map(state => ({
        key: 'state',
        value: JSON.stringify(state)
      }))
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  storage: storageDriver
};

run(main, drivers);