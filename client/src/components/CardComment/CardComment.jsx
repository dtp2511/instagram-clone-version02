import React from 'react';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Box } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../store/actions';

const CardComment = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { user, username, text, _id } = comment;
  const userId = useSelector(state => state.auth.user && state.auth.user._id);

  const showDeletePost = () => {
    return (
      userId === user && (
        <Box>
          <DeleteOutlinedIcon onClick={() => _onDeletePost(postId, _id)} />
        </Box>
      )
    );
  };

  const _onDeletePost = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <strong style={{ display: 'inline-block' }} variant='subtitle2'>
          {username}
        </strong>
        &nbsp;
        <span style={{ display: 'inline-block' }} variant='body2'>
          {text}
        </span>
      </div>
      {showDeletePost()}
    </div>
  );
};

export default CardComment;
