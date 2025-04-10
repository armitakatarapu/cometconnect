import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from './types'; // Correct import
import auth from '@react-native-firebase/auth';


// Define the param list for your navigator
type LoginScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Login'>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Animation for the comet
  const cometAnim = useRef(new Animated.Value(0)).current; // Initial value

  useEffect(() => {
    // Comet animation wooshing in from the top to the middle of the screen
    Animated.timing(cometAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [cometAnim]);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Please enter both username and password.');
      return;
    }
  
    try {
      await auth().signInWithEmailAndPassword(username, password);
      Alert.alert('Logged in successfully!');
      // Optionally navigate to home or profile screen
      navigation.navigate('Home');
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Login failed', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Animated comet */}
      <Animated.View
        style={[
          styles.comet,
          {
            opacity: cometAnim,
            transform: [
              {
                translateY: cometAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.cometText}>🌠</Text>
      </Animated.View>

      {/* Title */}
      <Text style={styles.title}>COMET CONNECT</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="USERNAME"
        placeholderTextColor="#C4E6DF" // Light teal placeholder color
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="PASSWORD"
        placeholderTextColor="#C4E6DF" // Light teal placeholder color
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Create Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Separator Line */}
      <View style={styles.separator} />

      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate('CreateAccount')}
      >
        <Text style={styles.createAccountButtonText}>CREATE AN ACCOUNT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2A3D', // Dark navy background color
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  comet: {
    position: 'absolute',
    top: 50,
    left: '50%',
    transform: [{ translateX: -30 }], // Center comet horizontally
  },
  cometText: {
    fontSize: 100, // Adjust size for comet emoji
    color: '#A15639', // Brownish color for the comet (matches palette)
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#C4E6DF', // Light teal for title text
    letterSpacing: 2,
    textAlign: 'center',
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
  loginButton: {
    width: '50%',
    height: 40,
    borderWidth: 2,
    borderColor: '#CC6D4C',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#CC6D4C', // White text for login button
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    width: '10%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#C4E6DF', // Light teal separator line
    marginVertical: 20,
  },
  createAccountButton: {
    width: '75%',
    height: 40,
    borderWidth: 2,
    borderColor: '#F3D684', 
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountButtonText: {
    color: '#F3D684', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
