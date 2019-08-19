import { observable, action } from 'mobx';

class ErrorsStore {
  @observable error;

  constructor() {
    this.error = '';
  }

  @action setError = (text) => {
    this.error = text;
  };

  @action clearError() {
    this.error = null;
  }
}

const errorsStore = new ErrorsStore();

export default errorsStore;
