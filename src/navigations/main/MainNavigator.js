import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '_screens/home/Home.Screen';
import PokeCompare from '_screens/pokecompare/PokeCompare.Screen';


const Tab = createBottomTabNavigator();

export default function MainNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Compare" component={PokeCompare} />
    </Tab.Navigator>
  );
}

