import {
  option
} from '@cycle/dom';

export default class Example {
  constructor(title = '') {
    this.title = title;
  }

  static generateHyperScriptOptions(exampleMap) {
    return Array.from(exampleMap.entries())
      .map(([v, example]) => {
        return option('.option', {
          attrs: {
            value: v
          }
        }, example.title);
      });
  }
}