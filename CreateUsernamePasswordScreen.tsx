import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './types'; // Ensure your StackParamList includes this screen

type Props = NativeStackScreenProps<StackParamList, 'CreateUsernamePassword'>;

const CreateUsernamePasswordScreen = ({ route, navigation }: Props) => {
  const { email } = route.params; // Get email passed from previous screen
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    console.log('Account Created:', { email, username, password });
    // Add logic to store credentials (Firebase, API, database, etc.)
    navigation.navigate('Home'); // Navigate to home after successful account creation
  };

  return (
    <View style={styles.container}>
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

      {/* Submit Button */}
      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleCreateAccount}
      >
        <Text style={styles.submitButtonText}>Create Account</Text>
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
});

export default CreateUsernamePasswordScreen;
