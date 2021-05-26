import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header';
import { DrawerListMenu } from '../../routes/app.routes';

import { Container, Title, TextCurrentBalanceDz } from './styles';

import * as TransactionActions from '../../store/ducks/transaction/actions';

const Extract: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const tableHead = ['Data', 'O que', 'Onde', 'Detalhes', 'DZ'];
  const widthArr = [80, 90, 60, 140, 50];

  const navigation = useNavigation() as DrawerNavigationProp<DrawerListMenu>;

  const trasactions = useSelector(state => state.transaction.data);
  const currentDotz = useSelector(state => state.dotz.data.currentBalance);

  useEffect(() => {
    dispatch(TransactionActions.loadTransactionRequest());
    setLoading(false);
  }, [dispatch]);

  return (
    <>
      <Header onPress={() => navigation.openDrawer()} />
      <Container>
        <Title>Consultar Extrato</Title>
        {loading ? (
          <ActivityIndicator size="large" color="#042453" />
        ) : (
          <ScrollView horizontal={true} style={{ marginBottom: 20 }}>
            <View>
              <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                <Row
                  data={tableHead}
                  widthArr={widthArr}
                  textStyle={styles.textHead}
                  style={styles.head}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                  {trasactions.map((trasaction, index) => (
                    <Row
                      key={index}
                      data={trasaction}
                      widthArr={widthArr}
                      textStyle={styles.textBody}
                      style={styles.row}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        )}
        <TextCurrentBalanceDz>Saldo dotz: {currentDotz}</TextCurrentBalanceDz>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  head: {
    height: 50,
    backgroundColor: '#f6a82d',
  },
  textHead: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  textBody: {
    fontWeight: '200',
    color: '#042453',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#F7F8FA',
  },
});

export default Extract;
