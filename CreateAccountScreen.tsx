import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from './types'; // Ensure this contains the correct types
import { useNavigation } from '@react-navigation/native';

// Define prop type for navigation
type CreateAccountScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'CreateAccount'>;

const CreateAccountScreen = () => {
  const navigation = useNavigation<CreateAccountScreenNavigationProp>(); // Use navigation hook

  const [email, setEmail] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);

  const handleEmailSubmit = () => {
    setIsAuthenticating(true);
    setIsEmailValid(null); // Reset validation state

    // Simulating an email check
    setTimeout(() => {
      if (email.endsWith('@utdallas.edu')) {
        setIsEmailValid(true);
        Alert.alert('Success', 'UTD email verified! Proceeding to next step.');

        // Navigate to the username & password creation screen, passing the email
        navigation.navigate('CreateUsernamePassword', { email });
      } else {
        setIsEmailValid(false);
        Alert.alert('Error', 'Please enter a valid UTD email.');
      }
      setIsAuthenticating(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Comet Connect Title */}
      <Text style={styles.appTitle}>COMET CONNECT</Text>

      {/* Create Account Title */}
      <Text style={styles.title}>Welcome, Comet!</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your UTD email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Button */}
      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleEmailSubmit} 
        disabled={isAuthenticating}
      >
        <Text style={styles.submitButtonText}>
          {isAuthenticating ? 'Authenticating...' : 'AUTHENTICATE'}
        </Text>
      </TouchableOpacity>

      {isAuthenticating && <Text style={styles.loadingText}>Authenticating...</Text>}
      {isEmailValid === false && <Text style={styles.errorText}>Invalid UTD email.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2A3D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C4E6DF', 
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F3D684',
  },
  input: {
    width: '75%',  // Keep the same width
    height: 30,    // Keep the skinniness
    backgroundColor: '#CC6D4C', // Dark teal background for input boxes
    borderRadius: 3,  // Less rounded edges
    paddingLeft: 15,
    paddingTop: 5,    // Add some padding to the top for text visibility
    paddingBottom: 5, // Add some padding to the bottom for text visibility
    marginBottom: 15,
    color: '#C4E6DF', // Light teal text color inside inputs
    fontSize: 16,
  },
  submitButton: {
    width: '50%',
    height: 40,
    borderWidth: 2,
    borderColor: '#F3D684', 
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#F3D684', 
    fontSize: 18,
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
