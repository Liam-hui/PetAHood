import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Platform, ActivityIndicator } from 'react-native';
import { useTranslation } from "react-i18next";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import FastImage from 'react-native-fast-image'
import moment from 'moment';

import Icon from '@/components/Icon';
import ReadMoreText from '@/components/ReadMoreText';
import HideAndShow from '@/components/HideAndShow';
import ShopList from '@/components/ShopList';
import { RootStackScreenProps } from '@/types';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getShopDetailById } from '@/store/shopDetails';
import { RootState } from '@/store';
import Colors from '@/constants/Colors';

import { InfoRow, InfoText, Card, Sep, Section, Heading, DarkSep } from './styles';
import Layout from '@/constants/Layout';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import { TabView } from 'react-native-tab-view';
import Styles from '@/constants/Styles';

export default function OpeningHourScreen(props: RootStackScreenProps<'OpeningHour'>) {

  const { t } = useTranslation();
  const { data } = props.route.params;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBlue }}>

      <Header title={t("shopDetails_openingHours")} />

      <View style={{ backgroundColor: "white", paddingHorizontal: Layout.page.paddingHorizontal, paddingVertical: 15, marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 15 }}>{t("shopDetails_openingHours")}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{t("shopDetails_today")}</Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{data.today}</Text>
        </View>
        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(day => 
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
            <Text>{t(`shopDetails_${day}`)}</Text>
            <Text>{data[day]}</Text>
          </View>
        )}
      </View>

    </View>
  );
}
