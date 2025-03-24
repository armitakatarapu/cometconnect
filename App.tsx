import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import CreateAccountScreen from './CreateAccountScreen';
import CreateUsernamePasswordScreen from './CreateUsernamePasswordScreen'; 
import CreateProfileScreen from './CreateProfileScreen.tsx'; // Import CreateProfileScreen
import { StackParamList } from './types';

const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="CreateUsernamePassword" component={CreateUsernamePasswordScreen} />
        <Stack.Screen name="CreateProfile" component={CreateProfileScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

