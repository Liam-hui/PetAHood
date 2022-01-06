import * as React from 'react';
import { View, TextInput } from 'react-native';

import Icon from './Icon';

export default function SearchBar({ value, onChangeText, style }: { value: string, onChangeText: (text: string) => void, style?: object }) {
  return (
    <View 
      style={{ 
        flexDirection: "row",
        alignItems: "center",
        height: 32,
        borderRadius: 24,
        backgroundColor: "#E5E5E5",
        paddingHorizontal: 10,
        ...style! 
      }}
    >
      <TextInput
        style={{
          flex: 1,
          height: "100%",
          fontSize: 16
        }}
        placeholder="Search..."
        placeholderTextColor="#999999"
        onChangeText={onChangeText}
        value={value}
      />
      <Icon
        icon={require(`../assets/icons/icon-search.png`)}
        size={16}
        style={{ marginHorizontal: 5 }}
        // onPress=
      />
    </View>
  );
}

