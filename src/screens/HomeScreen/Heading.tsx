import React from 'react';
import { View, ImageSourcePropType } from 'react-native';
import Icon from '@/components/Icon';

import { HeadingText } from './styles';
import { Source } from 'react-native-fast-image';

export default function Heading({ icon, text, style }: { icon?: Source | number, text: string, style?: object }) {
  return (
    <View style={{ flexDirection: "row", marginVertical: 10, alignItems: "center", ...style! }}>
      {icon && <Icon
        size={20}
        style={{ marginRight: 4 }}
        icon={icon} 
      />}
      <HeadingText>{text}</HeadingText>
    </View>
  );
};