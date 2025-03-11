import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreateAccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account Screen</Text>
      {/* Add form or other components here */}
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

export default CreateAccountScreen;
