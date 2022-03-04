import React, { useState, useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from "react-i18next";

import { RootStackScreenProps } from '@/types';
import Colors from '@/constants/Colors';

import Layout from '@/constants/Layout';
import Header from '@/components/Header';


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
