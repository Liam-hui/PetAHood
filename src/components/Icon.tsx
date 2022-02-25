import * as React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';

export default function Icon({ icon, size, onPress, style }: { icon: number | Source; size: number, onPress?: () => void, style?: object }) {
  if (onPress != null) return (
    <TouchableOpacity onPress={onPress} style={style!}>
      <FastImage 
        style={{ height: size, width: size }}
        resizeMode="contain"
        source={icon} 
      />
    </TouchableOpacity>
  );
  else return (
    <FastImage 
      style={{ height: size, width: size, ...style! }}
      resizeMode="contain"
      source={icon} 
      // defaultSource={}
    />  
  );
}

