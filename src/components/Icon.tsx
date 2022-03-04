import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import { SvgUri } from 'react-native-svg';

export default function Icon({ icon, size, onPress, style }: { icon: number | Source; size: number, onPress?: () => void, style?: object }) {

  const IconImage = ({ style }: { style?: object }) => {
    return (
      typeof icon != 'number' && icon?.uri?.endsWith("svg")
        ? <SvgUri
            width={size}
            height={size}
            style={{ ...style! }}
            uri={icon.uri}
          />
        : <FastImage 
            style={{ height: size, width: size, ...style! }}
            resizeMode="contain"
            source={icon}
          />
    )
  }

  if (onPress != null) return (
    <TouchableOpacity onPress={onPress} style={style!}>
      <IconImage/>
    </TouchableOpacity>
  );
  else return (
    <IconImage style={style!}/>
  );
}

