import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import LinkingConfiguration from './LinkingConfiguration';
import DrawerNavigaor from './Drawer';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <DrawerNavigaor />
    </NavigationContainer>
  );
}

