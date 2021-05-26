import { Alert } from 'react-native';
import { call, put } from 'redux-saga/effects';

import api from '../../../services/api';
import { loadTransactionSuccess, insertTransactionSuccess } from './actions';
import { convertArray, convertObject } from '../../../util/convertArray';
import { loadDotz } from '../dotz/sagas';

export function* loadTransaction(): any {
  try {
    const response = yield call(api.get, '/transaction/get-by-customer');
    let arrayConverted = convertArray(response.data);
    yield put(loadTransactionSuccess(arrayConverted));
  } catch (error) {
    Alert.alert('Error!', 'Erro ao consultar o extrato!');
  }
}

export function* insert(data): any {
  try {
    const response = yield call(api.post, '/transaction', {
      operationType: data.payload.operationType,
      localType: data.payload.localType,
      details: data.payload.details,
      dz: data.payload.dz,
    });
    let objectConverted = convertObject(response.data);
    yield put(insertTransactionSuccess(objectConverted));
    yield loadDotz();
  } catch (error) {
    Alert.alert('Error!', 'Erro ao inserir nova transação!');
  }
}
