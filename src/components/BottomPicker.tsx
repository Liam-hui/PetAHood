import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Styles from '@/constants/Styles';
import React, { useState } from 'react';
import {  ActivityIndicator, FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from './Icon';

interface BottomPickerProps {
  isVisible: boolean,
  close: () => void,
  select: (value: any) => void,
  items: { value: any, label: string }[],
  value: any,
  selected?: any
}

export default function BottomPicker(props: BottomPickerProps) {

  const { isVisible, close, items, select, value } = props;
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={{
        height: 30,
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 10,
      }}
      onPress={() => {
        select(item.value);
        close();
      }}
    >
      <Text style={{ color: "#999999", fontSize: 14, flex: 1, fontWeight: item.value == value ? "bold" : "normal" }} numberOfLines={1} >{item.label}</Text>
      {item.value == value &&
        <Icon
          icon={require(`@/assets/icons/icon-tick.png`)}
          size={12}
        />
      }
    </TouchableOpacity>
  );
  
  return (
    <Modal 
      isVisible={isVisible} 
      onSwipeComplete={close}
      swipeDirection={['down']}
      propagateSwipe
      style={{ 
        margin: 0,
        justifyContent: 'flex-end',
      }}
    >
      <TouchableOpacity 
        activeOpacity={1}
        style={{ position: "absolute", width: "100%", height: "100%"}} 
        onPress={close}
      />
      <View 
        style={{ 
          height: 300,
          backgroundColor: "white", 
          borderRadius: 10
        }}
      >
        <FlatList 
          contentContainerStyle={{ 
            paddingHorizontal: Layout.page.paddingHorizontal,
            paddingTop: 15,
            paddingBottom: insets.bottom + 15
          }}
          data={items}
          keyExtractor={((item: any, index: number) => String(index))}
          renderItem={renderItem}
          initialScrollIndex={items.findIndex((x: any) => x.value == value)}
          getItemLayout={(data, index) => (
            { length: 30, offset: 30 * index, index }
          )}
        />
      </View>

    </Modal>
  );
}
