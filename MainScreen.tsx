import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ProfileScreen from './ProfileScreen';
import ChatScreen from './ChatScreen';
import SearchScreen from './SearchScreen';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#1A2A3D' },
        tabBarActiveTintColor: '#F3D684',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="search" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profiles"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="people" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="chatbubble" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;

