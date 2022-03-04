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

export default function AddNewLocationScreen(props: RootStackScreenProps<'AddNewLocation'>) {

  const { navigation } = props;
  const popAction = StackActions.pop(1);
  const { t } = useTranslation();
  const lang = i18n.language == "en" ? "en" : "zh_HK";

  const webViewRef: React.RefObject<DefaultWebView> = createRef();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getToken();
  }, [])

  const getToken = async () => {
    const token = await EncryptedStorage.getItem("token");
    setToken(token);
  }

  return (
    <View style={{ flex: 1 }}>
    <Header title={t("drawerItem_location")}/>
    {token && 
      <WebView 
        webViewRef={webViewRef}
        source={{ 
          uri: `${HOST}${lang}/add-new-location`,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }} 
        onNavigationStateChange={(navState: any) => {
          const { url } = navState;
          if (url.includes("isSuccess=1")) {
            webViewRef.current?.stopLoading();
            navigation.dispatch(popAction);
            setTimeout(() => navigation.navigate("Dialog", { message: t("addLocation_success") }), 500);
          }
        }}
      />
    }
  </View>
  );
}
