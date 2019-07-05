import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import combinedReducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware()

const middleware = [
  sagaMiddleware,
  logger
]

const initialState = {}

const store = createStore(
  combinedReducer,
  initialState,
  compose(applyMiddleware(...middleware))
)

sagaMiddleware.run(sagas)

export default store
