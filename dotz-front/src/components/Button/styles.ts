import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  max-width: 100%;
  height: 50px;
  background: #fbbc21;
  margin-top: 8px;
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #312e38;
  font-size: 18px;
  font-weight: bold;
`;
