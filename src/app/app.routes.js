'use strict';

export default function routesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '',
      views: {
        'layout': {
          template: require('../views/main.html'),
          controller: 'MainCtrl',
          controllerAs: 'Main'
        }
      }
    });
}
