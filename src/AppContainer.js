import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from '_navigations/MainNavigator';

export default function AppContainer (props) {

    return (
      <NavigationContainer>
        <MainNavigator/>
      </NavigationContainer>
    );
}

