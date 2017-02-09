'use strict';

export default function modelsTable() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: require('../../../views/directives/modelsTable.html')
  };
};
