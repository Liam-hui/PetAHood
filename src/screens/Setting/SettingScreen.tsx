import React from 'react';
import { View } from 'react-native';
import i18n from "i18next";

import { RootStackScreenProps } from '@/types';
import Header from '@/components/Header';
import { useTranslation } from "react-i18next";
import { SettingItem, SettingItemText } from './styles';

export default function SettingScreen(props: RootStackScreenProps<'Setting'>) {

  const { navigation } = props;
  const { t } = useTranslation();
  const lang = i18n.language == "en" ? "en" : "zh_HK";

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      <Header title={t("setting_heading")}/>
      <SettingItem
        onPress={() => {
        }}
      >
        <SettingItemText>{t("settingItem_changePassword")}</SettingItemText>
      </SettingItem>
      <SettingItem
        onPress={() => {
          navigation.navigate("Language");
        }}
      >
        <SettingItemText>{t("settingItem_language")}</SettingItemText>
      </SettingItem>
      <SettingItem
        onPress={() => {
        }}
      >
        <SettingItemText>{t("settingItem_noti")}</SettingItemText>
      </SettingItem>
      <SettingItem
        onPress={() => {
          navigation.navigate("WebView", { url: `https://petahood.com/${lang}/page/privacy-policy`, heading: t("settingItem_privacy") });
        }}
      >
        <SettingItemText>{t("settingItem_privacy")}</SettingItemText>
      </SettingItem>
    </View>
  );
}
