import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import ShopDetailScreen from '../screens/ShopDetailScreen';
import AlbumModalScreen from '../screens/AlbumModalScreen';
import BottomTabNavigator from './BottomTab';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Tabs" component={BottomTabNavigator} options={{ headerShown: false }} /> */}
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Search" component={SearchScreen}  />
      <Stack.Screen name="ShopDetail" component={ShopDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
      <Stack.Group 
        screenOptions={{ 
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: "vertical"
        }}
      >
        <Stack.Screen name="AlbumModal" component={AlbumModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigator;