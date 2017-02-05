'use strict';

import angular from 'angular';

import AuthService from '../auth/services/Auth.service';
import MainCtrl from './controllers/Main.controller.js';

export default angular
  .module('VisualizationOfModels.Main', [
  ])
  .service('$auth', AuthService)
  .controller('MainCtrl', MainCtrl)
  .name;
