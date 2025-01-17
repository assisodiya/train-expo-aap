import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TrainSearchScreen from './src/screens/TrainSearchScreen';
import TrainSearchFormScreen from './src/screens/TrainSearchFormScreen';
import StationSearchScreen from './src/screens/StationSearchScreen';
import DateSelectionScreen from './src/screens/DateSelectionScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
            />
            <Stack.Screen
              name="TrainSearchForm"
              component={TrainSearchFormScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TrainList"
              component={TrainSearchScreen}
              options={{
                headerShown: false,
                headerTitle: '',
                headerBackTitle: ' ',
              }}
            />
            <Stack.Screen
              name="StationSearch"
              component={StationSearchScreen}
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="DateSelection"
              component={DateSelectionScreen}
              options={{
                headerShown: false,
                presentation: 'modal',
                animation: 'slide_from_bottom',
                headerTitle: 'Select Date',
              }}
            />           
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
