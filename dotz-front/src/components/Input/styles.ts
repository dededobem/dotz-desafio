import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: #fff;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border-style: solid;

  ${props =>
    props.isErrored &&
    css`
      border-width: 3px;
      border-color: #c53030;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: black;
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 10px;
`;
