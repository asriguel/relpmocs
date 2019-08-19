import React, { Component } from 'react';
import Truncate from 'react-truncate';

class InputField extends Component {
  handleChange = (e) => {
    const {
      handleChange, name,
    } = this.props;

    handleChange(name, e.target.value);
  };

  renderField() {
    const {
      name, value, placeholder,
      className, disabled, inputRef,
      isTextarea, onKeyDown, truncateLines,
    } = this.props;
    const commonProps = {
      name,
      value,
      placeholder,
      className,
      disabled,
      ref: inputRef,
      onKeyDown,
      onChange: this.handleChange,
    };

    if (disabled) {
      return (
        <>
          <div className={className}>
            <Truncate lines={truncateLines}>
              {value}
            </Truncate>
          </div>
        </>
      );
    }

    if (isTextarea) {
      return (
        <textarea
          {...commonProps}
        />
      );
    }

    return (
      <input
        {...commonProps}
      />
    );
  }

  render() {
    return (
      <div className="card__field">
        {this.renderField()}
      </div>
    );
  }
}

export default InputField;
