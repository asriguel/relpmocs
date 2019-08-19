// libs
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
// svg
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// utils
import { checkValidFileExtension } from 'utils';
import { VALID_FILE_EXTENSIONS } from 'constants/index';

@observer
class FileUpload extends Component {
  createImageObject = (file) => {
    const { updateCardField, setError } = this.props;

    if (!file) {
      return;
    }

    if (!checkValidFileExtension(file.name, VALID_FILE_EXTENSIONS)) {
      setError('Incorrect file type');

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      updateCardField(reader.result);
    };
  };

  render() {
    const { imgSrc, error } = this.props;

    return (
      <div className={classNames('file-upload', { 'file-upload--error': !!error })}>
        <input
          accept="image/x-png,image/gif,image/jpeg"
          className="file-upload__input"
          onChange={(e) => {
            this.createImageObject(e.target.files[0]);
          }}
          type="file"
        />
        {imgSrc
          ? <img alt="" className="file-upload__preview" src={imgSrc} />
          : <FontAwesomeIcon icon={faImage} />}
      </div>
    );
  }
}

export default FileUpload;
