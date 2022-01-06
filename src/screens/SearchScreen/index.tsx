import React, { useState, useEffect } from 'react';
import { View, Image, Text, ScrollView, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

import { RootState } from '@/store';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getHomePageData } from '@/store/homePageData';

export default function SearchScreen() {

  const dispatch = useAppDispatch();
  const homePageData = useAppSelector((state: RootState) => state.homePageData);

  useEffect(() => {
    dispatch(getHomePageData());
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      <Header/>
      <ScrollView>


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
        {/* <Icon
          icon={require(`../../assets/icons/icon-menu.png`)}
          size={24}
          style={{ marginHorizontal: 5 }}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer()) }
        />
        <SearchBar 
          value={searchText}
          onChangeText={setSearchText}
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
        /> */}
      </View>}
    </SafeAreaInsetsContext.Consumer>
  );
}
