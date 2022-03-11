import * as React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '@/hooks';
import { RootState } from '@/store';

import BottomTabNavigator from './BottomTab';

import WebViewScreen from '@/screens/WebViewScreen';
import AlbumModalScreen from '../screens/AlbumModalScreen';
import DialogScreen from '@/screens/DialogScreen';
import BlogScreen from '../screens/BlogScreen';
import AddNewLocationScreen from '@/screens/AddNewLocationScreen';
import RegisterAsPartnerScreen from '@/screens/RegisterAsPartnerScreen';

// Profile
import ProfileScreen from '../screens/Profile/ProfileScreen';

// Pet
import PetScreen from '../screens/Pet/PetScreen';
import AddPetScreen from '../screens/Pet/AddPetScreen';
import PetHealthRecordFormScreen from '@/screens/Pet/PetHealthRecordFormScreen';
import PetInsuranceFormScreen from '@/screens/Pet/PetInsuranceFormScreen';
import PetGroomingFormScreen from '../screens/Pet/PetGroomingFormScreen';

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

  const authStatus = useAppSelector((state: RootState) => state.auth.status);

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
        <Stack.Screen name="RegisterAsPartner" component={RegisterAsPartnerScreen} />
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
        {authStatus == "success" && 
          <>
            {/* Profile */}
            <Stack.Screen name="Profile" component={ProfileScreen} />

            <Stack.Screen name="Pet" component={PetScreen} />
            <Stack.Screen name="AddNewLocation" component={AddNewLocationScreen} />
          </>
        }
      </Stack.Group>
      <Stack.Group 
        screenOptions={{ 
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: "vertical",
        }}
      >
        <Stack.Screen name="AlbumModal" component={AlbumModalScreen} />
        {authStatus != "success" && 
          <>
             <Stack.Screen name="Login" component={LoginScreen} />
          </>
        }
        {authStatus == "success" && 
          <>
            <Stack.Screen name="AddPet" component={AddPetScreen} />
            <Stack.Screen name="PetHealthRecordForm" component={PetHealthRecordFormScreen} />
            <Stack.Screen name="PetInsuranceForm" component={PetInsuranceFormScreen} />
            <Stack.Screen name="PetGroomingForm" component={PetGroomingFormScreen} />
          </>
        }
      </Stack.Group>
      <Stack.Group 
        screenOptions={{ 
          presentation: 'transparentModal',
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="Dialog" component={DialogScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigator;