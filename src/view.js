import {
  div,
  select,
  fieldset,
  legend,
  input,
  form, label
} from '@cycle/dom';

import {
  defaultState,
  minNumberOfFlexItems,
  maxNumberOfFlexItems,
  examples
} from './model';

import Example from './example';
import FlexItem from './flexitem';


export default function view(state$) {
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
                      value: state.numberOfFlexItems,
                      type: 'range',
                      min: minNumberOfFlexItems,
                      max: maxNumberOfFlexItems
                    }
                  })
                ])
              ])
            ])
          ]),
          div('.right', state.selectedExample.toHyperscript())
        ]),
        div('.view', { style: state.selectedExample.flexContainerStyle }, FlexItem.generateFlexItems(
          state.numberOfFlexItems,
          state.selectedExample
        ).map(flexItem => flexItem.generateHyperScript()))
      ])
    );
}