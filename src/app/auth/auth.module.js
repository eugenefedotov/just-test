'use strict';

import angular from 'angular';

import AuthService from './services/Auth.service.js';

export default angular
  .module('VisualizationOfModels.Auth', [])
  .service('$auth', AuthService)
  .name;
