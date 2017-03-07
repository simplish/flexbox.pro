require('../public/style/bootstrap/bootstrap-theme.css');
require('../public/style/bootstrap/bootstrap.css');
require('../public/style/style.css');
require('../public/fontello/css/fontello.css');
require('file-loader?name=[name].[ext]!../public/index.html');

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
        controlSettings: Object.assign({}, state.controlSettings,
            { selectedExample: examples.get(selectedValue) }
        )
      }
    );
  },
  changeNumberOfFlexItems: value => state => {
    return Object.assign({},
      state, 
      {
        controlSettings: Object.assign({}, state.controlSettings,
          { numberOfFlexItems: parseInt(value) }
        )
      }
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
      })
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

  return Rx.Observable.merge(changeOperations$, changeNumberOfFlexItemsOperations$)
    .scan((state, operation) => operation(state), defaultState);
}

function main({
  DOM
}) {
  return {
    DOM: view(model(intent(DOM)))
  };
}

const drivers = {
  DOM: makeDOMDriver('#app')
};

run(main, drivers);