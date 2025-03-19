import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from './types'; // Import the types for navigation

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      {/* Move the title higher by decreasing marginBottom */}
      <Text style={styles.title}>Join the Community at UTD!</Text>

      {/* Login Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
        <Text style={styles.linkText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Add space between the buttons */}
      <View style={styles.buttonSpacing} />

      {/* Create Account Link */}
      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')} style={styles.link}>
        <Text style={styles.linkText}>CREATE AN ACCOUNT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4E6DF',
    alignItems: 'center',
    justifyContent: 'flex-start',  // Move the content to the top
    paddingTop: 200, // Lower this value to move content higher
  },
  title: {
    fontSize: 30, // Increased font size
    fontWeight: 'bold',
    marginBottom: 20, // Increased marginBottom to move the title higher
    color: 'black',
  },
  link: {
    marginVertical: 15,  // Adds more space between buttons
  },
  linkText: {
    fontSize: 22,  // Increased font size for the buttons
    color: '#CC6D4C',  // Text color for the links (you can customize this)
    fontWeight: 'bold',  // Make text bold for better visibility
  },
  buttonSpacing: {
    marginVertical: 15,  // Adds space between the two links
  },
});

export default HomeScreen;