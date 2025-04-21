import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
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
      <View style={styles.avatarPlaceholder} />
      <Text style={styles.name}>
        {profileData.firstName} {profileData.middleName} {profileData.lastName}
      </Text>
      <Text style={styles.username}>@{profileData.username}</Text>
      <Text style={styles.email}>{profileData.email}</Text>

      <View style={styles.divider} />

      <View style={styles.tagsContainer}>
        {profileData.tags?.split(',').map((tag: string, index: number) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag.trim()}</Text>
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
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#8BA6C1',
    marginBottom: 10,
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
