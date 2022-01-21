import React, { useState } from 'react';
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
import { setShopSearchFilter } from '@/store/shopSearch';
import { useTranslation } from 'react-i18next';

const renderScene = SceneMap({
  districts: () => <Tab filterName={"districts"} />,
  petTypes: () => <Tab filterName={"petTypes"} />,
  needTypes: () => <NeedTypesTab/>,
});

export function FilterTab() {

  const { t } = useTranslation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'districts', title: t("search_area") },
    { key: 'petTypes', title: t("search_petTypes") },
    { key: 'needTypes', title: t("search_needTypes") },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
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

const Tab = ({ filterName }: { filterName: 'districts' | 'petTypes' }) => {

  const dispatch = useAppDispatch();
  const filter = useAppSelector((state: RootState) => state.shopSearch.filter);
  const data = useAppSelector((state: RootState) => state.shopSearch.filterList[filterName]);

  return(
    <TabContainer>
      <BorderItemWrapper>
        {entries(data).map(([value, label], index) => {
          const isSelected = filter[filterName].findIndex(x => x == value) != -1;
          return <BorderItem as={TouchableOpacity}
            key={index}
            onPress={() => {
              dispatch(setShopSearchFilter({
                filterName,
                value,
                label
              }));
            }}
            style={{
              ... isSelected && { backgroundColor: Colors.darkBlue }
            }}
          >
            <BorderItemText
              style={{
                ... isSelected && { color: "white" }
              }}
            >
              {label}
            </BorderItemText>
          </BorderItem>
        })}
      </BorderItemWrapper>
    </TabContainer>
  )
}

const NeedTypesTab = () => {

  const dispatch = useAppDispatch();
  const filter = useAppSelector((state: RootState) => state.shopSearch.filter);
  const data = useAppSelector((state: RootState) => state.shopSearch.filterList.needTypes);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <TabContainer>
      {data.length > 0 && <>
        <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
          {data.map((cat, index) => {
            const isSelected = index == selectedIndex;
            return (
              <BorderItemLarge as={TouchableOpacity}
                key={index}
                onPress={() => setSelectedIndex(index)}
                style={{
                  ... isSelected && { backgroundColor: Colors.orange }
                }}
              >
                <BorderItemLargeText 
                  style={{ 
                    ... isSelected && { color: "white" } 
                  }}
                >
                  {cat.name}
                </BorderItemLargeText>
              </BorderItemLarge>
            )
          })}
        </View>
        <ScrollView style={{ flex: 1 }}>
          {data[selectedIndex]["sub_cats"].map((cat, index) => {
            return (
              <View key={index} style={{ marginBottom: 20 }}>
                <Text style={{ color: Colors.darkBlue, fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>{cat.name}</Text>
                <BorderItemWrapper>
                  {entries(cat["sub_cats"]).map(([value, label], index) => {
                    const isSelected = filter["needTypes"].findIndex(x => x == value) != -1;
                    return <BorderItem as={TouchableOpacity}
                      key={index}
                      onPress={() => {
                        dispatch(setShopSearchFilter({
                          filterName: "needTypes",
                          value,
                          label
                        }));
                      }}
                      style={{
                        ... isSelected && { backgroundColor: Colors.darkBlue }
                      }}
                    >
                      <BorderItemText
                        style={{
                          ... isSelected && { color: "white" }
                        }}
                      >
                        {label}
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

