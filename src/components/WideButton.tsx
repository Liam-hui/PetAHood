import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';

export default function WideButton({ text, onPress, style }: { text: string, onPress: () => void, style?: object }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={{
        // width: "100%",
        height: 55,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.orange,
        ...style! 
      }}
    >
      <Text
        style={{ fontSize: 16, fontWeight: "700", color: "white" }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
