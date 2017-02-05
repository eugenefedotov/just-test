'use strict';

export default function modelsTable() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      twodaysfromnow: '@'
    },
    template: require('../../../views/directives/modelsTable.html')
  };
};
