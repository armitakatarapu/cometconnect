import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from './types';  // Import the correct StackParamList type

// Type the navigation prop
type CreateAccountScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'CreateAccount'>;

type CreateAccountScreenProps = {
  navigation: CreateAccountScreenNavigationProp;
};

const CreateAccountScreen = ({ navigation }: CreateAccountScreenProps) => {
  const [email, setEmail] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);  // Fixed type here

  const handleEmailSubmit = () => {
    setIsAuthenticating(true);
    setIsEmailValid(null); // Reset the validity before checking

    // Simulate an email check (replace with real email validation logic)
    setTimeout(() => {
      if (email.endsWith('@utdallas.edu')) {
        setIsEmailValid(true);
        Alert.alert('Success', 'UTD email verified! Proceeding to create username and password.');
        navigation.navigate('CreateUsernamePassword'); // Navigate to next screen
      } else {
        setIsEmailValid(false);
        Alert.alert('Error', 'Please enter a valid UTD email.');
      }
      setIsAuthenticating(false);
    }, 2000); // Simulating a 2-second delay for authentication
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Button to submit the email */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleEmailSubmit}
        disabled={isAuthenticating}
      >
        <Text style={styles.submitButtonText}>
          {isAuthenticating ? 'Authenticating...' : 'Submit'}
        </Text>
      </TouchableOpacity>

      {/* Show message if email is being authenticated */}
      {isAuthenticating && <Text style={styles.loadingText}>Authenticating...</Text>}

      {/* Show result of email validation */}
      {isEmailValid === false && <Text style={styles.errorText}>Invalid UTD email.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4E6DF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  submitButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: '#888',
  },
  errorText: {
    fontSize: 16,
    marginTop: 10,
    color: 'red',
  },
});

export default CreateAccountScreen;
