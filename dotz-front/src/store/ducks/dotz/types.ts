export enum DotzTypes {
  LOAD_CURRENCE_BALANCE_REQUEST = '@dotz/LOAD_CURRENCE_BALANCE_REQUEST',
  LOAD_CURRENCE_BALANCE_SUCCESS = '@dotz/LOAD_CURRENCE_BALANCE_SUCCESS',
  UPDATE_CURRENCE_BALANCE_REQUEST = '@dotz/UPDATE_CURRENCE_BALANCE_REQUEST',
  UPDATE_CURRENCE_BALANCE_SUCCESS = '@dotz/UPDATE_CURRENCE_BALANCE_SUCCESS',
}

export interface Dotz {
  currentBalance: number;
  currentBalanceReal: number;
}

export interface DotzState {
  readonly data: Dotz;
  readonly loading: boolean;
}
