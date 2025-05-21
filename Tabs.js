// Tabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import SearchScreen from './screens/SearchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen';
import AudioRecorderScreen  from './screens/AudioRecorderScreen';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Inicio':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Favoritos':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Perfil':
              iconName = focused ? 'person' : 'person-outline';
              break;
              case 'Audio':
              iconName = focused ? 'mic-outline' : 'mic-outline';
              break;
              case 'Busqueda':
              iconName = focused ? 'search-circle-outline' : 'search-outline';
              break;
              case 'Video':
              iconName = focused ? 'videocam-outline' : 'camera-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1DB954',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Busqueda" component={SearchScreen} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="Audio" component={AudioRecorderScreen} />
    </Tab.Navigator>
  );
}
