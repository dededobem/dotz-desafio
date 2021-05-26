import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NumberFormat from 'react-number-format';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header';
import { Container, Title, TitleCard, TextValue, CardBalance } from './styles';
import { DrawerListMenu } from '../../routes/app.routes';
import * as DotzActions from '../../store/ducks/dotz/actions';
import * as TransactionActions from '../../store/ducks/transaction/actions';

const Home: React.FC = () => {
  const navigation = useNavigation() as DrawerNavigationProp<DrawerListMenu>;
  const dispatch = useDispatch();
  const dotz = useSelector(state => state.dotz.data);
  const loading = useSelector(state => state.dotz.data.loading);

  useEffect(() => {
    dispatch(DotzActions.loadCurrenceBalanceRequest());
    dispatch(TransactionActions.loadTransactionRequest());
  }, []);

  return (
    <>
      <Header onPress={() => navigation.openDrawer()} />
      <Container>
        <Title>Saldo Atual</Title>
        <CardBalance>
          <TitleCard>Saldo em DZ</TitleCard>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#fff"
              style={{ marginTop: 18, alignItems: 'flex-start' }}
            />
          ) : (
            <TextValue>{dotz.currentBalance}</TextValue>
          )}
        </CardBalance>
        <CardBalance>
          <TitleCard>Saldo em Real</TitleCard>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#fff"
              style={{ marginTop: 18, alignItems: 'flex-start' }}
            />
          ) : (
            <NumberFormat
              value={dotz.currentBalanceReal}
              displayType={'text'}
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale={true}
              thousandSeparator="."
              prefix={'R$ '}
              renderText={formattedValue => (
                <TextValue>{formattedValue}</TextValue>
              )}
            />
          )}
        </CardBalance>
      </Container>
    </>
  );
};

export default Home;
