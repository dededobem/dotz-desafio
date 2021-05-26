import { Reducer } from 'redux';
import { DotzState, DotzTypes } from './types';

const INITIAL_STATE: DotzState = {
  data: { currentBalance: 0, currentBalanceReal: 0 },
  loading: false,
};

const reducer: Reducer<DotzState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DotzTypes.LOAD_CURRENCE_BALANCE_REQUEST:
      return { ...state, loading: true };
    case DotzTypes.LOAD_CURRENCE_BALANCE_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };
    case DotzTypes.UPDATE_CURRENCE_BALANCE_REQUEST:
      return { ...state, loading: true };
    case DotzTypes.UPDATE_CURRENCE_BALANCE_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };
    default:
      return state;
  }
};

export default reducer;
