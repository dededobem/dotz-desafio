export enum TransactionTypes {
  LOAD_TRANSACTION_REQUEST = '@transaction/LOAD_TRANSACTION_REQUEST',
  LOAD_TRANSACTION_SUCCESS = '@transaction/LOAD_TRANSACTION_SUCCESS',
  INSERT_TRANSACTION_REQUEST = '@transaction/INSERT_TRANSACTION_REQUEST',
  INSERT_TRANSACTION_SUCCESS = '@transaction/INSERT_TRANSACTION_SUCCESS',
}

export interface Transaction {
  operationType: number;
  localType: string;
  details: string;
  dz: number;
}

export interface TransactionState {
  readonly data: Transaction[];
  readonly loading: boolean;
}
