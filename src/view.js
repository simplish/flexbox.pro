import {
  div,
  select,
  fieldset,
  legend,
  input,
  form, label, i
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
                      value: state.controlSettings.numberOfFlexItems,
                      type: 'range',
                      min: minNumberOfFlexItems,
                      max: maxNumberOfFlexItems
                    }
                  })
                ])
              ])
            ])
          ]),
          div('.right', state.controlSettings.selectedExample.toHyperscript())
        ]),
        div('.view', { style: state.controlSettings.selectedExample.flexContainerStyle }, FlexItem.generateFlexItems(
          state.controlSettings.numberOfFlexItems,
          state.controlSettings.selectedExample
        ).map(flexItem => flexItem.generateHyperScript()))
      ])
    );
}