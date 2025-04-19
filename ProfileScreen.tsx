import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const profileData = {
  name: 'First Middle Last',
  username: '@username',
  email: 'abc123456@utdallas.edu',
  tags: ['T.A.G.', 'T.A.G.', 'T.A.G.', 'T.A.G.', 'T.A.G.', 'T.A.G.'],
  bio: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
};

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar + Info */}
      <View style={styles.avatarPlaceholder} />
      <Text style={styles.name}>{profileData.name}</Text>
      <Text style={styles.username}>{profileData.username}</Text>
      <Text style={styles.email}>{profileData.email}</Text>

      {/* Divider after email */}
      <View style={styles.divider} />

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {profileData.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Divider after tags */}
      <View style={styles.divider} />

      {/* Bio */}
      <Text style={styles.bio}>{profileData.bio}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#BFD9EA', // Full-screen soft blue background
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
