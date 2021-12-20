import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import HomeScreen from '_screens/home/Home.Screen';
import PokeCompare from '_screens/pokecompare/PokeCompare.Screen';


const Tab = createBottomTabNavigator();

export default function MainNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"  
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Pokemon List',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pokeball" color={color} size={26} />
          ),
        }}

      />
      <Tab.Screen 
        name="Compare" 
        component={PokeCompare} 
        options={{
          tabBarLabel: 'Compare',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

