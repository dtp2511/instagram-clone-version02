import React, { useState } from 'react';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Layout } from '../../hoc';

import { Box, OutlinedInput, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createPost } from '../../store/actions';
import { useHistory } from 'react-router-dom';

const CreatePost = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    body: '',
    photo: '',
  });

  const _onHandleChange = ({ target: { value, name } }) => {
    setForm({ ...form, [name]: value });
  };

  const _onHandleImage = e => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const _onSubmit = e => {
    const formData = new FormData();
    for (let i in form) {
      formData.set(i, form[i]);
    }
    dispatch(createPost(formData, history));
  };

  return (
    <Layout containerSize='sm' title='Create Post'>
      <Card>
        <CardContent variant='outlined'>
          <Box textAlign='center'>
            <Typography color='textPrimary' component='h1' variant='h3'>
              Post
            </Typography>
          </Box>
        </CardContent>
        <CardContent>
          <form autoComplete='off'>
            <Box mt={3} />
            <OutlinedInput
              color='primary'
              name='body'
              fullWidth
              placeholder='Body'
              multiline
              onChange={e => _onHandleChange(e)}
            />
            <Box mt={3} />
            <Grid container>
              <Grid item xs={3}>
                <Button color='primary' variant='contained' component='label'>
                  Upload File
                  <input
                    type='file'
                    name='photo'
                    style={{ display: 'none' }}
                    onChange={e => _onHandleImage(e)}
                  />
                </Button>
              </Grid>
              <Grid item xs={9}>
                {form.photo && form.photo.name}
              </Grid>
            </Grid>
            <Box display='flex' justifyContent='center'>
              <Button
                onClick={e => _onSubmit(e)}
                variant='contained'
                color='primary'
              >
                Post
              </Button>
              <Box mr={1} />
            </Box>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CreatePost;
