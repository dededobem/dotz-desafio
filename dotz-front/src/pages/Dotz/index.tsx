import React, { useRef, useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import getValidationErrors from '../../util/getValidationErrors';
import { DrawerListMenu } from '../../routes/app.routes';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Title } from './styles';
import * as DotzActions from '../../store/ducks/dotz/actions';

const Dotz: React.FC = () => {
  const navigation = useNavigation() as DrawerNavigationProp<DrawerListMenu>;
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChangeValue = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          dz: Yup.number().required('Necessário inserir valor do dotz.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);
        Promise.resolve(
          dispatch(DotzActions.updateCurrenceBalanceRequest(data.dz)),
        ).then(() => {
          formRef.current?.reset();
          setLoading(false);
          Alert.alert(
            'Inserir Dotz',
            'Dotz inserido com sucesso!',
            [{ text: 'Ok', onPress: () => navigation.navigate('Home') }],
            { cancelable: false },
          );
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          console.log(errors);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Falha ao inserir valor do DZ!',
          'Ocorreu um erro, verifique o valor informado.',
        );
        setLoading(false);
      }
    },
    [navigation],
  );

  return (
    <>
      <Header onPress={() => navigation.openDrawer()} />
      <Container>
        <Title>Inserir Dotz</Title>
        <Form ref={formRef} onSubmit={handleChangeValue}>
          <Input
            name="dz"
            icon="edit"
            placeholder="Inserir valor em dotz"
            keyboardType="numeric"
          />
          <Button
            loading={loading}
            onPress={() => {
              formRef.current?.submitForm();
            }}>
            Inserir
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Dotz;
