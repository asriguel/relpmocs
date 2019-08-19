import { action, observable } from 'mobx';
import shortId from 'shortid';
import CardUiState from 'stores/entities/cardUiState';

class Card {
  @observable title;
  @observable description;
  @observable imgSrc;
  @observable users;
  @observable isEditing;
  @observable isSaved;
  @observable errors;
  @observable uiState;

  constructor(title = '', description = '', imgSrc = '', users = []) {
    this.id = shortId();
    this.title = title;
    this.description = description;
    this.imgSrc = imgSrc;
    this.users = users;
    this.isEditing = false;
    this.isSaved = false;
    this.errors = observable.map({});
    this.uiState = new CardUiState();
  }

  @action setEditing = (value) => {
    this.isEditing = value;
  };

  @action save = () => {
    this.isSaved = true;
  };

  @action updateByFieldName = (fieldName, value) => {
    if (this[fieldName] === undefined) {
      return;
    }

    this[fieldName] = value;
  };

  @action addUser = (user = {}) => {
    this.users.push({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      img: user.picture.thumbnail,
    });

    this.users = [...this.users];
  };

  @action removeUserById = (id) => {
    this.users = this.users.filter((user) => user.id !== id);
  };

  @action setFieldError = (fieldName, message) => {
    this.errors.set(fieldName, message);
  };

  @action removeFieldError = (fieldName) => {
    this.errors.delete(fieldName);
  };

  getFieldError = (fieldName) => this.errors.get(fieldName);
}

export default Card;
