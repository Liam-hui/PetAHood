

import React from 'react';
import Layout from '@/constants/Layout';
import { Image, ImageSourcePropType } from 'react-native';

import { ButtonsContainer, ButtonLabel, ButtonContainer } from './styles';
import FastImage from 'react-native-fast-image';

export default function Buttons({ data }: { data: any[] }) {

  return (
    <ButtonsContainer style={{ paddingLeft: Layout.page.paddingHorizontal }}>
      {data.map(row => {
        return (
          row.btns.map((item: any, index: number) =>
            <ButtonItem
              key={index}
              label={item.name}
              icon={item.icon} 
              onPress={() => {}}
            />
          )
        )
      })}
    </ButtonsContainer>
  );
}

const ButtonItem = ({ label, icon, onPress }: { label: string, icon: string, onPress: () => void }) => {
  const margin = 10;
  return (
    <ButtonContainer style={{ width: (Layout.window.width - Layout.page.paddingHorizontal * 2 - margin * 3 ) / 4, marginRight: margin }} onPress={onPress} activeOpacity={0.6} >
      <FastImage 
        style={{ height: 34, width: 34, marginBottom: 5 }}
        resizeMode="contain"
        source={{ uri: icon }} 
      />
      <ButtonLabel>{label}</ButtonLabel>
    </ButtonContainer>
  )
}
