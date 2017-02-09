'use strict';

export default class MainCtrl {

  /**
   *
   * @param $auth Auth Service
   * @param $just $just service
   * @param $scope
   * @param $sharedService Shared Service
   * @param $alertService Alert Service using ngToast
   */
  constructor($auth, $just, $scope, $sharedService, $alertService) {

    $auth.authorization();

    this.$just = $just;
    this.$scope = $scope;
    this.$sharedService = $sharedService;
    this.$alertService = $alertService;
    this.oldEvalVal = 1;

    this.inputData = '';
    this.models = [];

    this.$just.mgoInterface
      .find()
      .then(res => {
        if (!res) {
          return;
        }
        this.prepareData(res);
        this.$scope.$digest();
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

    /* need to add json schema validator */
    this.$just.mgoInterface
      .insert(JSON.parse(this.inputData))
      .then(res => {
        this.$alertService.success('New model created');
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

    let model_id  = model.id;
    let oldEvaluation = {
      date: model.evaluation.date,
      value: this.oldEvalVal
    };

    delete(model.id);
    delete(model.shortName);

    model.evaluation.date = this.$sharedService.getFormatDate();
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
