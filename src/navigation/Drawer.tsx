import React, { useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, ImageSourcePropType, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useTranslation } from "react-i18next";

import Colors from "@/constants/Colors";
import StackNavigator from './Stack';
import i18n from '@/translate/i18n';
import Layout from '@/constants/Layout';

const Drawer = createDrawerNavigator();

const DrawerNavigaor = () => {
  return (
    <Drawer.Navigator 
      initialRouteName="Stack"
      screenOptions={{
        headerShown: false
      }}
      drawerContent={props => <DrawerContent {...props}/>}
    >
      <Drawer.Screen name="Stack" component={StackNavigator} />
    </Drawer.Navigator>
  );
}

const DrawerContent = (props: DrawerContentComponentProps) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const lang = i18n.language == "en" ? "en" : "zh_HK";
  const [isScroll, setIsScroll] = useState(false);

  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => 
        <View style={{ height: "100%" }} >
          <ScrollView 
            contentContainerStyle={{ paddingTop: 20 + (insets?.top ?? 0), paddingBottom: 30 }}
            onLayout={
              ({ nativeEvent }) => {
                setIsScroll(nativeEvent.layout.height > Layout.window.height)
              }
            }
            scrollEnabled={isScroll}
          >
          <Image 
            style={{ height: 40, marginBottom: 20, marginLeft: 24 }}
            resizeMode="contain"
            source={require('../assets/images/logo.png')} 
          />
          <DrawerItem
            icon={require(`../assets/icons/icon-drawerItem-membership.png`)}
            label={t("drawerItem_membership")}
            onPress={() => {}}
          />
          <DrawerItem
            icon={require(`../assets/icons/icon-voucher.png`)}
            label={t("drawerItem_vouchers")}
            onPress={() => {}}
          />
          <View style={styles.border} />
          <DrawerItem
            icon={require(`../assets/icons/icon-drawerItem-location.png`)}
            label={t("drawerItem_location")}
            onPress={() => {}}
          />
          <View style={styles.border} />
          <View style={{  paddingHorizontal: 24, height: 100 }}>
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              source={require("../assets/images/banner.png")}
            />
          </View>
          <View style={styles.border} />
          <DrawerItem
            icon={require(`../assets/icons/icon-contactUs.png`)}
            label={t("drawerItem_contactUs")}
            onPress={() => {}}
          />
          <DrawerItem
            icon={require(`../assets/icons/icon-aboutUs.png`)}
            label={t("drawerItem_aboutUs")}
            onPress={() => {
              navigation.navigate("WebView", { url: `https://petahood.com/${lang}/page/about-us`, heading: t("drawerItem_aboutUs") });
            }}
          />
          <DrawerItem
            icon={require(`../assets/icons/icon-terms.png`)}
            label={t("drawerItem_tAndC")}
            onPress={() => {
              navigation.navigate("WebView", { url: `https://petahood.com/${lang}/page/terms-and-conditions`, heading: t("drawerItem_tAndC") });
            }}
          />
          <View style={styles.border} />
          <DrawerItem
            icon={require(`../assets/icons/icon-registerPartner.png`)}
            label={t("drawerItem_registerPartner")}
            onPress={() => {
              navigation.navigate("WebView", { url: `https://petahood.com/${lang}/partner`, heading: t("drawerItem_registerPartner") });
            }}
          />
          <DrawerItem
            icon={require(`../assets/icons/icon-termsMerchant.png`)}
            label={t("drawerItem_termsMerchant")}
            onPress={() => {
              navigation.navigate("WebView", { url: `https://petahood.com/${lang}/page/merchant-services-tnc`, heading: t("drawerItem_termsMerchant") });
            }}
          />
          <DrawerItem
            icon={require(`../assets/icons/icon-faq.png`)}
            label={t("drawerItem_faq")}
            onPress={() => {
              navigation.navigate("WebView", { url: `https://petahood.com/${lang}/page/merchant-faq`, heading: t("drawerItem_faq") });
            }}
          />
          <View style={styles.border} />
          <DrawerItem
            icon={require(`../assets/icons/icon-drawerItem-setting.png`)}
            label={t("drawerItem_setting")}
            onPress={() => {
              navigation.navigate("Setting");
            }}
          />
          </ScrollView>
        </View>
      }
    </SafeAreaInsetsContext.Consumer>
  )
}

const DrawerItem = ({ icon, label, onPress }: { icon: ImageSourcePropType, label: string, onPress: () => void }) => {
  return (
    <TouchableOpacity 
      style={{ width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 24, marginVertical: 8 }}
      onPress={onPress}
    >
      <Image 
        style={{ height: 23, width: 23, marginRight: 15 }}
        resizeMode="contain"
        source={icon} 
      />
      <Text
        style={{ flex: 1, fontSize: 16, color: Colors.darkBlue }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default DrawerNavigaor;

const styles = StyleSheet.create({
  border: {
    marginVertical: 10,
    backgroundColor: "#E5E5E5", 
    height: 2
  },
});