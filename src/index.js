import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularSanitize from 'angular-sanitize';
import 'ng-toast';

import homepageModule from './app/homepage/homepage.module.js';

import appRouting from './app/app.routes.js';
import appRun from './app/app.run.js';

angular
  .module('VisualizationOfModels', [
    'just',
    uiRouter,
    angularSanitize,
    'ngToast',

    homepageModule

  ])
  .config(appRouting)
  .run(appRun);
