import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { followingUser, unfollowingUser } from '../../store/actions';

const FollowButton = ({ authId, userId, isFollowing }) => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  function showFollowButton() {
    if (authId !== userId)
      return (
        <Button
          onClick={() => _onHandleFollow(userId)}
          variant='contained'
          color='primary'
          disabled={disabled}
        >
          {!isFollowing ? 'Follow' : 'Unfollow'}
        </Button>
      );
  }

  function _onHandleFollow(followId) {
    setDisabled(true);
    if (isFollowing) {
      return dispatch(unfollowingUser(followId)).then(_ => setDisabled(false));
    } else {
      return dispatch(followingUser(followId)).then(_ => setDisabled(false));
    }
  }

  return <>{showFollowButton()}</>;
};

export default FollowButton;
