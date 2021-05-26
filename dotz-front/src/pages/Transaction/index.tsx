import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import getValidationErrors from '../../util/getValidationErrors';
import { Container, Title } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';

import { DrawerListMenu } from '../../routes/app.routes';
import * as TransactionAction from '../../store/ducks/transaction/actions';

enum OperationType {
  EXPIRACAO = 'Expiração',
  CREDITO = 'Crédito',
  DEBITO = 'Débito',
  TROCA = 'Troca',
}

interface dataTrasaction {
  operationType: number;
  localType: string;
  details: string;
  dz: number;
}

const Transaction: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const navigationDrawer =
    useNavigation() as DrawerNavigationProp<DrawerListMenu>;

  const [valueChanged, setValueChanged] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: OperationType.EXPIRACAO, value: 0 },
    { label: OperationType.CREDITO, value: 1 },
    { label: OperationType.DEBITO, value: 2 },
    { label: OperationType.TROCA, value: 3 },
  ]);

  useEffect(() => {
    dispatch(TransactionAction.loadTransactionRequest());
  }, []);

  const handleTransaction = useCallback(
    async (data: dataTrasaction) => {
      try {
        const schema = Yup.object().shape({
          localType: Yup.string().required('Campo obrigatório'),
          details: Yup.string().required('Campo obrigatório'),
          dz: Yup.number().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);
        data.operationType = valueChanged;
        Promise.resolve(
          dispatch(TransactionAction.insertTransactionRequest(data)),
        ).then(() => {
          formRef.current?.reset();
          setLoading(false);
          Alert.alert('Transação', 'Simulação realizada com sucesso!');
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
      }
    },
    [valueChanged],
  );

  return (
    <>
      <Header onPress={() => navigationDrawer.openDrawer()} />
      <Container>
        <Title>Simular Transação</Title>
        <Form ref={formRef} onSubmit={handleTransaction}>
          <DropDownPicker
            placeholder="Selecionar Tipo de Transação"
            placeholderStyle={{ color: '#656868', fontSize: 16 }}
            open={open}
            value={value}
            onChangeValue={() => setValueChanged(value)}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{ borderRadius: 0, marginBottom: 8, height: 50 }}
          />
          <Input name="localType" icon="edit" placeholder="Onde" />
          <Input name="details" icon="edit" placeholder="Detalhes" />
          <Input
            name="dz"
            icon="edit"
            placeholder="Valor Dotz"
            keyboardType="numeric"
          />
          <Button
            loading={loading}
            onPress={() => {
              formRef.current?.submitForm();
            }}>
            Simular
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Transaction;
