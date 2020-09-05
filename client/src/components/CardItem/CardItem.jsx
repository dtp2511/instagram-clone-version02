import React from 'react';

import { Grid, Box } from '@material-ui/core';

import './CardItem.css';
const CardItem = ({ post }) => {
  console.log(post.photo);
  return (
    <Grid item xs={6} md={4} lg={4}>
      <Box m={1}>
        <div className='card-item'>
          <img src={post.photo} alt='Avatar' />
          <div className='card-item__content'>
            <i className=' fas fa-heart'></i>
            <span>{post.likes.length}</span> &nbsp;
            <i class='comment__icon far fa-comment'></i>
            <span>{post.comments.length}</span>
          </div>
        </div>
      </Box>
    </Grid>
  );
};

export default CardItem;
