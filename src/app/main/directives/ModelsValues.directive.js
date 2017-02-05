'use strict';

export default function modelsValues() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      bla: '@'
    },
    template: require('../../../views/directives/modelsValues.html')
  };
};
