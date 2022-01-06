import * as React from 'react';
import { View, SafeAreaView, Image, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import i18n from "i18next";
import { useTranslation } from "react-i18next";

import Colors from "@/constants/Colors";
import StackNavigator from './Stack';

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
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ borderRightWidth: 4, borderRightColor: "#DB6865" }} >
      <View style={{ height: "100%", paddingTop: 60, paddingBottom: 30 }} >
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
          icon={require(`../assets/icons/icon-drawerItem-location.png`)}
          label={t("drawerItem_location")}
          onPress={() => {}}
        />
        <View 
          style={{ 
            marginVertical: 10,
            paddingVertical: 15, 
            borderTopColor: "#E5E5E5", 
            borderBottomColor: "#E5E5E5",
            borderTopWidth: 2,
            borderBottomWidth: 2 
          }} 
        >
          <DrawerItem
            icon={require(`../assets/icons/icon-drawerItem-inspiration.png`)}
            label={t("drawerItem_inspiration")}
            onPress={() => {}}
          />
        </View>
        <DrawerItem
          icon={require(`../assets/icons/icon-drawerItem-message.png`)}
          label={t("drawerItem_message")}
          onPress={() => {}}
        />
        <DrawerItem
          icon={require(`../assets/icons/icon-drawerItem-party.png`)}
          label={t("drawerItem_party")}
          onPress={() => {}}
        />
        <DrawerItem
          icon={require(`../assets/icons/icon-drawerItem-setting.png`)}
          label={t("drawerItem_setting")}
          onPress={() => {}}
        />
        <View style={{ marginTop: 'auto' }} />
        <DrawerItem
          icon={require(`../assets/icons/icon-drawerItem-lang.png`)}
          label={i18n.language == "en" ? "繁" : "Eng"}
          onPress={() => {
            i18n.changeLanguage(i18n.language == "en" ? "zh" : "en");
          }}
        />
      </View>
    </SafeAreaView>
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
