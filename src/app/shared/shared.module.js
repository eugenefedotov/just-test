'use strict';

import angular from 'angular';

import SharedService from './services/Shared.service.js';
import AlertService from './services/Alert.service.js';

export default angular
  .module('VisualizationOfModels.Shared', [
  ])
  .service('$sharedService', SharedService)
  .service('$alertService', AlertService)
  .name;
