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

const FilterModal = ({ filter, updateFilter, resetFilter, isVisible, close, confirm } : { filter: FilterType, updateFilter: (filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean) => void, resetFilter: () => void, isVisible: boolean, close: () => void, confirm: () => void })  => {

  const insets = useSafeAreaInsets();

  const filterList = useAppSelector((state: RootState) => state.shopSearch.filterList);

  const filterCount = Object.values(filter).reduce(
    (prev, current) => {
      return prev + current.length
    }, 
    0
  );

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [pickerData, setPickerData] = useState<any>(null);
  const openPicker = (data: any) => {
    setPickerData(data);
    setIsPickerVisible(true);
  }
  const closePicker = () => {
    setIsPickerVisible(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
      }}
    >
      <View style={{ flex: 1, backgroundColor: "white", overflow: 'visible' }}>
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 25 }}>
          <View style={{ flexDirection: "row", marginVertical: 15, alignItems: "center", justifyContent: "center" }}>
            <MenuHeading>{t("search_filterBy")}</MenuHeading>
            <Icon
              size={17}
              icon={require("@/assets/icons/icon-close-black.png")}
              style={{ position: "absolute", right: 0 }}
              onPress={close}
            />
          </View>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20, minHeight: Layout.window.height - insets.top - insets.bottom - 210 }} showsVerticalScrollIndicator={false} >
            <FilterPickerWithSubcat 
              filter={filter}
              filterName="districts"
              updateFilter={updateFilter}
              name={t("search_area")}
              icon={require(`@/assets/icons/icon-location-black.png`)}
              data={filterList.districts}
              openPicker={openPicker}
            />
            <Border/>
            <FilterPicker 
              filter={filter}
              filterName="petTypes"
              updateFilter={updateFilter}
              name={t("search_petTypes")}
              icon={require(`@/assets/icons/icon-petType-black.png`)}
              data={filterList.petTypes}
            />
            <Border/>
            <FilterPickerWithSubcat 
              filter={filter}
              filterName="needTypes"
              updateFilter={updateFilter}
              name={t("search_needTypes")}
              icon={require(`@/assets/icons/icon-needType-black.png`)}
              data={filterList.needTypes}
              openPicker={openPicker}
            />
            <Border/>
            <FilterPicker 
              filter={filter}
              filterName="specialCats"
              updateFilter={updateFilter}
              name={t("search_specialCats")}
              icon={require(`@/assets/icons/icon-specialType-black.png`)}
              data={filterList.specialCats}
            />
          </ScrollView>
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
        </SafeAreaView>
      </View>
      <BottomSheet
        points={[300]}
        isOpen={isPickerVisible}
        close={() => setIsPickerVisible(false)}
      >
        {pickerData && <PickerMenu data={pickerData} close={closePicker} />}
      </BottomSheet>
    </Modal>
  );
}

const PickerMenu = ({ data, close }: { data: any | null, close: () => void }) => {

  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(data.selected);

  const listRef = useRef<BottomSheetFlatListMethods>(null);

  const scrollToSelected = useCallback(() => {
    listRef.current?.scrollToIndex({ index: data.items.findIndex((x: any) => x.value == selected) });
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={{
          height: 30,
          flexDirection: 'row',
          alignItems: "center",
          paddingHorizontal: 10,
        }}
        onPress={() => {
          setSelected(item.value);
          data.selectItem(item.value);
          close();
        }}
      >
        <Text style={{ color: "#999999", fontSize: 14, flex: 1, fontWeight: item.value == selected ? "bold" : "normal" }} numberOfLines={1} >{item.label}</Text>
        {item.value == selected &&
          <Icon
            icon={require(`@/assets/icons/icon-tick.png`)}
            size={12}
          />
        }
      </TouchableOpacity>
    ) 
  ,[]);

  return(
    <>
      <BottomSheetFlatList 
        ref={listRef}
        style={{ marginTop: 20, marginBottom: insets.bottom }} 
        contentContainerStyle={{ paddingHorizontal: 10 }}
        data={data.items}
        keyExtractor={((item: any, index: number) => String(index))}
        renderItem={renderItem}
        // initialScrollIndex={data.items.findIndex((x: any) => x.value == selected)}
        onScrollToIndexFailed={(error) => {}}
        getItemLayout={(data, index) => (
          {length: 30, offset: 30 * index, index}
        )}
        onContentSizeChange={(w, h) => {
          setTimeout(() => scrollToSelected(), 500);
        }}
      />
    </>
  )
}

