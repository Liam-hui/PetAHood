import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { RootState } from '@/store';
import { useAppSelector } from '@/hooks';
import Banners from './Banners';
import Buttons from './Buttons';
import Shops from './Shops';
import Inspirations from './Inspirations';
import Icon from '@/components/Icon';
import SearchBar from '@/components/SearchBar';
import Colors from '@/constants/Colors';

export default function HomeScreen() {

  const homePageData = useAppSelector((state: RootState) => state.homePageData);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBlue }}>
      <Header/>
      <ScrollView>
        
        <Banners data={homePageData.banners} />
        <Buttons data={homePageData.buttons} />
        <Shops data={homePageData.sliders} />
        <View style={{ paddingVertical: 20, backgroundColor: "white" }}>
          {/* <Banner source={require(`../../assets/images/banner.png`)} /> */}
          <Inspirations data={homePageData.blogs} />
        </View>

      </ScrollView>
    </View>
  );
}

const Header = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => <View style={{ flexDirection: 'row', alignItems: "center", backgroundColor: "white", paddingHorizontal: 10, height: 52 + (insets?.top ?? 0), paddingTop: insets?.top }} >
        <Icon
          icon={require(`../../assets/icons/icon-menu.png`)}
          size={24}
          style={{ marginHorizontal: 5 }}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer()) }
        />
        <SearchBar 
          value={""}
          placeholder={t("home_search")}
          style={{ flex: 1, marginHorizontal: 5 }}
          isTextDisabled
          select={() => navigation.navigate('Search')}
        />
        <Icon
          icon={require(`../../assets/icons/icon-cart.png`)}
          size={24}
          style={{ marginHorizontal: 5 }}
          // onPress=
        />
        <Icon
          icon={require(`../../assets/icons/icon-message.png`)}
          size={24}
          style={{ marginHorizontal: 5 }}
          // onPress=
        />
      </View>}
    </SafeAreaInsetsContext.Consumer>
  );
}