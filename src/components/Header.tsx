import React from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Icon from './Icon';

export default function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const popAction = StackActions.pop(1);
  
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => 
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 10, backgroundColor: "white", paddingHorizontal: 15, paddingTop: 13 + (insets?.top ?? 0) }} >
          <Icon
            icon={require(`../assets/icons/icon-backArrow.png`)}
            size={24}
            onPress={() => navigation.dispatch(popAction) }
          />
        </View>
      }
    </SafeAreaInsetsContext.Consumer>
  );
}