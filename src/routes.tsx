import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import AddDrug from './pages/AddDrug';
import { AddDrugHeader } from './components/AddDrugHeader';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{ headerShown: false }}
      >

        <Stack.Screen 
          name='Home' 
          component={Home}
        />

        <Stack.Screen 
          name='AddDrug'
          component={AddDrug}
          options={{
            headerShown: true,
            header: () => <AddDrugHeader />
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;