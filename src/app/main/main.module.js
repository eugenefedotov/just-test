'use strict';

import angular from 'angular';

import sharedModule from '../shared/shared.module.js';
import authModule from '../auth/auth.module';

import MainCtrl from './controllers/Main.controller.js';

export default angular
  .module('VisualizationOfModels.Main', [
    sharedModule,
    authModule
  ])
  .controller('MainCtrl', MainCtrl)
  .name;
