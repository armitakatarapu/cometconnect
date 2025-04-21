import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './types';
import firestore from '@react-native-firebase/firestore';



type Props = NativeStackScreenProps<StackParamList, 'CreateProfile'>;

const CreateProfileScreen = ({ route, navigation }: Props) => {
  const { email, username } = route.params; // Receive parameters
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronoun, setPronoun] = useState('');
  const [tags, setTags] = useState('');
  const [bio, setBio] = useState('');
  const [bioLength, setBioLength] = useState(0);
  const [message, setMessage] = useState('');

  const handleBioChange = (text: string) => {
    if (text.length <= 70) {
      setBio(text);
      setBioLength(text.length);
    }
  };

  const handleFinish = async () => {
    if (!firstName || !lastName || !pronoun) {
      setMessage('Please fill out all required fields.');
      return;
    }
  
    try {
      // Store user profile info in Firestore
      await firestore()
        .collection('users')
        .doc(email)
        .set({
          username,
          email,
          firstName,
          middleName,
          lastName,
          pronoun,
          tags,
          bio,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
  
      setMessage("You're all set! Start chatting...");
  
      // Navigate to main app screen
      navigation.replace('MainScreen', {
        username,
        email,
        tags,
        bio,
      });
    } catch (error) {
      console.error('Error saving user profile:', error);
      setMessage('Failed to save your profile. Please try again.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />

      <Text style={styles.label}>Middle Name</Text>
      <TextInput style={styles.input} placeholder="Middle Name" value={middleName} onChangeText={setMiddleName} />

      <Text style={styles.label}>Last Name</Text>
      <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Pronouns</Text>
          <Picker selectedValue={pronoun} onValueChange={setPronoun} style={styles.picker}>
            <Picker.Item label="Select Pronoun" value="" />
            <Picker.Item label="He/Him" value="he/him" />
            <Picker.Item label="She/Her" value="she/her" />
            <Picker.Item label="They/Them" value="they/them" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Tags</Text>
          <TextInput
            style={styles.tagsInput}
            placeholder="Add Tags (e.g., developer, student)"
            value={tags}
            onChangeText={setTags}
          />
        </View>
      </View>

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={styles.bioInput}
        placeholder="Write your bio..."
        multiline
        value={bio}
        onChangeText={handleBioChange}
      />
      <Text style={styles.bioCount}>{bioLength}/70</Text>

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>LET'S GO!</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#316489' },
  label: { fontSize: 16, fontWeight: '600', color: '#6DBDCB', marginBottom: 5 },
  input: { backgroundColor: '#CC6D4C', padding: 10, marginBottom: 15, borderRadius: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  halfWidth: { width: '48%' },
  picker: { backgroundColor: '#CC6D4C', marginBottom: 10 },
  tagsInput: {
    backgroundColor: '#316489',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    height: 60,
    borderWidth: 2, // Black border added
    borderColor: 'black',
  },
  bioInput: {
    backgroundColor: '#316489',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    height: 100,
    borderWidth: 2, // Black border added
    borderColor: 'black',
  },
  bioCount: { color: '#C4E6DF', marginBottom: 15, textAlign: 'right' },
  button: { backgroundColor: '#F3D684', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: 'black', fontSize: 18, fontWeight: 'bold' },
  message: { color: '#F3D684', fontSize: 16, textAlign: 'center', marginTop: 20 },
});

export default CreateProfileScreen;

