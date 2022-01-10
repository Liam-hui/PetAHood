import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';

import Icon from './Icon';

export default function SearchBar({ value, placeholder, onChangeText, onSubmit, isSelected, select, unselect, style }: { value: string, placeholder: string, onChangeText: (text: string) => void, onSubmit: () => void, isSelected?: boolean, select?: () => void, unselect?: () => void, style?: object }) {

  return (
    <View 
      style={{ 
        flexDirection: "row",
        alignItems: "center",
        height: 32,
        borderRadius: 24,
        borderWidth: isSelected ? 1 : 0,
        borderColor: isSelected ? Colors.orange : "#E5E5E5",
        backgroundColor: isSelected ? "white" : "#E5E5E5",
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
        placeholder={placeholder}
        placeholderTextColor="#999999"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        onFocus={select}
        value={value}
      />
      {isSelected
        ? <Icon
            icon={require(`../assets/icons/icon-close.png`)}
            size={12}
            style={{ marginHorizontal: 5 }}
            onPress={unselect}
          />
        : <Icon
            icon={require(`../assets/icons/icon-search.png`)}
            size={16}
            style={{ marginHorizontal: 5 }}
            onPress={onSubmit}
          />
      }
    </View>
  );
}

