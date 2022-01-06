import * as React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity } from 'react-native';

export default function Icon({ icon, size, onPress, style }: { icon: ImageSourcePropType; size: number, onPress?: () => void, style?: object }) {
  if (onPress != null) return (
    <TouchableOpacity onPress={onPress} style={style!}>
      <Image 
        style={{ height: size, width: size }}
        resizeMode="contain"
        source={icon} 
      />
    </TouchableOpacity>
  );
  else return (
    <Image 
      style={{ height: size, width: size, ...style! }}
      resizeMode="contain"
      source={icon} 
    />  
  );
}

