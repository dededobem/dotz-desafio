import React from 'react';

import { Container, Icon } from './styles';

interface HeaderProps {
  onPress(): void;
}

const Header: React.FC<HeaderProps> = ({ onPress }) => {
  return (
    <Container>
      <Icon size={25} name="menu" onPress={onPress} color="#fff" />
    </Container>
  );
};

export default Header;
