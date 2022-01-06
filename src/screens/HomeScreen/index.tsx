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
import Heading from './Heading';
import Banners from './Banners';
import Places from './Places';
import Inspirations from './Inspirations';
import Icon from '../../components/Icon';
import SearchBar from '../../components/SearchBar';
import { Banner, FeaturesListContainer, FeatureLabel, FeatureContainer } from './styles';

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
        <FeaturesList />
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
        />
      </View>}
    </SafeAreaInsetsContext.Consumer>
  );
}

const FeaturesList = () => {
  const { width } = useWindowDimensions();

  const FeatureItem = ({ label, icon, onPress }: { label: string, icon: ImageSourcePropType, onPress: () => void }) => {
    return (
      <FeatureContainer style={{ width: (width - 15) / 4 - 15, marginRight: 15 }} onPress={onPress} activeOpacity={0.6} >
        <Image 
          style={{ height: 32, marginBottom: 5 }}
          resizeMode="contain"
          source={icon} 
        />
        <FeatureLabel>{label}</FeatureLabel>
      </FeatureContainer>
    )
  }
  return (
    <FeaturesListContainer style={{ paddingLeft: 15 }}>
      <FeatureItem
        label="Member Offers"
        icon={require("../../assets/icons/icon-features-offers.png")} 
        onPress={() => {}}
      />
      <FeatureItem
        label="Ticketing"
        icon={require("../../assets/icons/icon-features-ticket.png")} 
        onPress={() => {}}
      />
      <FeatureItem
        label="Deals"
        icon={require("../../assets/icons/icon-features-deals.png")} 
        onPress={() => {}}
      />
      <FeatureItem
        label="Event"
        icon={require("../../assets/icons/icon-features-event.png")} 
        onPress={() => {}}
      />
      <FeatureItem
        label="Add New Location"
        icon={require("../../assets/icons/icon-features-newLocation.png")} 
        onPress={() => {}}
      />
      <FeatureItem
        label="Finding Friends"
        icon={require("../../assets/icons/icon-features-findFriends.png")} 
        onPress={() => {}}
      />
      <FeatureItem
        label="Create Pet’s Party"
        icon={require("../../assets/icons/icon-features-party.png")} 
        onPress={() => {}}
      />
    </FeaturesListContainer>
  );
}

const places = [
  {
    id: "1",
    name: "asdfasdf"
  },
  {
    id: "2",
    name: "West Kowloon Waterfron"
  },
  {
    id: "3",
    name: "West Kowloon Waterfront Promenaasdfasdfasdf"
  }
]
