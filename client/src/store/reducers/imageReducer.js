import { ON_CLICK_IMAGE } from '../../common/constants';

const initialState = {
  selectedImage: '',
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ON_CLICK_IMAGE:
      {
        const url = payload;
        state.selectedImage = url;
      }
      return state;
    default:
      return state;
  }
};
