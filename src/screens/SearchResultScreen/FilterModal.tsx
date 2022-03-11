import React, { useState, useEffect, useMemo, useRef, useCallback, useLayoutEffect } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { t } from 'i18next';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from "@gorhom/bottom-sheet";

import { useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { FilterNameType, FilterType } from '@/types';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Icon from '@/components/Icon';
import HideAndShow from '@/components/HideAndShow';
import { Border, MenuHeading, MenuItemText, FilterItem, FilterItemText, Dropdown } from './styles';
import WideButton from '@/components/WideButton';
import { Source } from 'react-native-fast-image';
import { Picker, PickerIOS } from '@react-native-community/picker';
import BottomSheet from '@/components/BottomSheet';
import { Filter } from '@/components/Filter';

const FilterModal = ({ filter, updateFilter, resetFilter, isVisible, close, confirm } : { filter: FilterType, updateFilter: (filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean) => void, resetFilter: () => void, isVisible: boolean, close: () => void, confirm: () => void })  => {

  const insets = useSafeAreaInsets();
  const filterList = useAppSelector((state: RootState) => state.shopSearch.filterList);
  const filterCount = Object.values(filter).reduce(
    (prev, current) => {
      return prev + current.length
    }, 
    0
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
      }}
    >
      <View style={{ flex: 1, backgroundColor: "white", overflow: 'visible' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", marginVertical: 15, alignItems: "center", justifyContent: "center" }}>
            <MenuHeading>{t("search_filterBy")}</MenuHeading>
            <Icon
              size={17}
              icon={require("@/assets/icons/icon-close-black.png")}
              style={{ position: "absolute", right: 15 }}
              onPress={close}
            />
          </View>
          <Filter filter={filter} updateFilter={updateFilter} />
          <View style={{ paddingHorizontal: Layout.page.paddingHorizontal }}>
            <WideButton
              text={t('search_search') + (filterCount > 0 ? ` (${filterCount})` : "")}
              onPress={() => {
                confirm();
                close();
              }}
              color={Colors.darkOrange}
            />
            <WideButton
              isBorder
              text={t("reset")}
              onPress={resetFilter}
              color={Colors.darkOrange}
              style={{
                marginTop: 15,
                marginBottom: 20,
              }}
            />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}



export default FilterModal;