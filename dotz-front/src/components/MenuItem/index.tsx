import React, { useCallback, useMemo } from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { CustomText, Container, IconMenu } from './styles';

interface MenuItemProps {
  routeName?: string;
  icon: string;
  label: string;
  onPress?(): void;
  stack: DrawerContentComponentProps;
}

const MenuItem: React.FC<MenuItemProps> = ({
  routeName,
  icon,
  label,
  onPress,
  stack,
}) => {
  const activeRouteName = useMemo(() => {
    if (!routeName) {
      return '';
    }

    return stack.state.routeNames[Number(stack.state.index)];
  }, [stack, routeName]);

  const isActive = useMemo(() => {
    return activeRouteName === routeName;
  }, [activeRouteName, routeName]);

  const navigationToPage = useCallback(() => {
    if (onPress) {
      onPress();
    } else if (routeName) {
      stack.navigation.navigate(routeName);
    }
  }, [stack, routeName, onPress]);
  return (
    <Container key={routeName} isActive={isActive} onPress={navigationToPage}>
      <IconMenu
        name={icon}
        size={24}
        color={isActive ? '#f6a82d' : '#042453'}
      />
      <CustomText isActive={isActive}>{label}</CustomText>
    </Container>
  );
};

export default MenuItem;
