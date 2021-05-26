import { combineReducers } from 'redux';

import dotz from './dotz';
import transaction from './transaction';

export default combineReducers({
  dotz,
  transaction,
});
