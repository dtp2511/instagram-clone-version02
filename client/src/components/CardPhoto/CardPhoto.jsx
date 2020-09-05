import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import { MenuSelect, CardComment } from '..';

import { useStyles } from './styles';

import { Divider, Input, Grid, Box, Tooltip, Avatar } from '@material-ui/core';
import moment from 'moment';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  likePost,
  unlikePost,
  addComment,
  setSelectedImage,
} from '../../store/actions';

const CardPhoto = ({ post, userId }) => {
  const dispatch = useDispatch();
  const {
    photo,
    _id,
    body,
    postedBy: { username, _id: userDetailId, avatar },
    date,
    likes,
    comments,
  } = post;

  const isLike = post.likes.map(like => like.user).includes(userId);

  const [disabledButton, setdisabledButton] = useState(true);
  const [comment, setComment] = useState('');
  const [commentsPerPost, setCommentsPerPost] = useState(3);
  const classes = useStyles();

  function showLoadMore() {
    if (comments.length > commentsPerPost) {
      return (
        <Tooltip
          onClick={() => setCommentsPerPost(commentsPerPost * 2)}
          title='Add'
          aria-label='add'
        >
          <Typography variant='subtitle2' gutterBottom>
            load more comments
          </Typography>
        </Tooltip>
      );
    }
  }

  function showComment() {
    return (
      post &&
      post.comments
        .slice(0, commentsPerPost)
        .map(comment => (
          <CardComment postId={_id} key={comment._id} comment={comment} />
        ))
    );
  }

  const _onHandleChange = ({ target: { value } }) => {
    if (value.trim().length > 0) {
      setdisabledButton(false);
    } else {
      setdisabledButton(true);
    }
    setComment(value);
  };
  const _onHandleLike = () => {
    if (!isLike) {
      dispatch(likePost(_id));
    } else {
      dispatch(unlikePost(_id));
    }
  };

  const _onCommentAction = () => {
    const data = { text: comment };
    dispatch(addComment(_id, data));
    setComment('');
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        title={
          <Link className={classes.link} to={`/profile/${userDetailId}`}>
            <strong>{username}</strong>
          </Link>
        }
        subheader={moment(date)
          .startOf('day')
          .fromNow()}
        action={<MenuSelect post={post} userId={userId} />}
      />

      <img
        className={classes.cardImage}
        onClick={() => dispatch(setSelectedImage(photo))}
        alt='card images'
        src={photo}
      />
      <CardContent style={{ padding: '8px 1rem 0' }}>
        <Typography variant='body2' component='p'>
          {body}
        </Typography>
      </CardContent>

      <CardActions style={{ padding: 0 }} disableSpacing>
        <Box style={{ width: '100%' }} display='flex' flexDirection='column'>
          <Box px={2} style={{ width: '100%' }}>
            <i
              style={{
                color: isLike ? 'red' : 'grey',
              }}
              className={classNames(classes.heartIcon, 'fas fa-heart')}
              onClick={() => _onHandleLike()}
            ></i>

            <Typography
              style={{ display: 'inline-block' }}
              variant='subtitle2'
              gutterBottom
            >
              {likes.length} {likes.length > 1 ? 'likes' : 'like'}
            </Typography>
          </Box>
          <Box px={2}>{showComment()}</Box>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {showLoadMore()}
          </div>
        </Box>
      </CardActions>
      <Divider />
      <Grid style={{ padding: '1rem' }} container>
        <Grid item xs={10} sm={10} md={10}>
          <Box ml={2}>
            <Input
              value={comment}
              onChange={e => _onHandleChange(e)}
              multiline={true}
              disableUnderline={true}
              placeholder='Add comment.....'
              style={{ width: '100%', padding: '0' }}
            />
          </Box>
        </Grid>

        <Grid item xs={2} sm={2} md={2}>
          <Box ml={3}>
            <button
              disabled={disabledButton}
              className={`${classes.postButton} ${
                disabledButton ? classes.fadeText : ''
              } `}
            >
              <span onClick={() => _onCommentAction()}>Post</span>
            </button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

CardPhoto.propTypes = {};

export default CardPhoto;
