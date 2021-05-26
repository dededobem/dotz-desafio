import { action } from 'typesafe-actions';
import { DotzTypes, Dotz } from './types';

export const loadCurrenceBalanceRequest = () =>
  action(DotzTypes.LOAD_CURRENCE_BALANCE_REQUEST);

export const loadCurrenceBalanceSuccess = (data: Dotz) =>
  action(DotzTypes.LOAD_CURRENCE_BALANCE_SUCCESS, { data });

export const updateCurrenceBalanceRequest = (value: number) =>
  action(DotzTypes.UPDATE_CURRENCE_BALANCE_REQUEST, value);

export const updateCurrenceBalanceSuccess = (data: Dotz) =>
  action(DotzTypes.UPDATE_CURRENCE_BALANCE_SUCCESS, { data });
