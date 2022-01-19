import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import { FilterParamType, filters, FilterType } from './filters';
import Layout from '@/constants/Layout';
import TabBar from '@/components/TabBar';

import { BorderItemWrapper, BorderItem, BorderItemText } from './styles';
import Colors from '@/constants/Colors';

export function FilterTab({ filter, addFilter }: { filter: FilterType, addFilter: (param: FilterParamType, value: number) => void }) {

  const Tab = ({ param }: { param: FilterParamType }) => {
    return(
      <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
        <BorderItemWrapper>
          {filters[param].map((item, index) => {
            const isSelected = filter[param].findIndex(x => x == item.value) != -1;
            return <BorderItem as={TouchableOpacity}
              key={index}
              onPress={() => {
                addFilter(param, item.value);
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
                {item.label}
              </BorderItemText>
            </BorderItem>
          }
          )}
        </BorderItemWrapper>
      </View>
    )
  }
  
  const renderScene = SceneMap({
    region: () => <Tab param={"region"}/>,
    petType: () => <Tab param={"petType"}/>,
    serviceType: () => <Tab param={"serviceType"}/>,
    special: () => <Tab param={"special"}/>,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'region', title: 'First' },
    { key: 'petType', title: 'Type of Pets' },
    { key: 'serviceType', title: 'Type of Needs' },
    { key: 'special', title: 'Separate Category' },
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

