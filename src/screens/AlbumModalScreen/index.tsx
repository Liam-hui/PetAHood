import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, TouchableOpacity, ScrollView  } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image'

import { RootStackScreenProps } from '@/types';
import Layout from '@/constants/Layout';

export default function AlbumModalScreen(props: RootStackScreenProps<'AlbumModal'>) {

  const { images, index } = props.route.params;
  const [activeIndex, setActiveIndex] = useState(index ?? 0);
  const carouselRef = useRef<Carousel<any> | null>(null);
  const scrollRef = useRef<ScrollView | null>(null);
  const [scrollXPos, setScrollXPos] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (index)
        scrollRef.current!.scrollTo({
          x: index * 100,
          y: 0,
          animated: true,
        });
    }, 100)
  }, [])

  const renderItem = ({ item } : { item: any }) => {
    return (
      <FastImage
        style={{ width: "100%", height: "100%" }} 
        source={{ uri: item }}
        resizeMode="contain"
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ flex: 1, paddingVertical: 15 }}>
        <Carousel
          firstItem={index ?? 0}
          ref={(c) => { carouselRef.current = c; }}
          data={images}
          renderItem={renderItem}
          sliderWidth={Layout.window.width}
          itemWidth={Layout.window.width}
          removeClippedSubviews={false}
          onSnapToItem={(index) => {
            const pos = index * 100;
            if ((pos - 20) < scrollXPos) {
              scrollRef.current!.scrollTo({
                x: pos - 20,
                y: 0,
                animated: true,
              });
            }
            else if ((pos - scrollXPos) > (Layout.window.width - 100 - 20)) {
              scrollRef.current!.scrollTo({
                x: pos - Layout.window.width + 100 + 20,
                y: 0,
                animated: true,
              });
            }
            setActiveIndex(index);
          }}
        />
      </View>
      <View style={{ height: 80 }}>
        <ScrollView 
          ref={scrollRef}
          horizontal 
          contentContainerStyle={{ flexDirection: "row" }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={500}
          onScroll={(event: any) => {
            setScrollXPos(event.nativeEvent.contentOffset.x);
          }}
        >
          {images.map((image: any, index) => 
            <TouchableOpacity 
              key={index}
              style={{ width: 100, paddingHorizontal: 5 }} 
              activeOpacity={0.5}
              onPress={() => carouselRef.current!.snapToItem(index, true) }
            >
              <FastImage
                style={{ width: "100%", height: "100%", opacity: index == activeIndex ? 1 : 0.25 }} 
                source={{ uri: image }}
              /> 
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
