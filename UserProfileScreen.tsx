import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from './types'; // Import the types for navigation

type UserProfileScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'UserProfile'>;

type Props = {
  navigation: UserProfileScreenNavigationProp;
};

const UserProfileScreen = ({ navigation }: Props) => {
  return (

    <View style={styles.container}>
      
      {/* User Profile Image */}
      {<Image style={styles.image}/>}

      {/* Name */}
      {<Text style={styles.name}>John Smith Adams</Text> }

      {/* Username */}
      {<Text style={styles.userLinks}>@username</Text>}

      {/* Email */}
      {<Text style={styles.userLinks}>abc123456@utdallas.edu</Text>}

      {/* Divider*/}
      <View style={styles.divider}/>

      {/* Tags*/}
      {<View style={styles.tagContainer}>

          {/* example tags */}
          {<Text style={styles.tag}>year</Text>}
          {<Text style={styles.tag}>major</Text>}
          {<Text style={styles.tag}>on campus</Text>}
          {<Text style={styles.tag}>in-state</Text>}
          {<Text style={styles.tag}>plano, texas</Text>}
          
          {<Text style={styles.addTagButton}>+</Text>}
        
        </View>}

      {/* Divider*/}
      <View style={styles.divider}/>

      {<Text style={styles.bio}>This is my bio!</Text>}

    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 5,
  },
  tag: {
    backgroundColor: '#C4E6DF',
    borderRadius: 7,
    marginBlock: 5,
    marginHorizontal: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderColor: '#1A2A3D',
    borderWidth: 2,
    color: '#1A2A3D',
    fontSize: 14,
    fontWeight: 600
  },
  addTagButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: '#CC5D4C',
    borderWidth: 2,
    fontSize: 19,
    fontWeight: '500',
    color: '#CC5D4C',
    marginBlock: 5,
    marginHorizontal: 5,
    paddingHorizontal: 8
  },
  image: {
    justifyContent: "center",
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15
  },
  divider: {
    height: 1,
    width: 380,
    backgroundColor: '#577877',
    margin: 15,
  },
  userLinks: {
    fontSize: 22,
    color: '#316489',
    alignContent: 'center',
    fontWeight: '500',
  },
  bio: {
    fontSize: 20,
    color: 'black',
    fontWeight: 400,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    fontSize: 22,
    backgroundColor: 'off-white',
    alignItems: 'center',
    justifyContent: 'flex-start',  // Move the content to the top
    paddingTop: 30, // Lower this value to move content higher
    
  },
  name: {
    fontSize: 30, // Increased font size
    fontWeight: '800',
    color: 'black',
  },
});

export default UserProfileScreen;