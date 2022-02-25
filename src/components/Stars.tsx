import * as React from 'react';
import { View } from 'react-native';
import Icon from './Icon';

const Stars = ({ stars, size }: { stars: number, size?: number }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(5)].map((_, i) =>
        <Icon
          key={i}
          icon={
            stars > i 
            ? require(`@/assets/icons/icon-star.png`)
            : require(`@/assets/icons/icon-starEmpty.png`)
          }
          size={size ?? 15}
          style={{ marginRight: 2 }}
        />
      )}
    </View>
  )
}

export default Stars;

