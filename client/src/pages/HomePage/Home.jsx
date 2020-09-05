import React, { useEffect, useState } from 'react';

import { Layout } from '../../hoc';

import { CardPhoto, Spinner, Pagi } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/actions';
import { Box, Grid } from '@material-ui/core';
const Home = () => {
  const posts = useSelector(state => state.posts.posts);
  const auth = useSelector(state => state.auth);
  const loading = useSelector(state => state.posts.loading);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const postPerPage = 6;
  const endIndexPost = postPerPage * currentPage;
  const startIndexPost = endIndexPost - postPerPage;
  const pages = Math.ceil(posts.length / postPerPage);
  useEffect(() => {
    dispatch(getAllPosts());
    // eslint-disable-next-line
  }, []);
  function showSpinner() {
    if (loading) return <Spinner />;
  }
  function showImages() {
    if (!loading)
      return (
        <>
          {posts && posts.length > 0 ? (
            posts.slice(startIndexPost, endIndexPost).map(post => (
              <Grid key={post._id} item md={6}>
                <Box mt={4} mx={3}>
                  <CardPhoto
                    userId={auth && auth.user && auth.user._id}
                    post={post}
                  />
                </Box>
              </Grid>
            ))
          ) : (
            <div>There's no post</div>
          )}
          <Grid container>
            <Box mx='auto' alignItems='center' justifyContent='center' my={4}>
              {posts && <Pagi pages={pages} setCurrentPage={setCurrentPage} />}
            </Box>
          </Grid>
        </>
      );
  }
  return (
    <Layout containerSize='lg' title='Welcome Home'>
      <Grid container>
        {showSpinner()}
        {showImages()}
      </Grid>
    </Layout>
  );
};

export default Home;
