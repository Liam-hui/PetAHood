import React from 'react';
import FastImage from 'react-native-fast-image'
import Layout from '@/constants/Layout';
import Carousel from 'react-native-snap-carousel';

export default function Banners({ data }: { data: any[] }) {

  const renderItem = ({ item } : { item: any }) => {
    return (
      <FastImage style={{ width: Layout.window.width, height: Layout.window.width * 160 / 375 }} source={{ uri: item.image }} />
    ) 
  }

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={Layout.window.width}
      itemWidth={Layout.window.width}
      inactiveSlideScale={1}
      removeClippedSubviews={false}
    />
  );
}
