import { action } from 'typesafe-actions';
import { TransactionTypes, Transaction } from './types';

export const loadTransactionRequest = () =>
  action(TransactionTypes.LOAD_TRANSACTION_REQUEST);

export const loadTransactionSuccess = (data: Transaction[]) =>
  action(TransactionTypes.LOAD_TRANSACTION_SUCCESS, { data });

export const insertTransactionRequest = (data: Transaction) =>
  action(TransactionTypes.INSERT_TRANSACTION_REQUEST, data);

export const insertTransactionSuccess = (data: Transaction) =>
  action(TransactionTypes.INSERT_TRANSACTION_SUCCESS, { data });
