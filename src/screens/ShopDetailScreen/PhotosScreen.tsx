import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Platform, ActivityIndicator } from 'react-native';
import { useTranslation } from "react-i18next";
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootStackScreenProps } from '@/types';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import { TabView } from 'react-native-tab-view';

export default function PhotosScreen(props: RootStackScreenProps<'Photos'>) {

  const { t } = useTranslation();
  const { navigation } = props;
  const { data, goto } = props.route.params;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'shop', title: `${t("shopDetails_shopPhotos")}(${data.shop.length})`  },
    { key: 'customer', title: `${t("shopDetails_customerUpload")}(${data.customer.length})` },
  ]);


  useEffect(() => {
    if (goto) {
      setIndex(goto.album == "customer" ? 1 : 0);
      navigation.push("AlbumModal", { images: goto.album == "customer" ? data.customer : data.shop, index: goto.index });
    }
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBlue }}>

      <Header title={t("shopDetails_photos")} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          return route.key == "shop" 
            ? <Tab images={data.shop} />
            : <Tab images={data.customer} />
        }}
        renderTabBar={props =>
          <TabBar
            isCenter
            {...props}
          />
        }
        onIndexChange={setIndex}
        initialLayout={{ width: Layout.window.width }}
        style={{ flex: 1 }}
      />

    </View>
  );
}

const Tab  = ({ images }: { images: any }) => {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <ScrollView style={{ marginTop: 10 }}     contentContainerStyle={{ paddingBottom: insets.bottom }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {images.map((photo: string, index: number) =>
          <TouchableOpacity 
            key={index}
            activeOpacity={0.5}
            style={{ 
              width: (Layout.window.width - 4) / 3, 
              height: (Layout.window.width - 4) / 3,
              marginHorizontal: index % 3 == 1 ? 2 : 0,
              marginVertical: 1
            }}
            onPress={() => {
              navigation.push("AlbumModal", { images, index });
            }}
          >
            <FastImage 
              style={{ width: "100%", height: "100%", backgroundColor: "black" }} 
              source={{ uri: photo }}
            />
        
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
