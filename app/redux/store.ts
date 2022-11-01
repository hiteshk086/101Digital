import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import api from '../middlewares/api';
import {defaultState} from './initialState';

// import { defaultState } from './initialState';
import {MainState} from './interfaces';
import reducers from './reducers/index';

const middlewares = [thunkMiddleware, api];

export const store = createStore(
  reducers,
  defaultState,
  compose(applyMiddleware(...middlewares)),
);
