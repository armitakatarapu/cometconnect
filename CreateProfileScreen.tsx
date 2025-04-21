import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './types';
import firestore from '@react-native-firebase/firestore';

type Props = NativeStackScreenProps<StackParamList, 'CreateProfile'>;

const CreateProfileScreen = ({ route, navigation }: Props) => {
  const { email, username } = route.params;

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronoun, setPronoun] = useState('');
  const [bio, setBio] = useState('');
  const [bioLength, setBioLength] = useState(0);
  const [message, setMessage] = useState('');

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleBioChange = (text: string) => {
    if (text.length <= 70) {
      setBio(text);
      setBioLength(text.length);
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFinish = async () => {
    if (!firstName || !lastName || !pronoun) {
      setMessage('Please fill out all required fields.');
      return;
    }

    try {
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
          <View style={styles.tagInputContainer}>
            <TextInput
              style={styles.tagTextInput}
              placeholder="Add a tag..."
              value={tagInput}
              onChangeText={setTagInput}
              onSubmitEditing={handleAddTag}
              returnKeyType="done"
            />
            <FlatList
              data={tags}
              horizontal
              keyExtractor={(item) => item}
              contentContainerStyle={styles.tagsList}
              renderItem={({ item }) => (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item}</Text>
                  <TouchableOpacity onPress={() => handleRemoveTag(item)}>
                    <Text style={styles.removeTag}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
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

  // --- Tags Styling ---
  tagInputContainer: {
    backgroundColor: '#316489',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 10,
  },
  tagTextInput: {
    height: 40,
    color: 'white',
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3D684',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: 'black',
    marginRight: 5,
    fontWeight: '600',
  },
  removeTag: {
    color: 'black',
    fontWeight: 'bold',
  },

  // --- Bio & Button ---
  bioInput: {
    backgroundColor: '#316489',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
  },
  bioCount: { color: '#C4E6DF', marginBottom: 15, textAlign: 'right' },
  button: { backgroundColor: '#F3D684', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: 'black', fontSize: 18, fontWeight: 'bold' },
  message: { color: '#F3D684', fontSize: 16, textAlign: 'center', marginTop: 20 },
});

export default CreateProfileScreen;
