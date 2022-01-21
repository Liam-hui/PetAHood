import React, { useState, useRef, useEffect } from 'react';
import { Text, View } from 'react-native';

import { RootState } from '@/store';
import { useAppSelector } from '@/hooks';
import { HotPicksContainer } from './styles';
import Icon from '@/components/Icon';
import FastImage from 'react-native-fast-image';
import Colors from '@/constants/Colors';

const items = [
  { title: 'Neighbourhood Coffee', rating: 3.7, comments: 10 },
  { title: 'Meng Store', rating: 3.7, comments: 10 },
  { title: 'momomade.hk', rating: 3.7, comments: 10 },
  { title: 'Paws Up', rating: 3.7, comments: 10 },
  { title: 'Queens Pet', rating: 3.7, comments: 10 }
]

export default function HotPicks() {

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
        {items.map((item, index) => {
          // const color = index < 2 ? Colors.orange : 
          return (
            <View style={{ flexDirection: "row", marginVertical: 8 }}>
              <Text style={{ color: index < 2 ? Colors.orange : "#999999", fontWeight: "bold" }}>{index}</Text>
              <Text numberOfLines={1} style={{ flex: 1, marginLeft: 20, color: index < 2 ? Colors.orange : "black", fontWeight: "bold" }}>{item.title}</Text>
              <FastImage 
                style={{ width: 14, height: 14, marginRight: 4 }}
                source={require('../../assets/icons/icon-star.png')} 
              />
              <Text style={{ fontWeight: 'bold', marginRight: 3 }}>{item.rating.toFixed(1)}</Text>
              <Text>({item.comments})</Text>
            </View>
          )
        })}
      </View>
    </HotPicksContainer>
  );
}


