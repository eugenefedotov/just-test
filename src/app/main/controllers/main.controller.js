'use strict';

export default class MainCtrl {

  constructor($auth, $just) {

    $auth.authorization();

    this.$just = $just;

    this.model  = [
      {
        _id: '123ab',
        name: 'model1',
        dscr: 'bla',
        source: '123',
        models: [
          {
            name: 'alpha',
            evaluation: {
              evaluation: '7',
              evaluations : [
                {evaluation:'4', date: '2016-04-12'},
                {evaluation:'3.6', date: '2016-06-20'}
              ],
              date: '2016-10-21'
            }
          },
          {
            name: 'alpha.beta',
            evaluation: {
              evaluation: '3.2',
              evaluations : [
                {evaluation:'2', date: '2016-02-23'},
                {evaluation:'2.4', date: '2016-02-27'}
              ],
              date: '2016-11-21'
            }
          },
          {
            name: 'kuku',
            evaluation: {
              evaluation: '3',
              evaluations : [
                {evaluation: '5', date: '2016-03-02'},
                {evaluation: '9.8', date: '2016-05-14'}
              ],
              date: '2016-08-01'
            }
          },
          {
            name: 'beta',
            evaluation: {
              evaluation: '8',
              evaluations : [
                {evaluation:'4', date: '2016-04-12'},
                {evaluation:'3.6', date: '2016-06-20'}
              ],
              date: '2016-10-21'
            }
          },
          {
            name: 'beta.beta',
            evaluation: {
              evaluation: '10',
              evaluations : [
                {evaluation:'1.7', date: '2016-08-25'},
                {evaluation:'7', date: '2016-09-26'}
              ],
              date: '2016-10-22'
            }
          },
          {
            name: 'ololo',
            evaluation: {
              evaluation: '3',
              evaluations : [
                {evaluation: '5', date: '2016-03-02'},
                {evaluation: '9.8', date: '2016-05-14'}
              ],
              date: '2016-01-13'
            }
          }
        ]
      },

    ];

  }

  changeEvaluation() {

  }

};
