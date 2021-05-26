import { Alert } from 'react-native';
import { call, put } from 'redux-saga/effects';

import api from '../../../services/api';
import {
  loadCurrenceBalanceSuccess,
  updateCurrenceBalanceSuccess,
} from './actions';

export function* loadDotz(): any {
  try {
    const response = yield call(api.get, '/dotz/get-by-customer');
    yield put(loadCurrenceBalanceSuccess(response.data));
  } catch (error) {
    Alert.alert('Error!', 'Erro ao carregar o saldo');
  }
}

export function* update(value): any {
  try {
    const response = yield call(api.put, '/dotz', null, {
      params: { value: value.payload },
    });
    yield put(updateCurrenceBalanceSuccess(response.data));
  } catch (error) {
    Alert.alert('Error!', 'Erro ao inserir novo valor');
  }
}
