// @flow

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import type { Store, State } from '../../flow-types/types';

const loggerMiddleware = createLogger();

const configureStore = (preloadedState: State): Store => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
};

export default configureStore;
