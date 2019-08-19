import { observable, action } from 'mobx';

class Users {
  @observable users;

  constructor() {
    this.users = [];
  }

  @action initialize(users) {
    this.users = users;
  }
}

const store = new Users();
export default store;
