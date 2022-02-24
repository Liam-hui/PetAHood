import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from './Icon';

export default function Checkbox({ value, size, onPress, style }: { value: boolean, size: number, onPress?: () => void, style?: object }) {

  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={{
        width: size,
        height: size,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        ...style
      }}
    >
      <Icon
        icon={require("@/assets/icons/icon-tick.png")}
        size={size * 0.6}
        style={{ opacity: value ? 1 : 0 }}
      />
    </TouchableOpacity>
  );
}

