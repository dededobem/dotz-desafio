import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  flex-direction: row;
  height: 50px;
  align-items: center;
  background: #042453;
`;

export const Title = styled.Text`
  margin-left: 35%;
  color: #fff;
`;

export const Icon = styled(MaterialCommunityIcons)`
  margin-left: 20px;
`;
