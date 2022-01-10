import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import { RootState } from '@/store';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getHomePageData } from '@/store/homePageData';
import Banners from './Banners';
import Features from './Features';
import Places from './Places';
import Inspirations from './Inspirations';
import Icon from '@/components/Icon';
import SearchBar from '@/components/SearchBar';
import { Banner } from './styles';

export default function HomeScreen() {

  const dispatch = useAppDispatch();
  const homePageData = useAppSelector((state: RootState) => state.homePageData);

  useEffect(() => {
    dispatch(getHomePageData());
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      <Header/>
      <ScrollView>
        <Banners data={homePageData.banners} />
        <Features />
        <Places data={homePageData.sliders} />

        <View style={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: "white" }}>
          <Banner source={require(`../../assets/images/banner.png`)} />
          <Inspirations data={homePageData.blogs} />
        </View>

      </ScrollView>
    </View>
  );
}

const Header = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

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
          value={searchText}
          placeholder="Search..."
          onChangeText={setSearchText}
          onSubmit={() => navigation.navigate('Search')}
          style={{ flex: 1, marginHorizontal: 5 }}
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