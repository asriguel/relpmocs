// libs
import React, { Component } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { observer, inject } from 'mobx-react';
import Popup from 'reactjs-popup';
// constants
import { REQUEST_TYPES } from 'constants/index';
// svg
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
// views
import MemberItem from 'components/CardMembersList/MemberItem';
import HiddenMembersCounter from 'components/CardMembersList/HiddenMembersCounter';
import Preloader from 'components/Preloader';
// utils
import { calculateDomElementWidth } from 'utils';

@inject('requestStore', 'usersStore') @observer
class CardMembersList extends Component {
  constructor(props) {
    super(props);

    this.member = React.createRef();
    this.membersList = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.setUISizes);
  }

  componentDidUpdate(prevProps) {
    const { users, uiState: { setElementsInBlock } } = this.props;

    // set size when first member are rendered
    if ((users.length === 1)) {
      this.setUISizes();
    }

    if (users !== prevProps.users) {
      setElementsInBlock(users.length);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setUISizes);
  }

  setUISizes = () => {
    const { uiState: { setElementsWidth } } = this.props;
    const membersListSize = this.membersList.current && calculateDomElementWidth(this.membersList.current);
    const memberSize = this.member.current && calculateDomElementWidth(this.member.current);

    setElementsWidth(memberSize, membersListSize);
  };

  handleCardMemberClick = (userFromEvent) => {
    const { removeUser, addUser } = this.props;

    if (this.isUserAddedInCard(userFromEvent)) {
      removeUser(userFromEvent.login.uuid);

      return;
    }

    addUser(userFromEvent);
  };

  isUserAddedInCard(userToFind) {
    const { users } = this.props;

    return users.find((user) => (user.id === userToFind.login.uuid));
  }

  renderCardMembersList() {
    const { users, uiState: { elementsToHide } } = this.props;
    let membersToRender = users;

    if (elementsToHide > 0) {
      membersToRender = users.slice(0, users.length - elementsToHide);
    }

    return (
      <>
        <ul className="inline-list card__members-list">
          {membersToRender.map(({ id, img, name }, index) => (
            <li
              key={id}
              ref={(index === 0) ? this.member : null}
              className="inline-list__item"
            >
              <img alt={name} className="user-img" src={img} />
            </li>
          ))}
        </ul>
      </>
    );
  }

  renderCardFooterContent() {
    const { users: cardUsers } = this.props;

    return (cardUsers.length > 0
      ? this.renderCardMembersList()
      : (
        <>
          <span className="button__icon icon-circled icon-circled--sm">
            <FontAwesomeIcon icon={faUserCircle} />
          </span>
          <span className="button__text">
            Add Team Members
          </span>
        </>
      ));
  }

  renderPopupContent() {
    const {
      requestStore: { getRequestByType },
      usersStore: { users: allUsers },
    } = this.props;
    const isUsersLoading = getRequestByType(REQUEST_TYPES.getUsers);

    return (
      <ul className="members-list">
        {isUsersLoading && <Preloader />}
        {allUsers.length > 0 && allUsers.map((user) => (
          <MemberItem
            key={user.login.uuid}
            id={user.login.uuid}
            isInList={this.isUserAddedInCard(user)}
            name={`${user.name.first} ${user.name.last}`}
            onClick={() => { this.handleCardMemberClick(user); }}
            picture={user.picture.thumbnail}
          />
        ))}
      </ul>
    );
  }

  renderFooterContentWithWrapper() {
    const {
      validateCard,
      disabled,
    } = this.props;

    if (disabled) {
      return (
        this.renderCardFooterContent()
      );
    }

    return (
      <Popup
        arrow={false}
        closeOnDocumentClick
        contentStyle={{ border: 'none', padding: 0 }}
        keepTooltipInside
        offsetY={-40}
        onClose={validateCard}
        trigger={() => (
          <button className="button" type="button">
            {this.renderCardFooterContent()}
          </button>
        )}
      >
        <Scrollbars
          autoHeight
          autoHeightMax="70vh"
        >
          {this.renderPopupContent()}
        </Scrollbars>
      </Popup>
    );
  }

  render() {
    const {
      uiState: { elementsToHide },
    } = this.props;

    return (
      <div
        ref={this.membersList}
        className="members-list-wrapper"
      >
        {this.renderFooterContentWithWrapper()}
        {(elementsToHide > 0) && <HiddenMembersCounter count={elementsToHide} />}
      </div>
    );
  }
}

export default CardMembersList;
