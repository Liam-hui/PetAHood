import React, { useState, useEffect, createRef } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import EncryptedStorage from 'react-native-encrypted-storage';
import { StackActions } from '@react-navigation/native';
import DefaultWebView from 'react-native-webview';

import Header from '@/components/Header';
import { HOST } from '@/constants';
import i18n from '@/translate/i18n';
import { RootStackScreenProps } from '@/types';
import WebView from '@/components/WebView';

export default function RegisterAsPartnerScreen(props: RootStackScreenProps<'RegisterAsPartner'>) {

  const { navigation } = props;
  const popAction = StackActions.pop(1);
  const { t } = useTranslation();
  const lang = i18n.language == "en" ? "en" : "zh_HK";

  const webViewRef: React.RefObject<DefaultWebView> = createRef();

  return (
    <View style={{ flex: 1 }}>
    <Header title={t("drawerItem_registerPartner")}/>
    <WebView 
      webViewRef={webViewRef}
      source={{ 
        uri: `${HOST}${lang}/partner`,
      }} 
      onNavigationStateChange={(navState: any) => {
        // console.log(navState);
        // const { url } = navState;
        // if (url.includes("isSuccess=1")) {
        //   webViewRef.current?.stopLoading();
        //   navigation.dispatch(popAction);
        //   setTimeout(() => navigation.navigate("Dialog", { message: t("addLocation_success") }), 500);
        // }
      }}
    />
  </View>
  );
}
