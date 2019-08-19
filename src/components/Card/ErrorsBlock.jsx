// libs
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

@observer
class ErrorsBlock extends Component {
  render() {
    const { errors, className } = this.props;

    return (
      <div className={classNames('errors-block', className)}>
        <ul className="card__errors-list">
          {errors.map((error) => (
            <li key={error} className="errors-block__item">
              {error && `• ${error}`}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ErrorsBlock;
