import React, { useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import { View, Text, ScrollView, ImageSourcePropType, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { t } from 'i18next';

import { useAppSelector, useAppDispatch } from '@/hooks';
import { RootState } from '@/store';
import { FilterNameType, FilterType, SortingType } from '@/types';
import Colors from '@/constants/Colors';
import Icon from '@/components/Icon';
import { Border, MenuHeading, FilterItem, FilterItemText, MenuItemText } from './styles';
import WideButton from '@/components/WideButton';

const SortingModal = ({ isVisible, close, sorting, setSorting } : { isVisible: boolean, close: () => void, sorting: SortingType | null, setSorting: Dispatch<SetStateAction<SortingType | null>> })  => {

  const SortItem = ({ value }: { value: SortingType }) => {
    return (
      <TouchableOpacity
        style={{ height: 30, alignItems: "center", flexDirection: "row"}}
        onPress={() => {
          setSorting(sorting == value ? null : value);
        }}
      >
        <MenuItemText style={{}}>{t(`sort_${value}`)}</MenuItemText>
        <ChooseCircle isChosen={sorting == value}/>
      </TouchableOpacity>
    )
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
      }}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 25 }}>
          <View style={{ flexDirection: "row", marginVertical: 15, alignItems: "center", justifyContent: "center" }}>
            <MenuHeading>{t("search_sortBy")}</MenuHeading>
            <Icon
              size={17}
              icon={require("@/assets/icons/icon-close-black.png")}
              style={{ position: "absolute", right: 0 }}
              onPress={close}
            />
          </View>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} bounces={false}>
            <SortItem value="rating" />
            <Border/>
            <SortItem value="new" />
            <Border/>
            <SortItem value="az" />
            <Border/>
            <SortItem value="za" />
            <Border/>
            <SortItem value="comment" />
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const ChooseCircle = ({ isChosen }: { isChosen: boolean }) => {
  return (
    <View style={{ borderWidth: 2, borderColor: Colors.darkOrange, width: 16, height: 16, borderRadius: 8, justifyContent: "center", alignItems: "center", marginLeft: "auto", marginRight: 10 }}>
      <View style={{ backgroundColor: Colors.darkOrange, width: 8, height: 8, borderRadius: 4, opacity: isChosen ? 1 : 0 }} />
    </View>
  )
}

export default SortingModal;