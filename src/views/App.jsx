// libs
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// services
import { getUsers } from 'services/users';
// views
import CardsList from 'components/CardsList';

@inject('errorsStore') @observer
class App extends Component {
  componentDidMount() {
    getUsers();
  }

  render() {
    const { errorsStore: { error } } = this.props;

    return (
      <>
        {error && (<div className="alert">{error}</div>)}
        <CardsList />
      </>
    );
  }
}

export default App;
