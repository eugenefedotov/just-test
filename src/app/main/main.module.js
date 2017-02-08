'use strict';

import angular from 'angular';

import sharedService from '../shared/shared.module.js';
import authModule from '../auth/auth.module.js';

import MainCtrl from './controllers/Main.controller.js';

export default angular
  .module('VisualizationOfModels.Main', [
    sharedService,
    authModule
  ])
  .controller('MainCtrl', MainCtrl)
  .name;
