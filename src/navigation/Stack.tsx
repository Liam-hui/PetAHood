import * as React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './BottomTab';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchResultScreen from '@/screens/SearchResultScreen';
import NearByScreen from '@/screens/NearByScreen';
import ShopDetailScreen from '../screens/ShopDetailScreen';
import BlogScreen from '../screens/BlogScreen';
import AlbumModalScreen from '../screens/AlbumModalScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator 
    initialRouteName="Tabs"
      screenOptions={{ 
        headerShown: false,
      }}
    >
      <Stack.Group 
        screenOptions={{ 
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      >
        <Stack.Screen name="Tabs" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SearchResult" component={SearchResultScreen} />
        <Stack.Screen name="NearBy" component={NearByScreen} />
        <Stack.Screen name="ShopDetail" component={ShopDetailScreen} />
        <Stack.Screen name="Blog" component={BlogScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Group>
      <Stack.Group 
        screenOptions={{ 
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: "vertical",
        }}
      >
        <Stack.Screen name="AlbumModal" component={AlbumModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigator;