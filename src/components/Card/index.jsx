// libs
import React, { Component } from 'react';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import { observer } from 'mobx-react';
// constants
import { KEY_CODES, CARD_FIELDS } from 'constants/index';
// svg
import { ReactComponent as EmptyCardBorderSvg } from 'assets/svg/card-border.svg';
// views
import InputField from 'components/InputField';
import CardMembersList from 'components/CardMembersList';
import FileUpload from 'components/FileUpload';
import ErrorsBlock from 'components/Card/ErrorsBlock';
// utils
import { makeArrayFromMapValues } from 'utils';

@observer
class Card extends Component {
  constructor(props) {
    super(props);

    this.cardTitle = React.createRef();
    this.card = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isEditing !== this.props.isEditing && this.props.isEditing) {
      this.cardTitle.current.focus();
    }
  }

  validateCard = () => {
    const {
      description, title, imgSrc, users,
    } = this.props;

    this.handleError(CARD_FIELDS.description, description, 'Fill the description');
    this.handleError(CARD_FIELDS.title, title, 'Fill the team name');
    this.handleError(CARD_FIELDS.imgSrc, imgSrc, 'Add an image');
    this.handleError(CARD_FIELDS.users, users.length, 'Add users to the team');
  };

  handleClickOutside = () => {
    const { setEditing } = this.props;

    if (this.isCardEmpty()) {
      setEditing(false);
    }

    this.saveCard();
  };

  handleKeyUp = (e) => {
    if (e.keyCode === KEY_CODES.enter) {
      this.saveCard();
    }
  };

  handleCardClick = () => {
    const { isSaved, onClick } = this.props;

    if (isSaved) {
      return;
    }

    onClick();
  };

  handleError(fieldName, value, message) {
    const { removeFieldError, setFieldError } = this.props;

    if (!value) {
      setFieldError(fieldName, message);

      return;
    }

    removeFieldError(fieldName);
  }

  isCardEmpty() {
    const {
      description, title, imgSrc, users,
    } = this.props;

    return (!description && !title && !imgSrc && !users.length);
  }

  saveCard() {
    const {
      isEditing, setEditing, save, errors, cardStore,
    } = this.props;

    if (this.isCardEmpty()) {
      return;
    }

    this.validateCard();

    if (errors.size || !isEditing) {
      return;
    }

    setEditing(false);
    save();
    cardStore.createCard();
  }

  renderImageSection() {
    const {
      imgSrc, updateCardField, getFieldError, setFieldError, isSaved,
    } = this.props;
    const error = getFieldError(CARD_FIELDS.imgSrc);

    if (isSaved) {
      return <img alt="" src={imgSrc} />;
    }

    if (!this.isCardEmpty()) {
      return (
        <FileUpload
          disabled={isSaved}
          error={error}
          imgSrc={imgSrc}
          setError={(message) => {
            setFieldError(CARD_FIELDS.imgSrc, message);
          }}
          updateCardField={(value) => {
            updateCardField(CARD_FIELDS.imgSrc, value);
          }}
        />
      );
    }

    return null;
  }

  renderCardFields = () => {
    const {
      description, title, updateCardField, isSaved,
    } = this.props;

    return (
      <>
        {<InputField
          className="card__title"
          disabled={isSaved}
          handleChange={updateCardField}
          inputRef={this.cardTitle}
          name="title"
          placeholder="New Team..."
          truncateLines={1}
          value={title}
        />}
        {!this.isCardEmpty() && (
          <InputField
            className="card__description"
            disabled={isSaved}
            handleChange={updateCardField}
            isTextarea
            name="description"
            onKeyDown={(e) => {
              if (e.keyCode === KEY_CODES.enter) {
                e.preventDefault();
              }
            }}
            placeholder="Team Description..."
            truncateLines={2}
            value={description}
          />
        )}
      </>
    );
  };

  renderCardFooter() {
    const {
      users, addUser, removeUser, uiState, isSaved,
    } = this.props;

    if (this.isCardEmpty()) {
      return false;
    }

    return (
      <div className="card__footer">
        {<CardMembersList
          addUser={addUser}
          disabled={isSaved}
          removeUser={removeUser}
          uiState={uiState}
          users={users}
          validateCard={this.validateCard}
        />}
      </div>
    );
  }

  render() {
    const { errors } = this.props;
    const isEmpty = this.isCardEmpty();
    const hasErrors = !isEmpty && (errors.size > 0);

    return (
      <>
        <div
          className={classNames('card',
            {
              'card--empty': isEmpty,
              'card--has-error': hasErrors,
            })}
          onClick={this.handleCardClick}
          onKeyUp={this.handleKeyUp}
        >
          <div className="card__body">
            <div className="card__img">
              {this.renderImageSection()}
            </div>
            {this.renderCardFields()}
          </div>
          {this.renderCardFooter()}
          {isEmpty && <EmptyCardBorderSvg />}
        </div>
        {hasErrors && (
          <ErrorsBlock className="card__errors" errors={makeArrayFromMapValues(errors)} />
        )}
      </>
    );
  }
}

export default onClickOutside(Card);
