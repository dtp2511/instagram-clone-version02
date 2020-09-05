import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERRORS,
} from '../../common/constants/';

export const asyncActionStart = () => ({
  type: ASYNC_ACTION_START,
});
export const asyncActionFinish = () => ({
  type: ASYNC_ACTION_FINISH,
});
export const asyncActionErrors = () => ({
  type: ASYNC_ACTION_ERRORS,
});
