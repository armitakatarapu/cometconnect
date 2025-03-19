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
      <Text style={styles.title}>Create an Account</Text>

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
          {isAuthenticating ? 'Authenticating...' : 'Submit'}
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
