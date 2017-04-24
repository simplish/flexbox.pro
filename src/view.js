import {
  div,
  select,
  fieldset,
  legend,
  input,
  form, label, button
} from '@cycle/dom';

import {
  minNumberOfFlexItems,
  maxNumberOfFlexItems,
  examples,
  flexItemSizes,
  directionExamples
} from './model';

import FlexItemSize from './flexitemsize';

import Example from './example';
import FlexItem from './flexitem';
import util from './util';


export default function view(state$) {
  return state$
    .map(state =>
      div('.window', {}, [
        div('.controls', [
          div('.left', {}, [
            form([
              fieldset([
                legend('.heading-legend', 'Flex demo configuration'),
                div('.mult', [
                  button('#prev-btn.btn.btn-default.icon-left', {attrs: {type: 'button', accesskey: 'o', title: 'Previous state [o]', disabled: state.leftStates.length <= 0 ? 'disabled' : null}}),
                  button('#next-btn.btn.btn-default.icon-right', {attrs: {type: 'button', accesskey: 'p', title: 'Next state [p]', disabled: state.rightStates.length <= 0 ? 'disabled' : null}})
                ]),
                div('.form-group',
                  Array.from(directionExamples.keys()).map(direction => {
                    return label('.radio-inline', {}, [ input('.direction-radio', {attrs: {type: 'radio', value: direction, name: 'direction-radio', checked: state.direction === direction}, props: {checked: state.direction === direction}}), util.toUpperCaseFirst(direction) ]);
                  })
                ),
                div('.form-group', [
                  label({attrs: {for: 'selecter'}}, 'Example'),
                  div('.mult', [
                    select('#selecter.form-control', {attrs: Example.getExampleSelectAttributes(state.showMultipleExamples, examples)}, Example.generateHyperScriptOptions(examples, state)),
                    button('#show-all-examples-btn.btn.btn-default.icon-th-list', {attrs: {type: 'button', accesskey: 'a', title: 'Show multiple examples'}})
                  ])
                ]),
                div('.form-group', [
                  label({attrs: {for: 'number-of-flex-items'}}, 'Number of flex items'),
                  input('#number-of-flex-items.form-control', {
                    attrs: {
                      value: state.numberOfFlexItems,
                      type: 'range',
                      min: minNumberOfFlexItems,
                      max: maxNumberOfFlexItems
                    },
                    props: {
                      value: state.numberOfFlexItems
                    }
                  })
                ]),
                div('.form-group', [
                  label({attrs: {for: 'flex-item-size-select'}}, 'Flex item size'),
                  select('#flex-item-size-select.form-control', FlexItemSize.generateHyperScriptOptions(flexItemSizes, state))
                ])
              ])
            ])
          ]),
          div('.right', examples.get(state.selectedExample).toHyperscript(directionExamples.get(state.direction)))
        ]),
        div('.view', { style: examples.get(state.selectedExample).getContainerStyleObj(directionExamples.get(state.direction)) }, FlexItem.generateFlexItems(
          state.numberOfFlexItems,
          examples.get(state.selectedExample),
          flexItemSizes.get(state.flexItemSize)
        ).map(flexItem => flexItem.generateHyperScript()))
      ])
    );
}