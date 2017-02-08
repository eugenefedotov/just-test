'use strict';

export default class MainCtrl {

  constructor($auth, $just) {

    $auth.authorization();
    this.$just = $just;

    this.inputData = '';
    this.models = [];

    this.$just.mgoInterface
      .find()
      .then(res => {
        if (res) {
          this.data = res;
          this.prepareData();
        }
      });
  }

  prepareData() {
    this.data.forEach(item => {
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
      .then(function(res) {
        console.log(res);
      });


  }

};
