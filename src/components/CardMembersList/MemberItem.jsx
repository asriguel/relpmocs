// libs
import React from 'react';
import classNames from 'classnames';
// svg
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const MemberItem = ({
  id, isInList, onClick, picture, name,
}) => (
  <li
    key={id}
    className={classNames(
      'members-list__item',
      { 'members-list__item--checked': isInList },
    )}
    onClick={onClick}
  >
    <span
      className="members-list__image user-img"
    >
      {isInList && <FontAwesomeIcon className="icon" icon={faCheck} />}
      <img alt={name} src={picture} />
    </span>
    <span className="members-list__name">
      {name}
    </span>
  </li>
);

export default MemberItem;
