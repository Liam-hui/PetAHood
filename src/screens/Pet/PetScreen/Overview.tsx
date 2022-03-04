import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Layout from '@/constants/Layout';
import FastImage from 'react-native-fast-image';
import { OrangeBox } from './styles';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { getPetProfileFashionSize } from '@/store/pets';
import moment from 'moment';
import WideButton from '@/components/WideButton';

export default function Overview({ id }: { id: number }) {

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.pets.data[id]?.overview);
  const isLoading = useAppSelector((state: RootState) => state.pets.overviewLoading);

  console.log(data);

  return (
    <View style={{ flex: 1 }}>
      {/* <ScrollView horizontal>
        <OrangeBox style={styles.whiteBox}>
          <Text style={{ ...styles.fieldText }}>{t("fashionSize_body")}</Text>
        </OrangeBox>
      </ScrollView> */}
     
    </View>
  );
}

const styles = StyleSheet.create({
  whiteBox: {
    height: 165, 
    width: 165, 
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center", 
    ...Styles.shadowStyle 
  },
  fieldText: {
    fontWeight: "bold",
    fontSize: 12,
    color: Colors.orange,
    marginBottom: 5
  },
  valueText: {
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.orange
  }
});

