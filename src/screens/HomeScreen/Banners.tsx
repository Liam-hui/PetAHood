import React from 'react';
import { Image } from 'react-native';
import Layout from '@/constants/Layout';
import Carousel from 'react-native-snap-carousel';

export default function Banners({ data }: { data: any[] }) {

  const renderItem = ({ item } : { item: any }) => {
    return (
      <Image style={{ width: Layout.window.width, height: Layout.window.width * 160 / 375 }} source={{ uri: item.image }} />
    ) 
  }

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={Layout.window.width}
      itemWidth={Layout.window.width}
      inactiveSlideScale={1}
    />
  );
}
