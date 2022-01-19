import * as React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ShopItemLargeContainer, ShopItemContainer, ShopTitle } from './styles';

export function ShopItemLarge({ item, style }: { item: any, style?: any })  {

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
        ...style
      }}
    >
      <ShopItemLargeContainer
        activeOpacity={0.6}
        style={{ elevation: 2 }}
        onPress={() => navigation.push("ShopDetail", { id: item.id })}
      >
        <FastImage
          style={{ width: 112, height: 112 }}
          resizeMode="cover"
          source={{ uri: item.cover_image }} 
        />
        <View style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 8 }}>
          <ShopTitle numberOfLines={2}>{item.name}</ShopTitle>
          <View style={{ flexDirection: "row" }}>
            <Image 
              style={{ width: 14, height: 14, marginRight: 4 }}
              source={require('../../assets/icons/icon-star.png')} 
            />
            <Text style={{ fontWeight: 'bold', marginRight: 3 }}>{item.approved_comments_with_show_avg_stars.toFixed(1)}</Text>
            <Text>({item.approved_comments_with_show_count})</Text>
          </View>
        </View>
      </ShopItemLargeContainer>
    </View>
  );
}

export function ShopItem({ item, style }: { item: any, style?: any })  {

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
        ...style
      }}
    >
      <ShopItemContainer
        activeOpacity={0.6}
        style={{ 
          width: 144, 
          height: 144,
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
        <View style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 8 }}>
          <ShopTitle numberOfLines={2}>{item.name}</ShopTitle>
          <View style={{ flexDirection: "row" }}>
            <Image 
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

