import { observable, action, computed } from 'mobx';

class CardUiState {
  @observable memberWidth;
  @observable membersListContainerWidth;
  @observable elementsInBlock;

  constructor() {
    this.memberWidth = 0;
    this.membersListContainerWidth = 0;
    this.elementsInBlock = 0;
  }

  @action setElementsWidth = (elementValue, parentValue) => {
    this.memberWidth = elementValue;
    this.membersListContainerWidth = parentValue;
  };

  @action setElementsInBlock = (value) => {
    this.elementsInBlock = value;
  };

  @computed get elementsToHide() {
    if (!this.membersListContainerWidth || !this.memberWidth) {
      return 0;
    }

    const visibleElementsCount = Math.floor(this.membersListContainerWidth / this.memberWidth);
    let elementsToHideCount = 0;

    if (this.elementsInBlock > visibleElementsCount && visibleElementsCount > 0) {
      elementsToHideCount = this.elementsInBlock - visibleElementsCount;
    }

    return elementsToHideCount;
  }
}

export default CardUiState;
