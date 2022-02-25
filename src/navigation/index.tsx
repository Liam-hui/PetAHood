import React, { useEffect } from 'react';
import { ColorSchemeName } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import LinkingConfiguration from './LinkingConfiguration';
import DrawerNavigaor from './Drawer';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getHomePageData } from '@/store/homePageData';
import { initShopSearch } from '@/store/shopSearch';
import { RootState } from '@/store';
import { clearUserProfile, getUserProfile } from '@/store/profile';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    dispatch(getHomePageData());
    dispatch(initShopSearch());
  }, [])

  useEffect(() => {
    if (authStatus == "success") {
      dispatch(getUserProfile());
    }
    else {
      dispatch(clearUserProfile());
    }
  }, [authStatus])

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <DrawerNavigaor />
    </NavigationContainer>
  );
}

