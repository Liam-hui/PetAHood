import React, { useState, useEffect, useMemo, Dispatch, SetStateAction  } from 'react';
import { View, Text, ScrollView, ImageSourcePropType, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { t } from 'i18next';

import { useAppSelector, useAppDispatch } from '@/hooks';
import { RootState } from '@/store';
import { FilterNameType, FilterType } from '@/types';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Icon from '@/components/Icon';
import HideAndShow from '@/components/HideAndShow';
import { Border, MenuHeading, MenuItemText, FilterItem, FilterItemText } from './styles';
import WideButton from '@/components/WideButton';
import { resetShopSearchFilter, setShopSearchFilter } from '@/store/shopSearch';
import { updatedFilter } from '@/utils/myUtils';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const FilterModal = ({ filter, setFilter, isVisible, close, confirm } : { filter: FilterType, setFilter: Dispatch<SetStateAction<FilterType>>, isVisible: boolean, close: () => void, confirm: () => void })  => {

  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const filterList = useAppSelector((state: RootState) => state.shopSearch.filterList);
  // const filter = useAppSelector((state: RootState) => state.shopSearch.filter);
  // const [filter, setFilter] = useState<FilterType>({
  //   districts: [],
  //   petTypes: [],
  //   needTypes: [],
  //   specialCats: [],
  // });

  const updateFilter = (filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean) => {
    setFilter(updatedFilter(filter, filterName, items, isForceAdd));
    // dispatch(setShopSearchFilter({ filterName, items, isForceAdd }));
  }

  const resetFilter = () => {
    dispatch(resetShopSearchFilter());
    // setFilter({
    //   districts: [],
    //   petTypes: [],
    //   needTypes: [],
    //   specialCats: [],
    // });
  }

  const [isPickerShown, setIsPickerShown] = useState(false);
  const [pickerData, setPickerData] = useState<any>(null);
  const openPicker = (data: any) => {
    setIsPickerShown(true);
    setPickerData(data);
  }
  const closePicker = () => {
    setIsPickerShown(false);
    setPickerData(null);
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
              name={t("search_petTypes")}
              icon={require(`@/assets/icons/icon-specialType-black.png`)}
              data={filterList.specialCats}
            />
          </ScrollView>
          <WideButton
            text={t("confirm")}
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
      {isPickerShown && <PickerMenu data={pickerData} close={closePicker} />}
    </Modal>
  );
}

const PickerMenu = ({ data, close }: { data: any | null, close: () => void }) => {

  const [selected, setSelected] = useState(data.selected);

  return(
    <View
      style={{ width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", position: "absolute", paddingHorizontal: 25, justifyContent: "center" }}
    >
      <TouchableOpacity 
        style={{ width: "100%", height: "100%", position: "absolute" }} 
        onPress={close}
      />
      {data != null &&
        <View style={{ backgroundColor: "white" }}>
          <ScrollView>
            {data.items.map(({ label, value }: { label: string, value: number }, index: number) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    height: 30,
                    flexDirection: 'row',
                    alignItems: "center",
                    paddingHorizontal: 10,
                  }}
                  onPress={() => {
                    setSelected(value);
                    data.selectItem(value);
                  }}
                >
                  <Text style={{ color: "#999999", fontSize: 14, flex: 1 }} numberOfLines={1} >{label}</Text>
                  {value == selected &&
                    <Icon
                      icon={require(`@/assets/icons/icon-tick.png`)}
                      size={12}
                    />
                  }
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      }
    </View>
  )
}

const FilterPicker = ({ filter, filterName, updateFilter, name, icon, data }: { filter: FilterType, filterName: "petTypes" | "specialCats", updateFilter: (filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean) => void, name: string, icon: ImageSourcePropType, data: any }) => {
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

const FilterPickerWithSubcat = ({ filter, filterName, updateFilter, name, icon, openPicker, data }: { filter: FilterType, filterName: "districts" | "needTypes", updateFilter: (filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean) => void, name: string, icon: ImageSourcePropType, openPicker: (data: any) => void, data: any[] }) => {

  const [cat, setCat] = useState(0);
  const [subCat, setSubCat] = useState(0);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [closeDropdown, setCloseDropdown] = useState(0); // trigger when number update

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

  // const onDropdownOpen = () => {
  //   setIsDropDownOpen(true);
  //   setCloseDropdown(closeDropdown + 1);
  // }

  // const onDropdownClose = () => {
  //   setIsDropDownOpen(false);
  // }

  return (
    <View style={{ zIndex: isDropDownOpen ? 999 : 1 }}>
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
        style={{
          zIndex: isDropDownOpen ? 999 : 1
        }}
        onHide={() => setCloseDropdown(closeDropdown + 1)}
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
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 5,
        width: Layout.window.width * 0.3,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        ...style
      }}
      onPress={() => openPicker({ items, selectItem, selected })}
    >
      <Text style={{ color: "#999999", fontSize: 14, flex: 1 }} numberOfLines={2}>{items[selected]!.label}</Text>
      <Icon
        icon={require(`@/assets/icons/icon-downArrow-orange.png`)}
        size={16}
        style={{ marginLeft: "auto" }}
      />
    </TouchableOpacity>
  )
}

// const DropdownPicker = ({ selected, items, selectItem, onOpen, onClose, closeDropdown, style }: { selected: number, items: { label: string, value: number }[], selectItem: (value: number) => void, onOpen: () => void, onClose: () => void, closeDropdown: any, style?: any } ) => {

//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     setIsOpen(false)
//   }, [closeDropdown])

//   const toggle = () => {
//     if (isOpen) {
//       setIsOpen(false);
//       onClose();
//     }
//     else {
//       onOpen();
//       setTimeout(() => setIsOpen(true), 100);
//     }
//   }

//   const height = 35;

//   return (
//     <View style={{ ...style }}>
//       <TouchableOpacity
//         style={{
//           borderWidth: 1,
//           borderColor: "#CCCCCC",
//           borderRadius: 5,
//           height: height,
//           width: Layout.window.width * 0.3,
//           flexDirection: "row",
//           alignItems: "center",
//           paddingHorizontal: 10,
//         }}
//         onPress={toggle}
//       >
//         <Text style={{ color: "#999999", fontSize: 14, flex: 1 }} numberOfLines={2}>{items[selected]!.label}</Text>
//         <Icon
//           icon={require(`@/assets/icons/icon-downArrow-orange.png`)}
//           size={16}
//           style={{ marginLeft: "auto", transform: [{ rotateZ: isOpen ? "180deg" : "0deg" }] }}
//         />
//       </TouchableOpacity>
//       {isOpen &&
//         <View
//           style={{
//             position: "absolute",
//             top: height,
//             width: "100%",
//             backgroundColor: "white",
//             borderColor: "#CCCCCC",
//             borderWidth: 1,
//             borderTopWidth: 0,
//             borderBottomLeftRadius: 5,
//             borderBottomRightRadius: 5,
//             // maxHeight: height * 3,
//           }}
//         >
//           <>
//             {/* <ScrollView nestedScrollEnabled> */}
//               {items.map(({ label, value }: { label: string, value: number }, index) => {
//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     style={{
//                       // position: "absolute",
//                       // top: height * index,
//                       width: "100%",
//                       height: height,
//                       flexDirection: 'row',
//                       alignItems: "center",
//                       paddingHorizontal: 10,
//                     }}
//                     onPress={() => selectItem(value)}
//                   >
//                     <Text style={{ color: "#999999", fontSize: 14, flex: 1 }} numberOfLines={1} >{label}</Text>
//                     {/* {value == selected &&
//                       <Icon
//                         icon={require(`@/assets/icons/icon-tick.png`)}
//                         size={12}
//                       />
//                     } */}
//                   </TouchableOpacity>
//                 )
//               })}
//             {/* </ScrollView> */}
//           </>
//         </View>
//       }
//     </View>
//   )
// }

export default FilterModal;