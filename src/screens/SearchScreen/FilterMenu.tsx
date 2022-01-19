import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { View, ImageSourcePropType } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import DropDownPicker, { ItemType, ValueType } from 'react-native-dropdown-picker';

import WideButton from '@/components/WideButton';
import Icon from '@/components/Icon';
import { filters, FilterParamType, FilterType } from './filters';

export function FilterMenu({ filter, setFilter }: { filter: FilterType, setFilter: (Dispatch<SetStateAction<FilterType>>) }) {

  const filterParams: FilterParamType[] = ["region", "petType", "serviceType", "special"];
  const [picking, setPicking] = useState<FilterParamType | null>(null);

  const setOpen = (filterParam: FilterParamType) => {
    if (picking == filterParam) {
      setPicking(null);
    }
    else {
      setPicking(filterParam);
    }
  }

  const setFilterValue = (filterParam: FilterParamType, selected: number[]) => {
    setFilter(
      { ...filter, [filterParam]: selected }
    );
  }

  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => <View style={{ position: "absolute", backgroundColor: "white", width: "100%", height: "100%", paddingHorizontal: 20, paddingBottom: 25 + (insets?.bottom ?? 0) }}>

        {filterParams.map(filterParam =>
          <FilterPicker
            key={filterParam}
            isOpen={picking == filterParam}
            icon={
              filterParam == "region"
                ? require(`../../assets/icons/icon-filter-region.png`)
                :  filterParam == "petType"
                  ? require(`../../assets/icons/icon-filter-petType.png`)
                  :  filterParam == "serviceType"
                    ? require(`../../assets/icons/icon-filter-serviceType.png`)
                    : require(`../../assets/icons/icon-filter-special.png`)
            }
            value={filter[filterParam]}
            items={filters[filterParam]}
            setOpen={() => setOpen(filterParam)}
            setFilterValue={(selected: number[]) => setFilterValue(filterParam, selected)}
            placeHolder={`Select ${filterParam}`}
          />
        )}

        <WideButton
          text="Search"
          onPress={() => {}}
          style={{
            marginTop: "auto"
          }}
        />
        
      </View>}
    </SafeAreaInsetsContext.Consumer>
  );
}

const FilterPicker = ({ isOpen, value, items, icon, placeHolder, setOpen, setFilterValue }: { isOpen: boolean, value: null | ValueType[], items: ItemType[], icon: ImageSourcePropType, placeHolder: string, setOpen: () => void, setFilterValue: (selected: any[]) => void })  => {

  const [selected, setSelected] = useState<ValueType[] | null>(value);

  useEffect(() => {
    selected && setFilterValue(selected);
  }, [selected])

  return(
    <View style={{ justifyContent: "center", marginBottom: 20, zIndex: isOpen ? 999 : 1 }}>
      <DropDownPicker
        multiple={true}
        open={isOpen}
        value={selected}
        items={items}
        setOpen={setOpen}
        setValue={setSelected}
        // setItems={setItems}
        placeholder={placeHolder}
        style={{
          borderColor: "#CCCCCC",
          zIndex: 1
        }}
        containerStyle={{
          zIndex: 1
        }}
        arrowIconStyle={{
          // color: Colors.orange
        }}
        placeholderStyle={{
          color: "#999999",
          marginLeft: 40,
        }}
        labelStyle={{
          color: "#999999",
          marginLeft: 40,
        }}
        listItemLabelStyle={{
          color: "#999999",
          marginLeft: 40,
        }}
        dropDownContainerStyle={{
          borderColor: "#CCCCCC",
        }}
        translation={{ 
          SELECTED_ITEMS_COUNT_TEXT: `${
            selected?.map((value, index) => {
              const item = items.find(item => item.value == value);
              return (index == 0 ? "" : " ") + item?.label;
            })
          }`,
        }}
      />
      <View 
        pointerEvents="none"
        style={{ 
          position: "absolute",
          left: 12,
          zIndex: 99999,
        }}
      >
        <Icon
          icon={icon}
          size={24}
        />
      </View>
    </View>
  );
}
