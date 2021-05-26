import styled from 'styled-components/native';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  background: #042453;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 28px;
  padding-bottom: 20px;
`;

export const InputIcon = styled.View`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: #fff;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput`
  color: black;
  font-size: 16px;
`;

export const Icon = styled(IconMaterial)`
  margin-right: 10px;
`;

export const Result = styled.Text`
  color: #f6a82d;
  font-size: 20px;
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 20px;
`;