const FilterPicker = ({ filter, filterName, updateFilter, name, icon, data }: { filter: FilterType, filterName: "petTypes" | "specialCats", updateFilter: (filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean) => void, name: string, icon: number | Source , data: any }) => {
  return (
    <View>
      <HideAndShow
        shownElement={
          <>
            <Icon
              icon={icon}
              size={17}
            />
            <MenuItemText style={{ marginLeft: 8, marginRight: 5 }}>{name}</MenuItemText>
          </>
        }
      >
        <>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 5 }}>
            {data.map(({ id, name }: { id: number, name: string }) => {
              const isSelected = filter[filterName].findIndex(x => x == id) != -1;
              return (
                <FilterItem
                  key={id}
                  style={{ backgroundColor: isSelected ? Colors.darkOrange : "white" }}
                  onPress={() => updateFilter(filterName, [{ id: Number(id), name }])}
                >
                  <FilterItemText 
                    numberOfLines={1} 
                    // adjustsFontSizeToFit 
                    style={{ color: isSelected ? "white" : Colors.darkOrange }}
                  >
                    {name}
                  </FilterItemText>
                </FilterItem>
              )
            })}
            {data.length % 3 == 2 && <View style={{  width: "30%" }}/>}
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: -30,
              right: 0,
              zIndex: 9999,
              height: 30,
              justifyContent: "center"
            }}
            onPress={() => {
              updateFilter(filterName, data, true);
            }}
          >
            <Text style={{ color: "#999999", fontSize: 14 }}>{t("search_selectAll")}</Text>
          </TouchableOpacity>
        </>
      </HideAndShow>
    </View>
  )
}

const FilterPickerWithSubcat = ({ filter, filterName, updateFilter, name, icon, openPicker, data }: { filter: FilterType, filterName: "districts" | "needTypes", updateFilter: (filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean) => void, name: string, icon: number | Source, openPicker: (data: any) => void, data: any[] }) => {

  const [cat, setCat] = useState(0);
  const [subCat, setSubCat] = useState(0);

  const cats = useMemo(() => {
    if (data) {
      return data.map((x, index) => { return { label: x.name, value: index } });
    }
    return [];
  }, [data])

  const subCats = useMemo(() => {
    if (cat != null) {
      return data[Number(cat)].subCats.map((x: any, index: number) => { return { label: x.name, value: index } });
    }
    return [];
  }, [cat])

  useEffect(() => {
    setSubCat(0);
  }, [cat])

  const items = useMemo(() => {
    try {
      if (cat != null && subCat != null) {
        return data[Number(cat)].subCats[Number(subCat)].items;
      }
    } catch(error) {
    }
    return [];
  }, [cat, subCat])

  return (
    <View>
      <HideAndShow
        shownElement={
          <>
            <Icon
              icon={icon}
              size={17}
            />
            <MenuItemText style={{ marginLeft: 8, marginRight: 5 }}>{name}</MenuItemText>
          </>
        }
      >
        <View style={{ flexDirection: "column-reverse" }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 10 }}>
            {items.map(({ id, name }: { id: number, name: string }) => {
              const isSelected = filter[filterName].findIndex(x => x == id) != -1;
              return (
                <FilterItem
                  key={`${cat}_${subCat}_${id}}`}
                  style={{ backgroundColor: isSelected ? Colors.darkOrange : "white" }}
                  onPress={() => updateFilter(filterName, [{ id: Number(id), name }])}
                >
                  <FilterItemText 
                    numberOfLines={1} 
                    // adjustsFontSizeToFit 
                    style={{ color: isSelected ? "white" : Colors.darkOrange }}
                  >
                    {name}
                  </FilterItemText>
                </FilterItem>
              )
            })}
            {items.length % 3 == 2 && <View style={{  width: "30%" }}/>}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
            <DropdownPicker
              selected={cat}
              items={cats}
              openPicker={openPicker}
              selectItem={(value) => {
                setCat(value);
                setSubCat(0)
              }}
            />
            <DropdownPicker
              selected={subCat}
              items={subCats}
              openPicker={openPicker}
              selectItem={(value) => {
                setSubCat(value)
              }}
              style={{ marginLeft: 10 }}
            />
            <TouchableOpacity
              style={{ marginLeft: "auto" }}
              onPress={() => {
                const isAllSelected = items.every(({ id }: { id: number }) => filter[filterName].findIndex(x => x == id) != -1);
                updateFilter(filterName, items, !isAllSelected)
              }}
            >
              <Text style={{ color: "#999999", fontSize: 14 }}>{t("search_selectAll")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </HideAndShow>
    </View>
  )
}

const DropdownPicker = ({ selected, items, selectItem, openPicker, style }: { selected: number, items: { label: string, value: number }[], selectItem: (value: number) => void, openPicker: (data: any) => void, style?: any } ) => {
  
  return (
    <>
      <Dropdown as={TouchableOpacity}
        style={{ ...style! }}
        onPress={() => openPicker({ items, selectItem, selected })}
      >
        <Text style={{ color: "#999999", fontSize: 14, flex: 1 }} numberOfLines={1}>{items[selected]!.label}</Text>
        <Icon
          icon={require(`@/assets/icons/icon-downArrow-orange.png`)}
          size={16}
          style={{ marginLeft: "auto" }}
        />
      </Dropdown>
    </>
  )
}

export default FilterModal;