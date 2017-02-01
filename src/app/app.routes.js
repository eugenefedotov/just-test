'use strict';

export default function routesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('');

  $stateProvider

    .state('app', {
      url: '',
      views: {
        'layout': {
          template: require('../views/homepage/homepage.html'),
          controller: function () {
            console.log(11);
          }
        }
      }
    });
}
