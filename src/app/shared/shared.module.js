'use strict';

import angular from 'angular';

import Shared from './services/Shared.service.js';

export default angular
  .module('VisualizationOfModels.Shared', [
  ])
  .service('$shared', Shared)
  .name;
