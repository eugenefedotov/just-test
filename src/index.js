import angular from 'angular';

import appRun from './app/app.run.js';

angular
  .module('justTest', [])
  .run(appRun);
