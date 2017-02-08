'use strict';

export default class MainCtrl {

  constructor($auth, $just, $scope) {

    $auth.authorization();
    this.$just = $just;
    this.$scope = $scope;

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
        console.log(this.models);
      });
  }

  prepareData(data) {
    data.forEach(item => {
      let parents = {};

      item.models.forEach(innerItem => {
        parents[innerItem.name] = innerItem;
        parents[innerItem.name].models = [];
      });

      for (let key in parents) {
        let innerItem = parents[key];
        let names = key.split('.');
        let name = names.pop();
        let path = names.join('.');
        if (path) {
          innerItem.name = name;
          parents[path].models.push(innerItem);
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

  createModel() {
    /* need to add json schema validator */
    this.$just.mgoInterface
      .insert(JSON.parse(this.inputData))
      .then(res => {
        this.$scope.$digest()
      });
  }


  updateDscr(model_id, model_dscr) {
    this.$just.mgoInterface
      .update(
        {"_id": model_id},
        {$set: {"dscr": model_dscr} }
      )
      .then(res => {
        console.log(res);
      })
  }

  updateEvaluation(model_id, value) {
    console.log(model_id, value);
  }

};
