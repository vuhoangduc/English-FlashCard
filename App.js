import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/views/screens/LoginScreen';
import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import RegistrationScreen from './src/views/screens/RegistrationScreen';
import { BottomTabNavigator } from "../FlashCard/src/navigator/index";
const Stack = createNativeStackNavigator();
export default function App() {
  const [initialRouteName, setInitialRouteName] = React.useState('');
  return (
    <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
            <Stack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          
          </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
