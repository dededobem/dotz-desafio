import React, { useCallback, useRef, useState } from 'react';
import { Alert, Image, ScrollView, TextInput } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../util/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo-dz.png';

import {
  Container,
  Title,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

interface SignInCredentials {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInCredentials) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Insira um e-mail válido.'),
          password: Yup.string().min(
            6,
            'Senha deve possuir pelo menos 6 dígitos.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);
        await signIn(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          console.log(errors);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Falha na autenticação!',
          'Ocorreu um erro, cheque suas credenciais.',
        );
        setLoading(false);
      }
    },
    [signIn],
  );

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled">
        <Container>
          <Image source={logo} />

          <Title>Fazer Login</Title>
          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              name="email"
              icon="mail"
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
            <Button
              loading={loading}
              onPress={() => {
                formRef.current?.submitForm();
              }}>
              Entrar
            </Button>
          </Form>
        </Container>
      </ScrollView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#fbbc21" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
