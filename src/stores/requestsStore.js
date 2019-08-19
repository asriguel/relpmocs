import { observable, action } from 'mobx';

class RequestStore {
  @observable requests;

  constructor() {
    this.requests = observable.map({});
  }

  @action setRequestInProcess = (requestType, inProcess) => {
    this.requests.set(requestType, inProcess);
  };

  getRequestByType = (type) => this.requests.get(type)
}

const requestStore = new RequestStore();

export default requestStore;
