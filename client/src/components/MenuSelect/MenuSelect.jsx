import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { deletePost } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@material-ui/core';

const MenuSelect = ({ userId, post: { _id, postedBy } }) => {
  const dispatch = useDispatch();

  const isOwn = userId === postedBy._id;

  const _onDeletePost = postId => {
    dispatch(deletePost(postId));
  };

  const showMenuDelete = () => {
    return (
      isOwn && (
        <Tooltip title='Delete'>
          <IconButton onClick={() => _onDeletePost(_id)} aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )
    );
  };

  return <>{showMenuDelete()}</>;
};

export default MenuSelect;
