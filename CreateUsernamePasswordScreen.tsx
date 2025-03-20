import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './types';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have @expo/vector-icons installed

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
      <Text style={styles.appTitle}>Comet Connect</Text>
      <Text style={styles.title}>Set Up Your Account</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Choose a username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter a password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Re-enter Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Re-enter password"
        secureTextEntry
        value={reEnterPassword}
        onChangeText={setReEnterPassword}
      />

      {/* Error Message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Arrow Button to Move to Next Screen */}
      <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
        <Ionicons name="arrow-forward-circle" size={50} color="#4CAF50" />
      </TouchableOpacity>
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
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  arrowButton: {
    marginTop: 20,
  },
});

export default CreateUsernamePasswordScreen;
