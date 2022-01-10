import React, { useState } from 'react';
import { View, Image, Text, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { TabView, TabBar, SceneMap, SceneRendererProps, NavigationState } from 'react-native-tab-view';

import Icon from '../../components/Icon';
import FootprintGraph from '../../components/FootprintGraph';
import PlacesList from '../../components/PlacesList';
import { Row } from '../../styles';
import { NameText, LinkText, LabelText, NumberText, Shadow, CircleImage, Border } from './styles';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <Header/>
      <MyTabView/>
    </View>
  );
}

const Header = () => {
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);

  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => <View style={{ backgroundColor: "white", paddingTop: 10 + insets?.top!, paddingBottom: 10, borderBottomLeftRadius: 26, borderBottomRightRadius: 26 }} >
        <Row style={{ paddingVertical: 8, paddingHorizontal: 13 }}>
          <Icon
            icon={require(`../../assets/icons/icon-backArrow.png`)}
            size={24}
            onPress={() => navigation.dispatch(popAction) }
          />
          <Icon
            icon={require(`../../assets/icons/icon-qrCode.png`)}
            size={24}
            style={{ marginLeft: "auto", marginRight: 7 }}
            // onPress={() => navigation.dispatch(popAction) }
          />
          <Icon
            icon={require(`../../assets/icons/icon-message.png`)}
            size={24}
            style={{ marginHorizontal: 7 }}
            // onPress={() => navigation.dispatch(popAction) }
          />
          <Icon
            icon={require(`../../assets/icons/icon-setting.png`)}
            size={24}
            style={{ marginLeft: 7, marginRight: 5 }}
            // onPress={() => navigation.dispatch(popAction) }
          />
        </Row>
        <Row style={{ paddingHorizontal: 13 }}>
          <View>
            <Image 
              style={{ width: 84, height: 84, borderRadius: 42, borderWidth: 2, borderColor: "white", overflow: "hidden", marginRight: 10 }}
              resizeMode="cover"
              source={require('../../assets/images/profile.png')} 
            />
            <Row style={{ position: "absolute", bottom: 0, left: 9, width: 66, height: 18, borderRadius: 9, backgroundColor: "#F7682F", alignItems: "center", justifyContent: "center" }}>
              <Icon
                icon={require(`../../assets/icons/icon-claw-white.png`)}
                size={14}
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>Level 2</Text>
            </Row>
          </View>
          <View>
            <NameText>Eleanor Pena</NameText>
            <Row style={{ alignItems: "flex-end" }}>
              <Icon
                icon={require(`../../assets/icons/icon-facebook.png`)}
                size={14}
                style={{ marginRight: 5 }}
              />
              <LinkText>ELE_PENA</LinkText>
            </Row>
            <Row style={{ alignItems: "flex-end", marginTop: 5 }}>
              <Icon
                icon={require(`../../assets/icons/icon-facebook.png`)}
                size={14}
                style={{ marginRight: 5 }}
              />
              <LinkText>ELE_PENA</LinkText>
            </Row>
          </View>
        </Row>
        <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 13, paddingBottom: 10 }} >
          <Row style={{ marginTop: 10 }}>
            <Shadow style={{ shadowOffset: { width: 0, height: 3 }, alignItems: "center", justifyContent: "center" }}>
              <Icon
                icon={require(`../../assets/icons/icon-add.png`)}
                size={20}
              />
            </Shadow>
            {["", "", "", "", ""].map((item) => {
              return (
                <Shadow style={{ shadowOffset: { width: 0, height: 3 } }}>
                  <CircleImage
                    style={{ 
                      
                    }}
                    resizeMode="cover"
                    source={require('../../assets/images/profile.png')} 
                  />
                </Shadow>
              );
            })}
          </Row>
        </ScrollView>
        <View style={{ paddingHorizontal: 13 }}>
          <Border/>
        </View>
        <View style={{ paddingHorizontal: 90 }}>
          <Row style={{ justifyContent: "space-between" }}>
            <View style={{ alignItems: "center" }}>
              <LabelText>Followers</LabelText>
              <NumberText>103</NumberText>
            </View>
            <View style={{ alignItems: "center" }}>
              <LabelText>Followers</LabelText>
              <NumberText>103</NumberText>
            </View>
          </Row>
        </View>
      </View>}
    </SafeAreaInsetsContext.Consumer>
  );
}

const MyTabView = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'favourite', title: 'Favourite' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'footprint', title: 'Footprint' },
    { key: 'voucher', title: 'Voucher' },
    { key: 'orders', title: 'Orders' },
  ]);

  const renderScene = SceneMap({
    favourite: () => <View style={{ flex: 1}} />,
    reviews: () => <View style={{ flex: 1}} />,
    footprint: () => 
      <View style={{ flex: 1}}>
        <FootprintGraph/>
      </View>,
    voucher: () => <View style={{ flex: 1}} />,
    orders: () => <View style={{ flex: 1}} />,
  });

  return (
    <TabView
      style={{ marginTop: 10 }}
      navigationState={{ index, routes }}
      renderTabBar={props =>
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#F7682F", width: 0.5, height: 3 }}
          style={{ backgroundColor: 'transparent' }}
          labelStyle={{ fontSize: 18, textTransform: "none", fontWeight: "bold", color: "#F7682F" }}
          tabStyle={{ width: 'auto', height: 40 }}
          scrollEnabled={true}
        />
      }
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}