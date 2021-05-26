import React, { useCallback, useRef, useState } from 'react';
import { Image, ScrollView, Alert, TextInput } from 'react-native';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../util/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo-dz.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface dataSingUp {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  const handleSignUp = useCallback(async (data: dataSingUp) => {
    try {
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
      await signUp(data);
      setLoading(false);
      formRef.current?.reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        console.log(errors);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Falha na criação do usuário!',
        'Insira seus dados corretamente.',
      );
      setLoading(false);
    }
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled">
        <Container>
          <Image source={logo} />

          <Title>Criar Conta</Title>
          <Form ref={formRef} onSubmit={handleSignUp}>
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
              Cadastrar
            </Button>
          </Form>
        </Container>
      </ScrollView>

      <BackToSignIn onPress={() => navigation.navigate('SignIn')}>
        <Icon name="arrow-left" size={20} color="#fbbc21" />
        <BackToSignInText>Voltar para login</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
