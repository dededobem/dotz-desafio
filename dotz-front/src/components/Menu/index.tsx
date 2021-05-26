import React from 'react';
import { View } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import { useAuth } from '../../hooks/auth';
import MenuItem from '../MenuItem';

import {
  Container,
  NameUser,
  TitleUser,
  Body,
  Footer,
  Logo,
  HeaderBody,
} from './styles';

const DrawerContent = (
  props: DrawerContentComponentProps,
): React.ReactElement => {
  const { user, signOut } = useAuth();
  const dotzCurrenceBalance = useSelector(
    state => state.dotz.data.currentBalance,
  );
  const menuItems = [
    {
      label: 'Painel',
      route: 'Home',
      icon: 'home',
    },
    {
      label: 'Extrato',
      route: 'Extract',
      icon: 'view-list',
    },
    {
      label: 'Dotz',
      route: 'Dotz',
      icon: 'alpha-d-circle',
    },
    {
      label: 'Transações',
      route: 'Transaction',
      icon: 'bank-transfer',
    },
    {
      label: 'Conversões',
      route: 'Conversion',
      icon: 'swap-horizontal-circle',
    },
  ];

  return (
    <Container>
      <Body>
        <HeaderBody>
          <View>
            <Logo size={50} name="account-circle" />
          </View>
          <NameUser>Olá, {user.email}</NameUser>
          <TitleUser>Saldo Dz: {dotzCurrenceBalance}</TitleUser>
        </HeaderBody>
        {menuItems.map(item => (
          <MenuItem
            stack={props}
            key={item.route}
            icon={item.icon}
            routeName={item.route}
            label={item.label}
          />
        ))}
      </Body>
      <Footer>
        <MenuItem
          stack={props}
          onPress={() => signOut()}
          icon="power"
          label="Sair"
        />
      </Footer>
    </Container>
  );
};

export default DrawerContent;
