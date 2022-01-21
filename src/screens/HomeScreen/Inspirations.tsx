import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';

import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import Heading from './Heading';

import { InspirationContainer, InspirationText } from './styles';

export default function Inspirations({ data }: { data: any[] }) {

  const { t } = useTranslation();

  const [activeSlide, setActiveSlide] = useState(0);
  const width = Layout.window.width;

  const groupData = (data: any[]) => {
    let data_: any[] = [];
    for (let i = 0; i < data.length; i += 3) {
      let itemGroup: any[] = [];
      for (let j = 0; j < 3; j ++) {
        if ((i + j) < data.length)
          itemGroup.push(data[i + j])
      }
      data_.push(itemGroup)
    }
    return data_;
  };
  data = groupData(data);

  const renderItem = ({ item: itemGroup } : { item: any[] }) => {
    return (
      <View style={{ width: width, paddingHorizontal: Layout.page.paddingHorizontal }}>
        <View style={{ borderRadius: 12, overflow: "hidden" }}>
          {itemGroup.map((item, index) =>
            <Inspiration key={item.id} item={item} style={index == 1 ? { marginVertical: 2 } : {}} />
          )}
        </View>
      </View>
    ) 
  }

  return (
    <>
      <Heading text={t("home_findInspiration")} icon={require('../../assets/icons/icon-claw.png')} style={{ marginLeft: Layout.page.paddingHorizontal }} />
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setActiveSlide(index) }
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{ 
          margin: 0,
          paddingVertical: 15
        }}
        dotContainerStyle={{
          marginHorizontal: 4,
        }}
        dotStyle={{
          width: 9,
          height: 9,
          borderRadius: 4.5,
          backgroundColor: Colors.red
        }}
        inactiveDotOpacity={0.3}
        inactiveDotScale={1}
      />
    </>
  );
}

const Inspiration = ({ item, style }: { item: any, style?: object }) => {
  
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <InspirationContainer 
      as={TouchableOpacity} 
      activeOpacity={0.6} 
      style={style!} 
      onPress={() => navigation.push("Blog", { id: item.id })}
    >
      <FastImage 
        style={{ width: "100%", height: "100%", position: "absolute" }}
        resizeMode="cover"
        source={{ uri: item.image }} 
      />
       <View
        style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      />
      {/* <BlurView
        style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
        blurType='regular'
        blurAmount={1}
        downsampleFactor={1}
        blurRadius={20}
      /> */}
      {/* <BlurView
        style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
        blurAmount={1}
        blurType='regular'
        // blurRadius={20}
      /> */}
      <InspirationText>{item.title}</InspirationText>
    </InspirationContainer>
  );
  }