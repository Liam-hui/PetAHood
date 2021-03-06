import React from 'react';
import { View, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Colors from '@/constants/Colors';

import Icon from './Icon';

export default function SearchBar({ value, placeholder, onChangeText, onSubmit, isSelected, select, unselect, isTextDisabled, inputRef, isIconHidden, style }: { value: string, placeholder: string, onChangeText?: (text: string) => void, onSubmit?: () => void, isSelected?: boolean, isIconHidden?: boolean, select?: () => void, unselect?: () => void, style?: object, isTextDisabled?: boolean, inputRef?: any }) {

  return (
    <View
      style={{ 
        flexDirection: "row",
        alignItems: "center",
        height: 32,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: isSelected ? Colors.orange : "#E5E5E5",
        backgroundColor: isSelected ? "white" : "#E5E5E5",
        paddingHorizontal: 10,
        ...style! 
      }}
    >
 
      <View style={{ flex: 1 }}>
        <TextInput
          ref={inputRef?? null}
          style={{ flex: 1, height: "100%", fontSize: 16, color: "black" }}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          onFocus={select}
          value={value}
          editable={!isTextDisabled}
          caretHidden={isTextDisabled}
          showSoftInputOnFocus={!isTextDisabled}
          returnKeyType="search"
          pointerEvents={isTextDisabled ? "none" : "auto"}
        />
        {isTextDisabled && select &&
          <TouchableOpacity
            activeOpacity={1}
            style={{ position: "absolute", width: "100%", height: "100%" }}
            onPress={select}
          />
        }
      </View>

      {!isIconHidden && <>
        {isSelected
          ? <Icon
              icon={require(`../assets/icons/icon-close.png`)}
              size={12}
              style={{ zIndex: 10, paddingHorizontal: 9, paddingVertical: 4 }}
              onPress={() => {
                Keyboard.dismiss();
                unselect && unselect();
              }}
            />
          : <Icon
              icon={require(`../assets/icons/icon-search.png`)}
              size={16}
              style={{ paddingHorizontal: 5 }}
              onPress={onSubmit ?? select}
            />
        }
      </>}

    </View>
  );
}

