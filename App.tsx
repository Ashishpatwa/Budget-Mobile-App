/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 *
 * react native paper-- ui
 * sqlite
 * redux persist
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BudgetEntry from './screens/BudgetEntry';
import ShowItems from './screens/ShowItems';

const Stack = createNativeStackNavigator();
import {Provider} from 'react-redux';
import store, {persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Budget Entry" component={BudgetEntry} />
            <Stack.Screen name="Show Items" component={ShowItems} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
