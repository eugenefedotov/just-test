'use strict';

export default class SharedUtils {

  constructor() {

  }

  /**
   * Formating date to format yyyy-mm-dd
   * @returns {string}
   */
  getFormatDate() {
    let date = new Date();
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2);
  }

};
