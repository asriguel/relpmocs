// libs
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// components
import Card from 'components/Card';

@inject('cardStore') @observer
class CardsList extends Component {
  render() {
    const { cardStore: { cardsList } } = this.props;

    return (
      <div className="layout">
        {cardsList.length > 0 && cardsList.map((card) => (
          <div key={card.id} className="layout__item">
            <Card
              addUser={card.addUser}
              description={card.description}
              errors={card.errors}
              getFieldError={card.getFieldError}
              imgSrc={card.imgSrc}
              isEditing={card.isEditing}
              isSaved={card.isSaved}
              onClick={() => { card.setEditing(true); }}
              removeFieldError={card.removeFieldError}
              removeUser={card.removeUserById}
              save={card.save}
              setEditing={card.setEditing}
              setFieldError={card.setFieldError}
              title={card.title}
              uiState={card.uiState}
              updateCardField={card.updateByFieldName}
              users={card.users}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default CardsList;
