import React from 'react';
import { View, ImageSourcePropType } from 'react-native';
import Icon from '@/components/Icon';
import { SvgUri } from 'react-native-svg';

import { HeadingText } from './styles';

export default function Heading({ icon, svgIcon, text, style }: { icon?: ImageSourcePropType, svgIcon?: string, text: string, style?: object }) {
  return (
    <View style={{ flexDirection: "row", marginVertical: 10, alignItems: "center", ...style! }}>
      {icon && <Icon
        size={20}
        style={{ marginRight: 4 }}
        icon={icon} 
      />}
      {svgIcon && <SvgUri
        width={20}
        height={20}
        style={{ marginRight: 4 }}
        uri={svgIcon}
      />}
      <HeadingText>{text}</HeadingText>
    </View>
  );
};