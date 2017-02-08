'use strict';

export default class MainCtrl {

  constructor($auth, $just) {

    $auth.authorization();
    this.$just = $just;

    this.inputData = '';
    this.models = [];

    this.data  = [
      {
        "_id":"123ab",
        "name":"model1",
        "dscr":"bla",
        "source":"123",
        "models": [
          {
            "name": "alpha",
            "evaluation": {
              "value": 7,
              "evaluations" : [
                {"evaluation":4, "date": "2016-04-12"},
                {"evaluation":3.6,"date": "2016-06-20"}
              ],
              "date": "2016-10-21"
            }
          },
          {
            "name": "alpha.beta",
            "evaluation": {
              "value": 3.2,
              "evaluations": [
                {"evaluation":2,"date": "2016-02-23"},
                {"evaluation":2.4,"date": "2016-02-27"}
              ],
              "date": "2016-11-21"
            }
          },
          {
            "name": "alpha.beta.gamma",
            "evaluation": {
              "value": 1.7,
              "evaluations" : [
                {"evaluation":4.4, "date": "2016-10-14"},
                {"evaluation":3.9, "date": "2016-01-17"}
              ],
              "date": "2016-11-21"
            }
          },
          {
            "name": "kuku",
            "evaluation": {
              "value": 3,
              "evaluations" : [
                {"evaluation": 5, "date": "2016-03-02"},
                {"evaluation": 9.8, "date": "2016-05-14"}
              ],
              "date": "2016-08-01"
            }
          },
          {
            "name": "beta",
            "evaluation": {
              "value": 8,
              "evaluations" : [
                {"evaluation":4, "date": "2016-04-12"},
                {"evaluation":3.6, "date": "2016-06-20"}
              ],
              "date": "2016-10-21"
            }
          },
          {
            "name": "beta.beta",
            "evaluation": {
              "value": 10,
              "evaluations" : [
                {"evaluation":1.7, "date": "2016-08-25"},
                {"evaluation":7, "date": "2016-09-26"}
              ],
              "date": "2016-10-22"
            }
          },
          {
            "name": "ololo",
            "evaluation": {
              "value": 3,
              "evaluations" : [
                {"evaluation": 5, "date": "2016-03-02"},
                {"evaluation": 9.8, "date": "2016-05-14"}
              ],
              "date": "2016-01-13"
            }
          }
        ]
      },

    ];
    this.prepareData();
    /*this.$just.mgoInterface
      .find()
      .then(res => {
        if (!res) {
          return;
        }
        this.data = res;

      });*/
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

      console.log(this.models);
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
