import React from 'react';
import { AuthCustomer } from './auth';

const AppCustomer: React.FC = ({ children }) => (
  <AuthCustomer>{children}</AuthCustomer>
);

export default AppCustomer;
