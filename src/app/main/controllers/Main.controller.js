'use strict';

export default class MainCtrl {

  /**
   *
   * @param $auth Auth Service
   * @param $just $just service
   * @param $scope
   * @param $sharedService Shared Service
   * @param $alertService Alert Service using ngToast
   * @param $state state provider
   */
  constructor($auth, $just, $scope, $sharedService, $alertService, $state) {

    $auth.authorization();

    this.$just = $just;
    this.$scope = $scope;
    this.$sharedService = $sharedService;
    this.$alertService = $alertService;
    this.$state = $state;

    this.oldEvalVal = 1;
    this.inputData = '';
    this.models = [];

    this.$just.mgoInterface
      .find()
      .then(res => {
        if (!res) {
          return;
        }
        /*console.log(res);
        return;*/
        this.prepareData(res);
        this.$scope.$digest();
        console.log(this.models);
      });
  }

  /**
   * Prepare data for rendering
   * @param {Object} data
   */
  prepareData(data) {
    data.forEach(item => {
      let parents = {};

      item.models.forEach(innerItem => {
        parents[innerItem.name] = innerItem;
        parents[innerItem.name].id = item._id;
        parents[innerItem.name].models = [];
      });

      for (let key in parents) {
        let innerItem = parents[key];
        let names = key.split('.');
        let name = names.pop();
        let path = names.join('.');
        if (path) {
          innerItem.shortName = name;
          innerItem.id = item._id;
          parents[path].models.push(innerItem)
        }
      }

      let result = [];
      for (let i in parents) {
        if (i.indexOf('.') === -1) {
          result.push(parents[i]);
        }
      }

      this.models.push({
        id : item._id,
        name : item.name,
        dscr : item.dscr,
        source : item.source,
        models : result
      });
    });
  }

  /**
   * Create and record new model
   */
  createModel() {

    let tmp = this.inputData.split('\n');
    let data = {
      name: '',
      source: '',
      models: [],
      dscr: ''
    };

    if(tmp.length) {

      data.source = this.inputData;

      let evalObj = {
        date: this.$sharedService.getFormatDate(),
        value: 1,
        evaluations: []
      };

      let oneChildName = '';
      let doubleChildName = '';

      tmp.forEach(item => {

        item = item.trim();
        let firstSybols = item.substr(0, 3);

        switch (firstSybols.split('-').length - 1) {
          case 0:
            data.name = item;
            break;
          case 1:
            oneChildName = item.substr(1).trim();
            data.models.push({
              name       : oneChildName,
              evaluation : evalObj
            });
            break;
          case 2:
            doubleChildName = oneChildName + '.' + item.substr(2).trim();
            data.models.push({
              name       : doubleChildName,
              evaluation : evalObj
            });
            break;
          case 3:
            data.models.push({
              name       : doubleChildName + '.' + item.substr(3).trim(),
              evaluation : evalObj
            });
            break;
        }
      });
    }

    /* need to add json schema validator */
    this.$just.mgoInterface
      .insert(data)
      .then(res => {
        this.$alertService.success('New model created');
        this.$state.reload();
        this.$scope.$apply();
      });

  }

  /**
   * Update description for model
   * @param {Object} model
   */
  updateDscr(model) {
    this.$just.mgoInterface
      .update(
        {"_id": model.id},
        {$set: {"dscr": model.dscr} }
      )
      .then(res => {
        this.$alertService.success('Description updated');
        this.$scope.$apply();
      })
  }

  /**
   * Save old evaluation value for evaluations history
   * @param {String} val
   */
  saveEvalValue(val) {
    this.oldEvalVal = val;
  }

  /**
   * Update evaluation
   * @param {Object} model
   */
  updateEvaluation(model) {

    if(this.oldEvalVal === model.evaluation.value) {
      return;
    }

    let currentDate = this.$sharedService.getFormatDate();
    let model_id  = model.id;

    model.evaluation.evaluations = _.reject(model.evaluation.evaluations, ['date', currentDate]);

    let oldEvaluation = {
      date  : model.evaluation.date,
      value : this.oldEvalVal
    };

    delete(model.id);
    delete(model.shortName);

    model.evaluation.date = currentDate;
    model.evaluation.evaluations.push(oldEvaluation);

    if(model.evaluation.value > 10) {
      model.evaluation.value = 10;
    }
    if(model.evaluation.value < 1) {
      model.evaluation.value = 1;
    }

    this.$just.mgoInterface
      .update(
        {"_id": model_id, "models.name": model.name},
        {$set: {"models.$": model}}
      )
      .then(res => {
        this.$alertService.success('Evaluation updated');
        this.$scope.$apply();
      });
  }

};
