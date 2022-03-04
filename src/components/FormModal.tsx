import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Styles from '@/constants/Styles';
import React from 'react';
import {  ActivityIndicator, Platform, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from './Icon';

export default function FormModal({ isVisible, close, children, isLoading }: { isVisible: boolean, close: () => void, children: React.ReactNode, isLoading?: boolean }) {

  const insets = useSafeAreaInsets();
  
  return (
    <Modal 
      isVisible={isVisible} 
      onSwipeComplete={close}
      swipeDirection={['down']}
      style={{ margin: 0 }}
    >
      <View 
        style={{ 
          flex: 1, 
          backgroundColor: Colors.lightBlue, 
          paddingHorizontal: Layout.page.paddingHorizontal,
          paddingTop: Platform.OS == "ios" ? insets.top : insets.top + 10,
          paddingBottom: insets.bottom + 10,
          borderRadius: 10
        }}
      >
        <Icon
          icon={require("@/assets/icons/icon-close-black.png")}
          size={16}
          style={{ marginLeft: "auto", marginBottom: 15, marginRight: 0 }}
          onPress={close}
        />
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: Layout.page.paddingHorizontal, paddingVertical: 20, borderRadius: 10, ...Styles.shadowStyle }}>
          {children}
        </View>
      </View>
      {isLoading && 
        <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator color="#DDDDDD" />
        </View>
      }
    </Modal>
  );
}
