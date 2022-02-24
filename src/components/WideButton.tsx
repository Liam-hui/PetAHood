import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';

export default function WideButton({ text, children, onPress, color, style, isBorder }: { text?: string, children?: React.ReactNode, onPress: () => void, isBorder?: boolean, color?: string, style?: object }) {
  
  if (!color) 
    color = Colors.orange;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={{
        // width: "100%",
        height: 55,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: color,
        ... isBorder && {
          backgroundColor: "white",
          borderColor: color,
          borderWidth: 1
        },
        ...style! 
      }}
    >
      {text &&
        <Text
          style={{ fontSize: 16, fontWeight: "700", color: isBorder ? color : "white" }}
        >
          {text}
        </Text>
      }
      {children!}
    </TouchableOpacity>
  );
}
