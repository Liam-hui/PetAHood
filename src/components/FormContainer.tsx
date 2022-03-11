import React from 'react';
import { Platform, View, ScrollView } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Styles from '@/constants/Styles';
import Icon from './Icon';

export default function FormContainer({ children}: { children: React.ReactNode }) {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const popAction = StackActions.pop(1);
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      style={{ 
        flex: 1, 
        backgroundColor: Colors.lightBlue, 
        paddingTop: Platform.OS == "android" ? insets.top + 20 : 20,
        borderRadius: 10
      }}
    >
      <Icon
        icon={require("@/assets/icons/icon-close-black.png")}
        size={16}
        style={{ marginLeft: "auto", marginBottom: 15, marginRight: Layout.page.paddingHorizontal }}
        onPress={() => navigation.dispatch(popAction)}
      />
      <KeyboardAwareScrollView 
        style={{ flex: 1, paddingHorizontal: Layout.page.paddingHorizontal }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }} 
        showsVerticalScrollIndicator={false} 
        enableOnAndroid
        extraHeight={150}
      >
        <View style={{ backgroundColor: "white", paddingHorizontal: Layout.page.paddingHorizontal, paddingVertical: 20, borderRadius: 10, ...Styles.shadowStyle }}>
          {children}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
