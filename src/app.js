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
  defaultState
} from './model';

import view from './view';


function getNewLeftState(state) {
  const newLeftStates = Array.from(state.leftStates);
  newLeftStates.push(resetStateQueues(state));
  return newLeftStates;
}

function resetStateQueues(state) {
  return Object.assign({}, state, {
    leftStates: null,
    rightStates: null
  });
}

const Operations = {
  change: value => state => {
    const selectedValue = parseInt(value);
    return Object.assign({},
      state, {
        selectedExample: selectedValue,
        lastSelectedExample: state.selectedExample,
        leftStates: getNewLeftState(state),
        rightStates: []
      }
    );
  },
  switchToPrevState: () => state => {
    const newLeftStates = Array.from(state.leftStates);
    const newRightState = Array.from(state.rightStates);
    const newState = newLeftStates.pop();
    newRightState.push(resetStateQueues(state));

    return Object.assign({},
      newState, { 
        leftStates: newLeftStates,
        rightStates: newRightState
      }
    );
  },
  switchToNextState: () => state => {
    const newLeftStates = Array.from(state.leftStates);
    const newRightStates = Array.from(state.rightStates);
    const newState = newRightStates.pop();
    newLeftStates.push(resetStateQueues(state));

    return Object.assign({},
      newState, { 
        leftStates: newLeftStates,
        rightStates: newRightStates
      }
    );
  },
  changeNumberOfFlexItems: value => state => {
    return Object.assign({}, state, 
      { 
        numberOfFlexItems: parseInt(value),
        leftStates: getNewLeftState(state),
        rightStates: []
      }
    );
  },
  changeDirection: value => state => {
    return Object.assign({}, state, 
      { 
        direction: value,
        leftStates: getNewLeftState(state),
        rightStates: []
      }
    );
  },
  changeWidthOfFlexItems: value => state => {
    return Object.assign({}, state, 
      { 
        flexItemWidth: parseInt(value),
        leftStates: getNewLeftState(state),
        rightStates: []
      }
    );
  },
  changeHeightOfFlexItems: value => state => {
    return Object.assign({}, state, 
      { 
        flexItemHeight: parseInt(value),
        leftStates: getNewLeftState(state),
        rightStates: []
      }
    );
  },
  showMultipleExamples: value => state => {
    return Object.assign({}, state, 
      { 
        showMultipleExamples: !state.showMultipleExamples,
        leftStates: getNewLeftState(state),
        rightStates: []
      }
    );
  },
  startStateOperation: value => state => {
    if (state !== undefined) {
      throw new Error('This action should be called as a initilizer when the start value is undefined.');
    }
    return value;
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
    directionChanged: DOM.select('.direction-radio').events('change')
    .map(evt => {
      return evt.target.value;
    }),
    prevStateClicked: DOM.select('#prev-btn').events('click'),
    nextStateClicked: DOM.select('#next-btn').events('click'),
    multipleExamplesClicked: DOM.select('#show-all-examples-btn').events('click'),
    flexItemWidthChanged: DOM.select('#flex-item-width-select').events('change')
      .map(evt => {
        return evt.target.value;
      }),
    flexItemHeightChanged: DOM.select('#flex-item-height-select').events('change')
      .map(evt => {
        return evt.target.value;
      })
  };
}

function model(intents, startState$) {
  const changeOperations$ = intents.changed
    .map(value => {
      return Operations.change(value);
    });

  const changeNumberOfFlexItemsOperations$ = intents.numberOfFlexItemsChanged
    .map(value => {
      return Operations.changeNumberOfFlexItems(value);
    });

  const changeWidthOfFlexItemsOperations$ = intents.flexItemWidthChanged
    .map(value => {
      return Operations.changeWidthOfFlexItems(value);
    });

  const changeHeightOfFlexItemsOperations$ = intents.flexItemHeightChanged
    .map(value => {
      return Operations.changeHeightOfFlexItems(value);
    });
  
  const changeDirectionOperations$ = intents.directionChanged
    .map(value => {
      return Operations.changeDirection(value);
    });

  const switchToPrevStateOperations$ = intents.prevStateClicked
    .map(() => {
      return Operations.switchToPrevState();
    });

  const switchToNextStateOperations$ = intents.nextStateClicked
    .map(() => {
      return Operations.switchToNextState();
    });

  const showMultipleExamplesOperations$ = intents.multipleExamplesClicked
    .map(() => {
      return Operations.showMultipleExamples();
    });

  const startStateOperation$ = startState$
    .map(state => Operations.startStateOperation(state));

  return Rx.Observable
    .from(startStateOperation$)
    .merge(changeOperations$, 
      changeNumberOfFlexItemsOperations$, 
      switchToPrevStateOperations$, 
      switchToNextStateOperations$, 
      changeWidthOfFlexItemsOperations$,
      changeHeightOfFlexItemsOperations$,
      showMultipleExamplesOperations$,
      changeDirectionOperations$
    )
    .scan((state, operation) => operation(state), undefined);
}

function main({DOM, storage}) {
  const state$ = storage.local
    .getItem('state')
    .map(storedValue => JSON.parse(storedValue))
    .map(state => (state === null || state.version != VERSION) ? defaultState : state);

  return {
    DOM: view(state$),
    storage: model(intent(DOM), state$.first())
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