import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Import Navigation Container
import { createNativeStackNavigator } from '@react-navigation/native-stack';  // Import Stack Navigator
import HomeScreen from './HomeScreen.tsx'; // Import HomeScreen component
import LoginScreen from './LoginScreen.tsx'; // Import LoginScreen component

// Create the stack navigator, which will manage navigation between screens
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // Wrap the entire app with NavigationContainer
    <NavigationContainer>
      <Stack.Navigator>
        {/* Define the Home screen */}
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Define the Login screen */}
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
