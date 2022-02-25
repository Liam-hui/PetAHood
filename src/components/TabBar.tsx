import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import React from 'react';
import { View } from 'react-native';
import { TabBar as TabViewTabBar  } from 'react-native-tab-view';

export default function TabBar(props: any) {
  return (
    <TabViewTabBar
      indicatorStyle={{ backgroundColor: "#F7682F", height: 3, width: 0.8 }}
      contentContainerStyle={{ justifyContent: props.isCenter ? "center" : "flex-start" }}
      style={{ backgroundColor: 'transparent', marginLeft: props.isCenter ? 0 : 10 }}
      labelStyle={{ fontSize: 14, fontWeight: "bold", color: Colors.orange, marginHorizontal: 5 }}
      tabStyle={{ width: props.isCenter ? 140 : 'auto', height: 40 }}
      inactiveColor={"#F7682F66"}
      scrollEnabled={!props.isCenter}
      {...props}
    />
  );
}


