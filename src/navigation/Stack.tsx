import * as React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './BottomTab';

import WebViewScreen from '@/screens/WebViewScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BlogScreen from '../screens/BlogScreen';
import AlbumModalScreen from '../screens/AlbumModalScreen';
// auth
import LoginScreen from '@/screens/Auth/LoginScreen';
// shop details
import ShopDetailScreen from '../screens/ShopDetailScreen';
import PhotosScreen from '@/screens/ShopDetailScreen/PhotosScreen';
import OpeningHourScreen from '@/screens/ShopDetailScreen/OpeningHourScreen';
import ReviewsScreen from '@/screens/ShopDetailScreen/ReviewsScreen';
// search
import SearchScreen from '../screens/SearchScreen';
import SearchResultScreen from '@/screens/SearchResultScreen';
import NearByScreen from '@/screens/NearByScreen';
// setting
import SettingScreen from '@/screens/Setting/SettingScreen';
import LanguageScreen from '@/screens/Setting/LanguageScreen';

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
        <Stack.Screen name="WebView" component={WebViewScreen} />
        <Stack.Screen name="Blog" component={BlogScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        {/* Shop Detail */}
        <Stack.Screen name="ShopDetail" component={ShopDetailScreen} />
        <Stack.Screen name="Photos" component={PhotosScreen} />
        <Stack.Screen name="OpeningHour" component={OpeningHourScreen} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} />
        {/* Search */}
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SearchResult" component={SearchResultScreen} />
        <Stack.Screen name="NearBy" component={NearByScreen} />
        {/* Setting */}
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
      </Stack.Group>
      <Stack.Group 
        screenOptions={{ 
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: "vertical",
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AlbumModal" component={AlbumModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigator;