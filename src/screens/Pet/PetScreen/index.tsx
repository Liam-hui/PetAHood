import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { StackActions } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootStackScreenProps } from '@/types';
import { RootState } from '@/store';
import { getPetProfileAll } from '@/store/pets';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Icon from '@/components/Icon';
import TabBar from '@/components/TabBar';
import Overview from './Overview';
import FashionSize from './FashionSize';
import HealthRecord from './HealthRecord';
import PetInsurance from './PetInsurance';
import Grooming from './Grooming';

const getAge = (bd: any) => {
  const now = moment(new Date());

  const years = now.diff(bd, 'year');
  bd.add(years, 'years');

  const months = now.diff(bd, 'months');
  bd.add(months, 'months');

  return years + 'y' + months + 'm';
}

export default function PetScreen(props: RootStackScreenProps<'Pet'>) {

  const dispatch = useAppDispatch();
  const popAction = StackActions.pop(1);
  const insets = useSafeAreaInsets();

  const { navigation } = props;
  const { id } = props.route.params;
  const data = useAppSelector((state: RootState) => state.pets.data[id]?.detail);
  const isLoading = useAppSelector((state: RootState) => state.pets.getPetProfileStatus == "loading");

  useEffect(() => {
    dispatch(getPetProfileAll(id));
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBlue }}>
      <View style={{ height: Layout.window.width * 2 / 3 }}>
        <FastImage source={{ uri: data?.image }} style={{ width: "100%", height: "100%", position: 'absolute', backgroundColor: "black" }} resizeMode="cover" />
        <View style={{ flexDirection: "row", paddingTop: insets.top + (Platform.OS == "ios" ? 0 : 15), paddingHorizontal: Layout.page.paddingHorizontal }}>
          <Icon
            size={24}
            icon={require("@/assets/icons/icon-backArrowWhite.png")}
            onPress={() => navigation.dispatch(popAction)}
          />
        </View>
        {data && 
          <View style={{ marginTop: "auto", paddingBottom: 40, paddingHorizontal: Layout.page.paddingHorizontal, flexDirection: "row", alignItems: "flex-end" }}>
            <View>
              <Text style={{ color: "white", marginBottom: 5 }}>{data.pet_breed}</Text>
              <Text style={{ fontWeight: "bold", color: "white", fontSize: 32, lineHeight: 34 }}>{data.name}</Text>
            </View>
            {data.passed == 0 && <Text style={{ fontWeight: "bold", color: "white", fontSize: 18, marginLeft: "auto" }} >{getAge(moment(data.dob, "YYYY-MM-DD"))}</Text>}
          </View>
        }
      </View>
      <View style={{ flex: 1, backgroundColor: Colors.lightBlue, borderRadius: 18, marginTop: -18, overflow: "hidden" }}>
        <PetTabView id={id}/>
      </View>
    </View>
  );
}

const PetTabView = ({ id }: { id: number }) => {

  const { t } = useTranslation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    // { key: 'overview', title: t("pet_overview") },
    { key: 'fashionSize', title: t("pet_fashionSize") },
    { key: 'weight', title: t("pet_weight") },
    { key: 'healthCare', title: t("pet_healthCare") },
    { key: 'insurance', title: t("pet_insurance") },
    { key: 'grooming', title: t("pet_grooming") },
  ]);

  const renderScene = SceneMap({
    // overview: () => <Overview id={id} />,
    fashionSize: () =>  <FashionSize id={id} />,
    weight: () => <View style={{ flex: 1}} />,
    healthCare: () => <HealthRecord id={id} />,
    insurance: () => <PetInsurance id={id} />,
    grooming: () => <Grooming id={id} />
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={props =>
        <View style={{ marginBottom: 8 }}>
          <TabBar
            {...props}
          />
        </View>
      }
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Layout.window.width }}
      style={{ backgroundColor: Colors.lightBlue }}
    />
  );
}