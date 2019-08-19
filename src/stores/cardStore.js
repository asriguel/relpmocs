import { observable, action } from 'mobx';
import Card from 'stores/entities/card';

class CardStore {
  @observable cardsList;
  @observable isNewCardSaved;

  constructor() {
    this.cardsList = [
      new Card(),
    ];
    this.isNewCardSaved = false;
  }

  @action createCard(title, description, imgSrc, users) {
    this.cardsList.push(new Card(title, description, imgSrc, users));
    this.cardsList = [...this.cardsList];
    this.isNewCardSaved = false;
  }
}

const store = new CardStore();
export default store;
