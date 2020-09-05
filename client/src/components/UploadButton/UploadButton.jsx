import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { updateProfileImg } from '../../store/actions';
const UploadButton = ({ authId, userId }) => {
  const [disabled, setDisabled] = useState(false);
  const [imgFile, setImgFile] = useState('');
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  function _onUpdateProfileImg(e) {
    setImgFile(e.target.files[0]);

    setDisabled(true);

    setCount(count + 1);
  }

  useEffect(() => {
    if (count > 0) {
      const formData = new FormData();
      formData.append('photo', imgFile);
      dispatch(updateProfileImg(formData)).then(_ => setDisabled(false));
    }
    // eslint-disable-next-line
  }, [count]);
  function showUploadButton() {
    return (
      authId === userId && (
        <Button
          variant='contained'
          color='primary'
          component='label'
          disabled={disabled}
        >
          Update Profile Picture
          <input
            type='file'
            name='photo'
            style={{ display: 'none' }}
            onChange={e => _onUpdateProfileImg(e)}
          />
        </Button>
      )
    );
  }

  return <>{showUploadButton()}</>;
};

export default UploadButton;
