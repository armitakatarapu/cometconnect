import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the param list for your navigator (make sure it includes Login)
type RootStackParamList = {
  Home: undefined;  // Home screen doesn't expect parameters
  Login: undefined;  // Login screen doesn't expect parameters
};

// Type for the navigation prop in LoginScreen
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

// Define the type for the component props, including the navigation prop
type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <Button
        title="Login"
        onPress={() => Alert.alert('Login functionality coming soon!')} // Use Alert instead of alert
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4E6DF', // Background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
});

export default LoginScreen;
