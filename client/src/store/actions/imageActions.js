import { ON_CLICK_IMAGE } from '../../common/constants';

export const setSelectedImage = url => dispatch => {
  dispatch({ type: ON_CLICK_IMAGE, payload: url });
};
