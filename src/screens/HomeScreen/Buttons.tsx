

import React from 'react';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Layout from '@/constants/Layout';
import { ButtonsContainer, ButtonLabel, ButtonContainer } from './styles';

const PADDING = 25;
const MARGIN = 14;

export default function Buttons({ data }: { data: any[] }) {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <ButtonsContainer style={{ paddingLeft: PADDING }}>
      {data.map(row => {
        return (
          row.btns.map((item: any, index: number) =>
            <ButtonItem
              key={index}
              label={item.name}
              icon={item.icon} 
              onPress={() => {
                if (item.target)
                  navigation.push("WebView", { url: item.target });
              }}
            />
          )
        )
      })}
    </ButtonsContainer>
  );
}

const ButtonItem = ({ label, icon, onPress }: { label: string, icon: string, onPress: () => void }) => {
  return (
    <ButtonContainer style={{ width: (Layout.window.width - PADDING * 2 - MARGIN * 3 ) / 4, marginRight: MARGIN }} onPress={onPress} activeOpacity={0.6} >
      <FastImage 
        style={{ height: 30, width: 30, marginBottom: 5 }}
        resizeMode="contain"
        source={{ uri: icon }} 
      />
      <ButtonLabel>{label}</ButtonLabel>
    </ButtonContainer>
  )
}
