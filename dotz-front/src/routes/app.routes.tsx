import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from '../components/Menu';

import Home from '../pages/Home';
import Dotz from '../pages/Dotz';
import Extract from '../pages/Extract';
import Transaction from '../pages/Transaction';
import Conversion from '../pages/Conversion';

export type DrawerListMenu = {
  Home: undefined;
  Dotz: undefined;
  Extract: undefined;
  Transaction: undefined;
  Conversion: undefined;
};

const AppDrawer = createDrawerNavigator<DrawerListMenu>();

const DrawerNavigation: React.FC = () => (
  <AppDrawer.Navigator
    screenOptions={{
      headerShown: false,
    }}
    drawerContent={props => <DrawerContent {...props} />}
    drawerStyle={{ width: '80%' }}>
    <AppDrawer.Screen name="Home" component={Home} />
    <AppDrawer.Screen name="Dotz" component={Dotz} />
    <AppDrawer.Screen name="Extract" component={Extract} />
    <AppDrawer.Screen name="Transaction" component={Transaction} />
    <AppDrawer.Screen name="Conversion" component={Conversion} />
  </AppDrawer.Navigator>
);

export default DrawerNavigation;
