import React, { useState, useRef, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { HotPicksContainer } from './styles';
import Icon from '@/components/Icon';
import FastImage from 'react-native-fast-image';
import Colors from '@/constants/Colors';

export default function HotPicks({ data }: { data: any[] }) {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <HotPicksContainer>
      <View style={{ flexDirection: "row", backgroundColor: Colors.orange, width: "100%", alignItems: "center", paddingVertical: 8, paddingHorizontal: 15 }}>
        <Icon
          icon={require(`../../assets/icons/icon-hotPicks.png`)}
          size={24}
        />
        <Text style={{ fontWeight: "bold", color: "white", marginLeft: 10 }}>Hot Picks</Text>
      </View>
      <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
        {data.map((item, index) => {
          return (
            <View key={item.id} style={{ flexDirection: "row", marginVertical: 8 }}>
              <View>
                <FastImage 
                  style={{ width: 84, height: 62, marginRight: 4, borderRadius: 13 }}
                  source={{ uri: item.cover_image }} 
                />
                <View
                  style={{
                    borderTopLeftRadius: 13,
                    borderBottomRightRadius: 13,
                    width: 25,
                    height: 25,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: Colors.orange,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                   <Text style={{ fontWeight: "bold", color: "white" }}>{index + 1}</Text>
                </View>
              </View>
              <View style={{ flex: 1, paddingLeft: 15 }}>
                {/* title */}
                <TouchableOpacity 
                  style={{ }}
                  onPress={() => navigation.push("ShopDetail", { id: item.id })}
                >
                  <Text numberOfLines={1} style={{ color: index < 3 ? Colors.orange : "black", fontWeight: "bold" }}>{item.name}</Text>
                </TouchableOpacity>
                {/* type */}
                {item.need_types && item.need_types.length > 0 &&
                  <Text style={{ color: "#B2B2B2", fontWeight: "bold", marginTop: 5, fontSize: 13 }}>{item.need_types[0].name}</Text>
                }
                {/* rating */}
                <View style={{ flexDirection: "row", marginTop: "auto" }}>
                  <FastImage 
                    style={{ width: 14, height: 14, marginRight: 2 }}
                    source={require('../../assets/icons/icon-star.png')} 
                  />
                  <Text style={{ fontWeight: 'bold', marginRight: 2, fontSize: 13 }}>{item.approved_comments_with_show_avg_stars.toFixed(1)}</Text>
                  <Text style={{ fontSize: 13 }}>({item.approved_comments_with_show_count})</Text>
                </View>
              </View>
             
           
            </View>
          )
        })}
      </View>
    </HotPicksContainer>
  );
}


