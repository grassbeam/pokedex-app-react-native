import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import DetailScreen from '_screens/pokedetail/PokeDetail.Screen';
import HomeNavigator from './HomeNavigator';

const Stack = createNativeStackNavigator();

export default function MainNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={HomeNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="DetailPokemon" component={DetailScreen} options={{ title: "Detail Pokemon" }} />
    </Stack.Navigator>
  );
}

