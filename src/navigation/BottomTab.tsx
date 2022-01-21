import * as React from 'react';
import { View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useTranslation } from "react-i18next";

import { StyledText } from '../styles';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: { backgroundColor: '#DB6865' }
      }}
      tabBar={(props) => TabBar(props)}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: t("bottomTabItem_home") }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={TabTwoScreen}
        options={{ title: t("bottomTabItem_calendar") }}
      />
      <BottomTab.Screen
        name="Favourites"
        component={TabTwoScreen}
        options={{ title: t("bottomTabItem_favourites") }}
      />
      <BottomTab.Screen
        name="Community"
        component={TabTwoScreen}
        options={{ title: t("bottomTabItem_community") }}
      />
    </BottomTab.Navigator>
  );
}

const TabBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => <View style={{ flexDirection: 'row', alignItems: "center", backgroundColor: '#DB6865', height: 70 + (insets?.bottom ?? 0), paddingBottom: insets?.bottom }} >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const { title } = options;
          const isFocused = state.index === index;
          if (route.name != "Profile") return (
            <TouchableOpacity 
              key={index}
              style={{ flex: 1, height: 55, alignItems: "center", justifyContent: "center" }}
              onPress={() => { 
                !isFocused && navigation.navigate(route.name); 
              }}
            >
              <Image 
                style={{ height: 28, width: 28, marginBottom: 5 }}
                resizeMode="contain"
                source={TabBarIcons[route.name + (isFocused ? "Focused" : "")]} 
              />
              <StyledText
                style={{ fontWeight: "bold", fontSize: 13, color: "white", textAlign: 'center' }}
              >
                {title}
              </StyledText>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          activeOpacity={0.6}
          style={{ paddingHorizontal: 8, height: 55, justifyContent: "flex-end" }}
          onPress={() => { 
            // navigation.navigate('Profile'); 
          }}
        >
          <Image 
            style={{ width: 72, height: 72, borderRadius: 36, borderWidth: 2, borderColor: "white", overflow: "hidden", transform: [{ translateY: -4 }] }}
            resizeMode="cover"
            source={require('../assets/images/profile.png')} 
          />
        </TouchableOpacity>
      </View>}
    </SafeAreaInsetsContext.Consumer>
  );
}

const TabBarIcons: { [key: string]: ImageSourcePropType } = {
  "Home": require("../assets/icons/icon-tabBarItem-home.png"),
  "HomeFocused": require("../assets/icons/icon-tabBarItem-home-focused.png"),
  "Calendar": require("../assets/icons/icon-tabBarItem-calendar.png"),
  "CalendarFocused": require("../assets/icons/icon-tabBarItem-calendar-focused.png"),
  "Favourites": require("../assets/icons/icon-tabBarItem-favourites.png"),
  "FavouritesFocused": require("../assets/icons/icon-tabBarItem-favourites-focused.png"),
  "Community": require("../assets/icons/icon-tabBarItem-community.png"),
  "CommunityFocused": require("../assets/icons/icon-tabBarItem-community.png"),
}

export default BottomTabNavigator;