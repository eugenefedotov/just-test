'use strict';

import angular from 'angular';

import routing from './homepage.routes.js';
import HomepageCtrl from './homepage.controller.js';

export default angular
  .module('VisualizationOfModels.Homepage', [
  ])
  .config(routing)
  .controller('HomepageCtrl', HomepageCtrl)
  .name;
