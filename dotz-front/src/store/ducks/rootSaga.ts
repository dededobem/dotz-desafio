import { all, takeLatest } from 'redux-saga/effects';

import { DotzTypes } from './dotz/types';
import { loadDotz, update } from './dotz/sagas';

import { TransactionTypes } from './transaction/types';
import { loadTransaction, insert } from './transaction/sagas';

export default function* rootSaga(): any {
  return yield all([
    takeLatest(DotzTypes.LOAD_CURRENCE_BALANCE_REQUEST, loadDotz),
    takeLatest(DotzTypes.UPDATE_CURRENCE_BALANCE_REQUEST, update),
    takeLatest(TransactionTypes.LOAD_TRANSACTION_REQUEST, loadTransaction),
    takeLatest(TransactionTypes.INSERT_TRANSACTION_REQUEST, insert),
  ]);
}
