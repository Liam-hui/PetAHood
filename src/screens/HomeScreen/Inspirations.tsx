import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Heading from './Heading';

import { InspirationContainer, InspirationText } from './styles';

export default function Inspirations({ data }: { data: any[] }) {

  const [activeSlide, setActiveSlide] = useState(0);
  const width = Layout.window.width - 40;

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
      <View style={{ width: width, borderRadius: 12, overflow: "hidden" }}>
        {itemGroup.map((item, index) =>
          <Inspiration key={item.id} item={item} style={index == 1 ? { marginVertical: 2 } : {}} />
        )}
      </View>
    ) 
  }

  return (
    <>
      <Heading text="Find Inspiration" icon={require('../../assets/icons/icon-claw.png')} />
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
  console.log(item.image);
  return (
    <InspirationContainer as={TouchableOpacity} activeOpacity={0.6} style={style!} >
      <Image 
        style={{ width: "100%", height: "100%", position: "absolute" }}
        resizeMode="cover"
        source={require('../../assets/images/place.jpg')} 
        // source={{ uri: item.image }} 
      />
      <InspirationText>{item.title}</InspirationText>
    </InspirationContainer>
  );
  }