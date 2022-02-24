import Colors from '@/constants/Colors';
import React from 'react';
import { View } from 'react-native';
import { TabBar as TabViewTabBar  } from 'react-native-tab-view';

export default function TabBar(props: any) {
  return (
    <View style={{ width: "100%", justifyContent: props.isCenter ? "center" : "flex-start", flexDirection: "row" }}>
      <TabViewTabBar
        indicatorStyle={{ backgroundColor: "#F7682F", height: 3, width: 0.8 }}
        style={{ backgroundColor: 'transparent', marginLeft: props.isCenter ? 0 : 10,}}
        labelStyle={{ fontSize: 14, textTransform: "none", fontWeight: "bold", color: Colors.orange, marginHorizontal: 5 }}
        tabStyle={{ width: 'auto', height: 40 }}
        inactiveColor={"#F7682F66"}
        scrollEnabled={true}
        {...props}
      />
    </View>
  );
}


