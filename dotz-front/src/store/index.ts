import { createStore, Store, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';
import { DotzState } from './ducks/dotz/types';

export interface ApplicationState {
  dotz: DotzState;
}

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const enhancer = __DEV__
  ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
  : applyMiddleware(sagaMiddleware);

const store: Store<ApplicationState> = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
