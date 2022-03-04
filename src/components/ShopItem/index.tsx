import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image'
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ShopItemLargeContainer, ShopItemContainer, ShopTitle, ShopTitleLarge } from './styles';
import Colors from '@/constants/Colors';
import Tag from '../Tag';

export function ShopItemLarge({ item, style, isPressTitle }: { item: any, style?: any, isPressTitle?: boolean })  {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const openDetailPage = () => {
    navigation.push("ShopDetail", { id: item.id })
  }

  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        ...style
      }}
    >
      <ShopItemLargeContainer
        activeOpacity={0.6}
        style={{ elevation: 2 }}
        onPress={openDetailPage}
        disabled={isPressTitle}
      >
        <FastImage
          style={{ width: 112, height: 112 }}
          resizeMode="cover"
          source={{ uri: item.cover_image }} 
        />
        <View style={{ flex: 1, paddingVertical: 12 }}>
          <View style={{ paddingHorizontal: 11 }}>
            <View style={{ flexDirection: "row" }}>
              {/* title */}
              <TouchableOpacity
                onPress={openDetailPage}
                disabled={!isPressTitle}
                style={{ alignSelf: "flex-start", flex: 1 }}
              >
                <ShopTitle numberOfLines={2}>{item.name}</ShopTitle>
              </TouchableOpacity>
              {/* rating */}
              <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                <FastImage 
                  style={{ width: 14, height: 14, marginRight: 2, marginLeft: 5 }}
                  source={require('../../assets/icons/icon-star.png')} 
                />
                <Text style={{ fontWeight: 'bold', marginRight: 2 }}>{item.approved_comments_with_show_avg_stars.toFixed(1)}</Text>
                <Text>({item.approved_comments_with_show_count})</Text>
              </View>
            </View>
            {/* location */}
            {item.district?.name &&
              <Text style={{ color: "#7F7F7F", fontSize: 12, marginTop: 8 }} numberOfLines={1}>{`${item.district.name}/ ${t("shopItem_distancePre")}${item.distance_in_km.toFixed(1)}${t("shopItem_distanceSuf")}`}</Text>
            }
          </View>
          {/* type */}
          {item.filters?.length > 0 &&
          <ScrollView style={{ marginTop: "auto" }} horizontal contentContainerStyle={{ paddingHorizontal: 11 }} showsHorizontalScrollIndicator={false} bounces={false}>
            <View style={{ flexDirection: "row", marginTop: "auto" }}>
                {item.filters.map((item: any) => {
                  return (
                    <Tag tag={item} style={{ marginRight: 5, paddingHorizontal: 5, paddingVertical: 4, fontSize: 12 }} />
                  )
                })}
              </View>
          </ScrollView>
          }
        </View>
      </ShopItemLargeContainer>
    </View>
  );
}

export function ShopItemRow({ item, style }: { item: any, style?: any })  {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const openDetailPage = () => {
    navigation.push("ShopDetail", { id: item.id })
  }

  return (
    <View
      style={{
        paddingVertical: 10,
        ...style
      }}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={openDetailPage}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <FastImage
          style={{ width: 50, height: 50 }}
          resizeMode="cover"
          source={{ uri: item.cover_image }} 
        />
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* title */}
            <TouchableOpacity
              onPress={openDetailPage}
              style={{ alignSelf: "flex-start", flex: 1 }}
            >
              <ShopTitle numberOfLines={1}>{item.name}</ShopTitle>
            </TouchableOpacity>
            {/* rating */}
            <View style={{ flexDirection: "row", marginLeft: "auto", alignItems: "center" }}>
              <FastImage 
                style={{ width: 14, height: 14, marginRight: 2, marginLeft: 5 }}
                source={require('../../assets/icons/icon-star.png')} 
              />
              <Text style={{ fontWeight: 'bold', marginRight: 2 }}>{item.approved_comments_with_show_avg_stars.toFixed(1)}</Text>
              <Text>({item.approved_comments_with_show_count})</Text>
            </View>
          </View>
          {/* location */}
          {item.district?.name &&
            <Text style={{ color: "#7F7F7F", fontSize: 12, marginTop: 4 }}>{item.district.name}</Text>
          }
        </View>
      </TouchableOpacity>
    </View>
  );
}

export function ShopItem({ item, style }: { item: any, style?: any })  {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  
  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width: 144, 
        height: 144,
        ...style
      }}
    >
      <ShopItemContainer
        activeOpacity={0.6}
        style={{ 
          width: "100%", 
          height: "100%",
          backgroundColor: 'white',
          elevation: 2,
        }}
        onPress={() => navigation.push("ShopDetail", { id: item.id })}
      >
        <FastImage
          style={{ width: "100%", height: "50%" }}
          resizeMode="cover"
          source={{ uri: item.cover_image }} 
        />
        <View style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 5 }}>
          <View style={{ flex: 1 }}>
            <ShopTitle numberOfLines={1}>{item.name}</ShopTitle>
            {/* {item.district?.name &&
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Icon
                  size={12}
                  icon={require("../../assets/icons/icon-location2.png")}
                />
                <Text numberOfLines={1} style={{ fontSize: 12 }}>{item.district.name}</Text>
              </View>
            } */}
            {item.district?.name &&
              <Text numberOfLines={1} style={{ color: "#7F7F7F", fontSize: 12, marginTop: 4 }}>{item.district.name}</Text>
            }
          </View>
          <View style={{ flexDirection: "row", marginTop: "auto" }}>
            <FastImage 
              style={{ width: 14, height: 14, marginRight: 4 }}
              source={require('../../assets/icons/icon-star.png')} 
            />
            <Text style={{ fontWeight: 'bold', marginRight: 3 }}>{item.approved_comments_with_show_avg_stars.toFixed(1)}</Text>
            <Text>({item.approved_comments_with_show_count})</Text>
          </View>
        </View>
      </ShopItemContainer>
    </View>
  );
}

