import React from 'react';
import { View, ImageSourcePropType, TouchableOpacity } from 'react-native';
import Icon from '@/components/Icon';

import { HeadingText } from './styles';
import FastImage, { Source } from 'react-native-fast-image';
import Layout from '@/constants/Layout';

export default function Adv({ data }: { data: any[] }) {
   
  if (!data || data!.length! == 0) return null;
  return (
    <View style={{ backgroundColor: "white", width: "100%", paddingHorizontal: Layout.page.paddingHorizontal, paddingTop: 15 }}>
      <TouchableOpacity 
        style={{ width: "100%", height: (Layout.window.width - Layout.page.paddingHorizontal * 0.5) * 0.233 }}
      >
        <FastImage
          style={{ width: "100%", height: "100%" }}
          source={{ uri: data[0]?.image[0]?.path }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};