import React from 'react';
import { View, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useTranslation } from "react-i18next";
import i18n from "i18next";

import Header from '@/components/Header';
import { SettingItem, SettingItemText } from './styles';
import Colors from '@/constants/Colors';
import { useAppDispatch } from '@/hooks';
import { getHomePageData } from '@/store/homePageData';
import { initShopSearch } from '@/store/shopSearch';
import { clearShopDetails } from '@/store/shopDetails';
import { clearBlogDetails } from '@/store/blogDetails';
import Icon from '@/components/Icon';
import moment from 'moment';
// import 'moment/locale/zh-hk'

export default function LanguageScreen() {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(
      lang,
      () => onLanguageChange(lang)
    );
  }

  const onLanguageChange = (lang: string) => {
    dispatch(getHomePageData());
    dispatch(initShopSearch());
    dispatch(clearShopDetails());
    dispatch(clearBlogDetails());
    // moment.locale(lang == "zh" ? "zh-hk" : "en");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      <Header title={t("settingItem_language")}/>
      <SettingItem
        onPress={() => {
          setLanguage("zh");
        }}
      >
        <SettingItemText>中文</SettingItemText>
        {i18n.language != "en" && <Icon size={13} icon={require("../../assets/icons/icon-tick.png")} style={{ marginLeft: "auto" }} />}
      </SettingItem>
      <SettingItem
        onPress={() => {
          setLanguage("en");
        }}
      >
        <SettingItemText>English</SettingItemText>
        {i18n.language == "en" && <Icon size={13} icon={require("../../assets/icons/icon-tick.png")} style={{ marginLeft: "auto" }} />}
      </SettingItem>
    </View>
  );
}


