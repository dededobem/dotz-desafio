import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { Container, Title, Input, Icon, InputIcon, Result } from './styles';
import { DrawerListMenu } from '../../routes/app.routes';
import Header from '../../components/Header';

import api from '../../services/api';

const Conversion: React.FC = () => {
  const navigation = useNavigation() as DrawerNavigationProp<DrawerListMenu>;
  const [dz, setDz] = useState(0);
  const [real, setReal] = useState(0);

  const handleConversionDz = async (valueConvert: any) => {
    console.log(valueConvert);
    await api
      .get('/Conversion/dz-to-real', {
        params: {
          value: Number(valueConvert),
        },
      })
      .then(response => {
        setReal(response.data.toString());
      });
  };

  const handleConversionReal = async (value: any) => {
    console.log(value);
    await api
      .get('/Conversion/real-to-dz', {
        params: {
          value: Number(value),
        },
      })
      .then(response => {
        setDz(response.data.toString());
      });
  };

  return (
    <>
      <Header onPress={() => navigation.openDrawer()} />
      <Container>
        <Title>Conversão de Dotz</Title>
        <InputIcon>
          <Icon name="alpha-d-circle" color="#656868" size={25} />
          <Input
            placeholder="Valor em DZ"
            keyboardType="numeric"
            placeholderTextColor="#656868"
            onChangeText={handleConversionDz}
          />
        </InputIcon>
        <Result>Valor em Real: {real}</Result>
        <InputIcon>
          <Icon name="cash" color="#656868" size={25} />
          <Input
            placeholder="Valor em Real"
            keyboardType="numeric"
            placeholderTextColor="#656868"
            onChangeText={handleConversionReal}
          />
        </InputIcon>
        <Result>Valor em Dotz: {dz}</Result>
      </Container>
    </>
  );
};

export default Conversion;
