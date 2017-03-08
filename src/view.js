import {
  div,
  select,
  fieldset,
  legend,
  input,
  form, label, button
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
    .do(state => console.log('view state is', state))
    .map(state =>
      div('.window', {}, [
        div('.controls', [
          div('.left', {}, [
            form([
              fieldset([
                legend('legend'),
                div('.form-group', [
                  label({attrs: {for: 'selecter'}}, 'Exempel'),
                  div('.mult', [
                    select('#selecter.form-control', {}, Example.generateHyperScriptOptions(examples, state)),
                    button('#last-example-switch.btn.btn-default', {attrs: {type: 'button', disabled: state.lastSelectedExample === null ? "disabled" : null}}, 'Last')
                  ])
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
          div('.right', examples.get(state.selectedExample).toHyperscript())
        ]),
        div('.view', { style: examples.get(state.selectedExample).flexContainerStyle }, FlexItem.generateFlexItems(
          state.numberOfFlexItems,
          examples.get(state.selectedExample)
        ).map(flexItem => flexItem.generateHyperScript()))
      ])
    );
}