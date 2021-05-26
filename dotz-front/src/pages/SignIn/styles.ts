import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fbbc21;
  margin-bottom: 15px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #042453;
  border-top-width: 1px;
  border-color: #656868;
  padding: 20px 0 26px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: #fbbc21;
  font-size: 16px;
  margin-left: 14px;
`;
