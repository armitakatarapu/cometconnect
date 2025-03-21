import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './types';

type Props = NativeStackScreenProps<StackParamList, 'CreateUsernamePassword'>;

const CreateUsernamePasswordScreen = ({ route, navigation }: Props) => {
  const { email } = route.params;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Password Validation Function
  const validatePassword = (password: string) => {
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 8 && hasNumber && hasSpecialChar;
  };

  // Handle navigation only if all validation passes
  const handleNext = () => {
    if (!validatePassword(password)) {
      setErrorMessage('Password must be 8+ characters, with 1 number & 1 special character.');
      return;
    }
    if (password !== reEnterPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setErrorMessage('');
    
    // Navigate to profile creation
    navigation.navigate('CreateProfile', { email, username });
  };

  return (
    <View style={styles.container}>
      {/* Username Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Choose a username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <Text style={styles.characterCount}>{username.length}/60</Text>
        <Text style={styles.inputLabel}>Username</Text>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.inputLabel}>Password</Text>

        {/* Bullet Points for Password Requirements */}
        <View style={styles.passwordRequirements}>
          <Text style={styles.bulletPoint}>• 8 characters minimum</Text>
          <Text style={styles.bulletPoint}>• 1 special character</Text>
          <Text style={styles.bulletPoint}>• 1 number</Text>
        </View>
      </View>

      {/* Re-enter Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Re-enter password"
          secureTextEntry
          value={reEnterPassword}
          onChangeText={setReEnterPassword}
        />
        <Text style={styles.inputLabel}>Re-enter Password</Text>
      </View>

      {/* Error Message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Regular TouchableOpacity for navigation */}
      <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
        <Text style={styles.arrowText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#316489', // Background color
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100, // Increased margin to push everything down
  },
  inputContainer: {
    width: '80%',
    position: 'relative',
    marginBottom: 40, // Adds space between the input fields
    backgroundColor: '#316489', // Ensure background color matches the overall container
  },
  input: {
    width: '100%',
    height: 40, // Increased height for better visibility
    backgroundColor: '#CC6D4C', // Input box color
    borderRadius: 3,
    paddingLeft: 10,
    fontSize: 18, // Increased font size for better readability
    paddingRight: 40,
    paddingTop: 0, // Ensuring no padding on top to avoid the white space issue
  },
  characterCount: {
    position: 'absolute',
    right: 10,
    top: 12, // Adjusted position to be closer to the input box
    color: '#888',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputLabel: {
    textAlign: 'left',
    marginTop: 5, // Adjusted margin to bring it closer to the input box
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6DBDCB', // Label color
  },
  passwordRequirements: {
    marginTop: 10,
    marginLeft: 10,
    color: '#6DBDCB',
  },
  bulletPoint: {
    color: '#6DBDCB', // Light teal color for text
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  arrowButton: {
    marginTop: 30, // Increased top margin for spacing between the form and button
    padding: 10,
    backgroundColor: '#4CAF50', // Button color
    borderRadius: 5,
  },
  arrowText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CreateUsernamePasswordScreen;
