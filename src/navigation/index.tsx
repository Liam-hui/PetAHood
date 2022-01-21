import React, { useEffect } from 'react';
import { ColorSchemeName } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import LinkingConfiguration from './LinkingConfiguration';
import DrawerNavigaor from './Drawer';
import { useAppDispatch } from '@/hooks';
import { getHomePageData } from '@/store/homePageData';
import { initShopSearch } from '@/store/shopSearch';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHomePageData());
    dispatch(initShopSearch());
  }, [])

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <DrawerNavigaor />
    </NavigationContainer>
  );
}

