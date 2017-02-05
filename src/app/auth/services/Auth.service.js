'use strict';

export default class AuthService {
  constructor($just) {
    this.$just = $just;
    this.user = 'test6@test.com';
    this.pass = '12345';
  }

  register() {
    this.$just
      .auth_register({_id: this.user, password: this.pass})
      .then(res => {
        console.log('Registration success. User: '+ this.user +'; Pass: '+ this.pass);
        this.login();
      })
  }

  login() {
    this.$just
      .auth(this.user, this.pass)
      .then(res => {
        console.log('Login success');
      })
      .catch(err => {
        console.log('User '+ this.user +' not found. Registration begins...');
        this.register();
      })
  }

  authorization () {
    this.login();
  }
};
