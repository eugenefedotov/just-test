'use strict';

export default class AlertService {

  /**
   * Constructor
   */
  constructor (ngToast) {
    this.ngToast = ngToast;
  }

  /**
   * Preperes message for usage
   * @param  {string|Object} message
   * @return {string}
   */
  _prepareMessage (message) {
    if (_.isObject(message)) {
      message = message.message;
    }
    return message;
  }

  /**
   * Create a new ngToast
   * @param  {Object} data
   * @return {*}
   */
  create (data) {
    this.ngToast.dismiss();
    return this.ngToast.create(data);
  }

  /**
   * Show info message in toast
   * @param  {string} message
   * @return {ngToast}
   */
  info (message) {
    return this.create({
      className: 'info',
      content: this._prepareMessage(message)
    });
  }

  /**
   * Show success message in toast
   * @param  {string} message
   * @return {ngToast}
   */
  success (message) {
    return this.create({
      className: 'success',
      content: this._prepareMessage(message)
    });
  }

  /**
   * Show warning message in toast
   * @param  {string} message
   * @return {ngToast}
   */
  warning (message) {
    return this.create({
      className: 'warning',
      content: this._prepareMessage(message)
    });
  }

  /**
   * Show danger message in toast
   * @param  {string} message
   * @return {ngToast}
   */
  danger (message) {
    return this.create({
      className: 'danger',
      content: this._prepareMessage(message)
    });
  }
};
