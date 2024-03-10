import { isRejectedWithValue } from '@reduxjs/toolkit';
import { Middleware, MiddlewareAPI } from 'redux';
import { FORBIDDEN_REQUEST_STATUS } from 'src/constants';
import { removeToken } from 'src/redux/slices/tokenSlice';
import { removeUser } from 'src/redux/slices/userSlice';

export const forbiddenErrorMiddleware: Middleware =
  (store: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action) && action.payload.status === FORBIDDEN_REQUEST_STATUS) {
      store.dispatch(removeToken());
      store.dispatch(removeUser());
    }

    return next(action);
  };
