import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the param list for your navigator
type RootStackParamList = {
  Home: undefined;  // Home screen doesn't expect parameters
  Login: undefined;  // Login screen doesn't expect parameters
};

// Type for the navigation prop
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Define the type for the component props, including the navigation prop
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join the Community as UTD!</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')} // This will navigate to the Login screen
        color="#CC6D4C" // Button color
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4E6DF',  // Background color
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
