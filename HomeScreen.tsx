import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from './types'; // Import the types for navigation

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join the Community as UTD!</Text>
      
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
        color="#CC6D4C"
      />
      
      {/* Create Account Button */}
      <Button
        title="Create an Account"
        onPress={() => navigation.navigate('CreateAccount')} // Navigates to CreateAccountScreen
        color="#4C9CCF" // Choose any color you like
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4E6DF',
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

export default HomeScreen;
