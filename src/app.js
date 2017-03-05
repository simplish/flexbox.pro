require('../public/style/bootstrap/bootstrap-theme.css');
require('../public/style/bootstrap/bootstrap.css');
require('../public/style/style.css');
require('file-loader?name=[name].[ext]!../public/index.html');
//require('file-loader?name=css/[name].[ext]!../public/style/bootstrap/bootstrap-theme.css');
//require('file-loader?name=css/[name].[ext]!../public/style/bootstrap/bootstrap.css');
const Rx = require('rxjs/Rx');
import {
  run
} from '@cycle/rxjs-run';
import {
  makeDOMDriver,
  div,
  select,
  fieldset,
  legend,
  p,
  input,
  form, label
} from '@cycle/dom';

import {
  defaultState,
  minNumberOfFlexItems,
  maxNumberOfFlexItems,
  examples
} from './model';

import FlexItem from './FlexItem';
import Example from './Example';


const Operations = {
  change: value => state => {
    return Object.assign({},
      state, {
        changeTo: value
      }
    );
  },
  changeNumberOfFlexItems: value => state => {
    return Object.assign({},
      state, 
      {
        flexItems: FlexItem.generateFlexItems(value)
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

function view(state$) {
  return state$
    .startWith(defaultState)
    .map(state =>
      div('.window', {}, [
        div('.controls', [
          div('.left', {}, [
            form([
              fieldset([
                legend('legend'),
                div('.form-group', [
                  label({attrs: {for: 'selecter'}}, 'Exempel'),
                  select('#selecter.form-control', {}, Example.generateHyperScriptOptions(examples))
                ]),
                div('.form-group', [
                  label({attrs: {for: 'number-of-flex-items'}}, 'Antal flex items'),
                  input('#number-of-flex-items.form-control', {
                    attrs: {
                      type: 'range',
                      min: minNumberOfFlexItems,
                      max: maxNumberOfFlexItems
                    }
                  })
                ])
              ])
            ]),
            p(state.changeTo)
          ]),
          div('.right')
        ]),
        div('.view', state.flexItems.map(flexItem => flexItem.generateHyperScript()))
      ])
    );
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