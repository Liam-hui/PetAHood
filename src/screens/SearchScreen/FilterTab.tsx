import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Layout from '@/constants/Layout';
import TabBar from '@/components/TabBar';

import { TabContainer, BorderItemWrapper, BorderItemLarge, BorderItemLargeText, BorderItem, BorderItemText } from './styles';
import Colors from '@/constants/Colors';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { entries } from '@/utils/myUtils';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { FilterNameType, FilterType } from '@/types';
import SelectBar from '@/components/SelectBar';

export function FilterTab({ filter, updateFilter }: { filter: FilterType, updateFilter: (filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean) => void }) {

  const { t } = useTranslation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'districts', title: t("search_area") },
    { key: 'petTypes', title: t("search_petTypes") },
    { key: 'needTypes', title: t("search_needTypes") },
    { key: 'specialCats', title: t("search_specialCats") },
  ]);
  
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={({ route }) => {
        return route.key == "districts"
          ? <TabWithSubcats filterName={"districts"} filter={filter} updateFilter={updateFilter} />
          : route.key == "petTypes"
            ? <Tab filterName={"petTypes"} filter={filter} updateFilter={updateFilter} />
            : route.key == "needTypes"
            ? <TabWithSubcats filterName={"needTypes"} filter={filter} updateFilter={updateFilter} />
            : <Tab filterName={"specialCats"} filter={filter} updateFilter={updateFilter} />
      }}
      renderTabBar={props =>
        <TabBar
          {...props}
        />
      }
      onIndexChange={setIndex}
      initialLayout={{ width: Layout.window.width }}
      style={{ flex: 1 }}
    />
  );
}

const Tab = ({ filterName, filter, updateFilter }: { filterName: 'petTypes' | 'specialCats', filter: FilterType, updateFilter: (filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean) => void }) => {

  const data = useAppSelector((state: RootState) => state.shopSearch.filterList[filterName]);

  return(
    <TabContainer style={{ paddingHorizontal: Layout.page.paddingHorizontal }}>
      <BorderItemWrapper>
        {data.map(({ id, name }: { id: number, name: string }, index) => {
          const isSelected = filter[filterName].findIndex(x => x == id) != -1;
          return <BorderItem as={TouchableOpacity}
            key={index}
            onPress={() => updateFilter(filterName, [{ id, name }])}
            style={{
              width: (Layout.window.width - Layout.page.paddingHorizontal * 2) / 3 - 8,
              ... isSelected && { backgroundColor: Colors.darkBlue }
            }}
          >
            <BorderItemText
              numberOfLines={1}
              style={{
                ... isSelected && { color: "white" }
              }}
            >
              {name}
            </BorderItemText>
          </BorderItem>
        })}
      </BorderItemWrapper>
    </TabContainer>
  )
}

const TabWithSubcats = ({ filterName, filter, updateFilter }: { filterName: 'districts' | 'needTypes', filter: FilterType, updateFilter: (filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean) => void }) => {

  const data = useAppSelector((state: RootState) => state.shopSearch.filterList[filterName]);
  const [selected, setSelected] = useState<string>(data[0].name);

  return (
    <TabContainer>
      {data.length > 0 && <>
        <SelectBar
          items={data.map(x => { return { value: x.name, name: x.name } })}
          value={selected}
          select={(value: any) => setSelected(value)}
        />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 10, paddingHorizontal: Layout.page.paddingHorizontal }} showsVerticalScrollIndicator={false}>
          {data.find(x => x.name == selected)!.subCats.map((subCat, index) => {
            const items = subCat.items;
            return (
              <View key={index} style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: Colors.darkBlue, fontWeight: "bold", fontSize: 16 }}>{subCat.name}</Text>
                  <BorderItem as={TouchableOpacity}
                    style={{ 
                      marginLeft: "auto",
                      borderColor: "#B2B2B2",
                      height: 22,
                      paddingHorizontal: 10
                    }}
                    onPress={() => {
                      const isAllSelected = items.every(({ id }) => filter[filterName].findIndex(x => x == id) != -1);
                      updateFilter(filterName, items, !isAllSelected)
                    }}
                  >
                    <BorderItemText style={{ color: "#B2B2B2", fontSize: 13 }}>{t("search_selectAll")}</BorderItemText>
                  </BorderItem>
                </View>
                <BorderItemWrapper>
                  {items.map(({ id, name }: { id: number, name: string }, index) => {
                    const isSelected = filter[filterName].findIndex(x => x == id) != -1;
                    return <BorderItem as={TouchableOpacity}
                      key={index}
                      onPress={() => updateFilter(filterName, [{ id, name }])}
                      style={{
                        width: (Layout.window.width - Layout.page.paddingHorizontal * 2) / 3 - 8,
                        ... isSelected && { backgroundColor: Colors.darkBlue }
                      }}
                    >
                      <BorderItemText
                        numberOfLines={1}
                        style={{
                          ... isSelected && { color: "white" }
                        }}
                      >
                        {name}
                      </BorderItemText>
                    </BorderItem>
                  })}
                </BorderItemWrapper>
              </View>
            )
          })}
        </ScrollView>
      </>}
    </TabContainer>
  )
}
