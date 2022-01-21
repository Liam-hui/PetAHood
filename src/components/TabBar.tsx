import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import React from 'react';
import { TabBar as TabViewTabBar  } from 'react-native-tab-view';

export default function TabBar(props: any) {
  return (
    <TabViewTabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#F7682F", height: 3, width: 0.8 }}
      style={{ backgroundColor: 'transparent', marginLeft: 10 }}
      labelStyle={{ fontSize: 14, textTransform: "none", fontWeight: "bold", color: Colors.orange, marginHorizontal: 5 }}
      tabStyle={{ width: 'auto', height: 40 }}
      inactiveColor={"#F7682F66"}
      scrollEnabled={true}
    />
  );
}


