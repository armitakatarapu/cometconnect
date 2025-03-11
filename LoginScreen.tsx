import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from './types'; // Correct import

// Define the param list for your navigator
type LoginScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Login'>;

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
