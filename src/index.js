import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularSanitize from 'angular-sanitize';
import 'ng-toast';

import 'bootstrap/dist/css/bootstrap.css';

import authModule from './app/auth/auth.module.js';
import mainModule from './app/main/main.module.js';
import sharedModule from './app/shared/shared.module.js';

import appRouting from './app/app.routes.js';
import appRun from './app/app.run.js';

angular
  .module('VisualizationOfModels', [
    'just',
    uiRouter,
    angularSanitize,
    'ngToast',

    sharedModule,
    authModule,
    mainModule

  ])
  .config(appRouting)
  .run(appRun);
