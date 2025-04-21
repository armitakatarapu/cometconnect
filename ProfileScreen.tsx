import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const fetchUserData = async () => {
    const user = auth().currentUser;
    const email = user?.email;

    if (!email) return;

    try {
      const doc = await firestore().collection('users').doc(email).get();
      if (doc.exists) {
        setProfileData(doc.data());
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleImageChange = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });

      if (!image.path) return;

      setUploading(true);
      const email = auth().currentUser?.email;
      const ref = storage().ref(`profile_pics/${email}`);
      await ref.putFile(image.path);
      const downloadUrl = await ref.getDownloadURL();

      await firestore().collection('users').doc(email!).update({
        profilePicUrl: downloadUrl,
      });

      setProfileData({ ...profileData, profilePicUrl: downloadUrl });
      setUploading(false);
      Alert.alert('Profile picture updated!');
    } catch (error) {
      console.error('Error updating profile picture:', error);
      Alert.alert('Failed to update profile picture');
      setUploading(false);
    }
  };

  const handleImageRemove = () => {
    Alert.alert(
      'Remove Photo',
      'Are you sure you want to delete your profile picture?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const email = auth().currentUser?.email;
              const ref = storage().ref(`profile_pics/${email}`);
              await ref.delete();

              await firestore().collection('users').doc(email!).update({
                profilePicUrl: '',
              });

              setProfileData({ ...profileData, profilePicUrl: '' });
              Alert.alert('Profile picture removed.');
            } catch (error) {
              console.error('Error removing profile picture:', error);
              Alert.alert('Failed to remove profile picture');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#333' }}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handleImageChange}>
        {profileData.profilePicUrl ? (
          <Image source={{ uri: profileData.profilePicUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        )}
      </TouchableOpacity>
      {profileData.profilePicUrl ? (
        <TouchableOpacity onPress={handleImageRemove}>
          <Text style={styles.editText}>Remove Photo</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.editText}>Upload Photo</Text>
      )}

      <Text style={styles.name}>
        {profileData.firstName} {profileData.middleName} {profileData.lastName}
      </Text>
      <Text style={styles.username}>@{profileData.username}</Text>
      <Text style={styles.email}>{profileData.email}</Text>

      <View style={styles.divider} />

      <View style={styles.tagsContainer}>
        {profileData.tags?.map((tag: string, index: number) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <Text style={styles.bio}>{profileData.bio}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#BFD9EA',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 5,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#8BA6C1',
    marginBottom: 10,
  },
  editText: {
    color: '#6DBDCB',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
    marginBottom: 10,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#999',
    marginVertical: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  tag: {
    backgroundColor: '#D6EAF8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    margin: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#333',
  },
  bio: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default ProfileScreen;