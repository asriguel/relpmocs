import React from 'react';

const HiddenMembersCounter = ({ count }) => (
  <div className="members-list__hidden-elements-counter hidden-elements-counter">
    <span className="hidden-elements-counter__plus">+</span>
    <span className="icon-circled icon-circled--sm hidden-elements-counter__count">{count}</span>
  </div>
);

export default HiddenMembersCounter;
