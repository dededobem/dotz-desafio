import { Reducer } from 'redux';
import { TransactionState, TransactionTypes } from './types';

const INITIAL_STATE: TransactionState = {
  data: [{ operationType: 0, localType: '', details: '', dz: 0 }],
  loading: false,
};

const reducer: Reducer<TransactionState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TransactionTypes.LOAD_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case TransactionTypes.LOAD_TRANSACTION_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };
    case TransactionTypes.INSERT_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case TransactionTypes.INSERT_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data],
      };
    default:
      return state;
  }
};

export default reducer;
