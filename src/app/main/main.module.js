'use strict';

import angular from 'angular';

import SharedService from '../shared/services/Shared.service.js';
import AuthService from '../auth/services/Auth.service.js';
import MainCtrl from './controllers/Main.controller.js';

export default angular
  .module('VisualizationOfModels.Main', [
  ])
  .service('$shared', SharedService)
  .service('$auth', AuthService)
  .controller('MainCtrl', MainCtrl)
  .name;
