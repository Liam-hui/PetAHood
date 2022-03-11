import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TabBar as TabViewTabBar  } from 'react-native-tab-view';

export default function TabBar(props: any) {

  const [isReady, setIsReady] = useState(!props.isCenter);

  return (
    <View 
      style={{ flexDirection: 'row', justifyContent: props.isCenter ? "center" : "flex-start", opacity: isReady ? 1 : 0 }}
      {...props.isCenter && {
        onLayout: (event: any) => {
          setIsReady(true);
        }
      }}
    >
      <TabViewTabBar
        contentContainerStyle={{  }}
        style={{ backgroundColor: 'transparent', marginLeft: props.isCenter ? 0 : 10, alignSelf: "flex-start" }}
        labelStyle={{ fontSize: 14, fontWeight: "bold", color: Colors.orange, marginHorizontal: 5, textTransform: "none" }}
        // indicatorContainerStyle={{ }}
        indicatorStyle={{ backgroundColor: "#F7682F", height: 3, width: 0.8 }}
        tabStyle={{ width: 'auto', height: 40 }}
        inactiveColor={"#F7682F66"}
        scrollEnabled
        // scrollEnabled={!props.isCenter}
        {...props}
      />
    </View>
  );
}


