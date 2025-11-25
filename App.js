import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './app/routes';
import AuthProvider from './app/context/auth';

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#F0F4FF" barStyle="dark-content" />
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  )
}