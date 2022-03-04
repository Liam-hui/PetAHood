import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useNavigation, StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabView, SceneMap } from 'react-native-tab-view';

import Icon from '@/components/Icon';
import { Row, NameText, LinkText, LabelText, NumberText, CircleImage, Border } from './styles';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logout } from '@/store/auth';
import { RootState } from '@/store';
import FastImage from 'react-native-fast-image';
import Styles from '@/constants/Styles';
import { useTranslation } from 'react-i18next';
import TabBar from '@/components/TabBar';
import { getUserProfileAll } from '@/store/profile';
import Favourites from './Favourites';
import Layout from '@/constants/Layout';
import Reviews from './Reviews';
import Vouchers from './Vouchers';
import Footprint from './Footprint';
import Colors from '@/constants/Colors';

export default function ProfileScreen() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserProfileAll());
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <Header/>
      <ProfileTabView/>
    </View>
  );
}

const Header = () => {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const popAction = StackActions.pop(1);
  const data = useAppSelector((state: RootState) => state.profile.data);

  if (data == null)
    return null;
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => <View style={{ backgroundColor: "white", paddingTop: 10 + insets?.top!, paddingBottom: 10, borderBottomLeftRadius: 26, borderBottomRightRadius: 26 }} >
        <Row style={{ paddingVertical: 8, paddingHorizontal: 13 }}>
          <Icon
            icon={require(`@/assets/icons/icon-backArrow.png`)}
            size={24}
            onPress={() => navigation.dispatch(popAction)}
          />
          <Icon
            icon={require(`@/assets/icons/icon-qrCode.png`)}
            size={24}
            style={{ marginLeft: "auto", marginRight: 7 }}
            // onPress={() => navigation.dispatch(popAction) }
          />
          <Icon
            icon={require(`@/assets/icons/icon-message.png`)}
            size={24}
            style={{ marginHorizontal: 7 }}
            // onPress={() => navigation.dispatch(popAction) }
          />
          <Icon
            icon={require(`@/assets/icons/icon-setting.png`)}
            size={24}
            style={{ marginLeft: 7, marginRight: 5 }}
            onPress={() => dispatch(logout()) }
          />
        </Row>
        <Row style={{ paddingHorizontal: 13 }}>
          <View style={{ alignItems: "center", marginRight: 10 }}>
            <FastImage 
              style={{ width: 84, height: 84, borderRadius: 42, borderWidth: 2, borderColor: "white", overflow: "hidden" }}
              resizeMode="cover"
              source={{ uri: data.profile_photo_url }} 
            />
            <Row style={{ position: "absolute", bottom: -5, borderRadius: 15, backgroundColor: "#F7682F", alignItems: "center", justifyContent: "center", paddingHorizontal: 7, paddingVertical: 3 }}>
              <Icon
                icon={require(`@/assets/icons/icon-claw-white.png`)}
                size={14}
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>{`${t("profile_level")} ${data.member_tier}`}</Text>
            </Row>
          </View>
          <View>
            <NameText>{data.first_name + " " + data.last_name}</NameText>
            <Row style={{ alignItems: "flex-end" }}>
              <Icon
                icon={require(`@/assets/icons/icon-facebook.png`)}
                size={14}
                style={{ marginRight: 5 }}
              />
              <LinkText>ELE_PENA</LinkText>
            </Row>
            <Row style={{ alignItems: "flex-end", marginTop: 5 }}>
              <Icon
                icon={require(`@/assets/icons/icon-facebook.png`)}
                size={14}
                style={{ marginRight: 5 }}
              />
              <LinkText>ELE_PENA</LinkText>
            </Row>
          </View>
        </Row>
        <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 13, paddingBottom: 10 }} showsHorizontalScrollIndicator={false} bounces={false} >
          <Row style={{ marginTop: 10 }}>
            <TouchableOpacity
              style={{ 
                alignItems: "center", 
                justifyContent: "center",
                backgroundColor: "white",
                width: 64, 
                height: 64,
                borderRadius: 32,
                ...Styles.shadowStyle,
                shadowOpacity: 0.15,
                marginRight: 15
              }}
              onPress={() => navigation.push("AddPet")}
            >
              <Icon
                icon={require(`@/assets/icons/icon-add.png`)}
                size={20}
              />
            </TouchableOpacity>
            {data.pets.map((pet: any) => {
              return (
                <TouchableOpacity
                  style={{ 
                    alignItems: "center", 
                    justifyContent: "center",
                    backgroundColor: "white",
                    width: 64, 
                    height: 64,
                    borderRadius: 32,
                    ...Styles.shadowStyle,
                    shadowOpacity: 0.2,
                    elevation: 6,
                    marginRight: 8
                  }}
                  onPress={() => navigation.navigate("Pet", { id: pet.id })}
                >
                  <CircleImage
                    style={{ 
                      
                    }}
                    resizeMode="cover"
                    source={{ uri: pet.image }} 
                  />
                </TouchableOpacity>
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
              <NumberText>0</NumberText>
            </View>
            <View style={{ alignItems: "center" }}>
              <LabelText>Following</LabelText>
              <NumberText>0</NumberText>
            </View>
          </Row>
        </View>
      </View>}
    </SafeAreaInsetsContext.Consumer>
  );
}

const ProfileTabView = () => {

  const { t } = useTranslation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'favourite', title: t("profile_fav") },
    { key: 'reviews', title: t("profile_reviews") },
    { key: 'footprint', title: t("profile_footprint") },
    { key: 'voucher', title: t("profile_voucher") },
    { key: 'orders', title: t("profile_orders") },
  ]);

  const renderScene = SceneMap({
    favourite: () => <Favourites />,
    reviews: () =>  <Reviews />,
    footprint: () => <Footprint />,
    voucher: () => <Vouchers />,
    orders: () => <View style={{ flex: 1}} />,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={props =>
        <View style={{ marginBottom: 8 }}>
          <TabBar
            {...props}
          />
        </View>
      }
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Layout.window.width }}
      style={{ backgroundColor: Colors.lightBlue }}
    />
  );
}