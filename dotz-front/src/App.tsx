import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import store from './store';
import AppCustomer from './hooks';
import Routes from './routes/index';

const App: React.FC = () => (
  <Provider store={store}>
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#042453" />
      <AppCustomer>
        <View style={{ flex: 1 }}>
          <Routes />
        </View>
      </AppCustomer>
    </NavigationContainer>
  </Provider>
);

export default App;
