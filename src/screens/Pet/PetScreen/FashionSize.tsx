import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Layout from '@/constants/Layout';
import FastImage from 'react-native-fast-image';
import { ContainerWithBorder } from './styles';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { getPetProfileFashionSize } from '@/store/pets';
import moment from 'moment';
import WideButton from '@/components/WideButton';
import FormModal from '@/components/FormModal';

export default function FashionSize({ id }: { id: number }) {

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.pets.data[id]?.fashionSize);
  const isLoading = useAppSelector((state: RootState) => state.pets.fashionSizeLoading);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getPetProfileFashionSize(id));
  }, [])

  return (
    <View style={{ flex: 1, alignItems: "center", paddingBottom: insets.bottom + 20, paddingHorizontal: Layout.page.paddingHorizontal }}>
      {!data && isLoading && 
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator color="grey" />
        </View>
      }
      {data && <>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 20, alignItems: "center" }} bounces={false}>
          <FastImage source={require("@/assets/images/fashionSize-cats.png")} style={{ width: 232, height: 153 }} resizeMode="contain" />
          <View style={{ flexDirection: "row", width: "100%", alignItems: "center", marginTop: 30,  ...Styles.shadowStyle }}>
            <View style={{ width: "100%", backgroundColor: 'transparent' }}>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around", paddingLeft: 90, paddingVertical: 25, backgroundColor: "white", borderRadius: 25, ...Styles.shadowStyle }}>
                <View style={{ paddingHorizontal: 32, alignItems: "center" }}>
                  <Text style={{ ...styles.fieldText }}>{t("fashionSize_body")}</Text>
                  <Text style={{ ...styles.valueText }}>{data.body ? data.body + "”" : "/"}</Text>
                </View>
                <View style={{ paddingHorizontal: 32, alignItems: "center" }}>
                  <Text style={{ ...styles.fieldText }}>{t("fashionSize_chest")}</Text>
                  <Text style={{ ...styles.valueText }}>{data.chest ? data.chest + "”" : "/"}</Text>
                </View>
                <View style={{ paddingHorizontal: 32, alignItems: "center" }}>
                  <Text style={{ ...styles.fieldText }}>{t("fashionSize_neck")}</Text>
                  <Text style={{ ...styles.valueText }}>{data.neck ? data.neck + "”" : "/"}</Text>
                </View>
              </View>
            </View>
            <ContainerWithBorder style={{ position: "absolute", left: 0, paddingHorizontal: 32, paddingVertical: 30, justifyContent: "center", alignItems: 'center', zIndex: 999 }}>
              <Text style={{ ...styles.fieldText, color: "white" }}>{t("fashionSize_size")}</Text>
              <Text style={{ ...styles.valueText, color: "white" }}>{data.size ? data.size + "”" : "/"}</Text>
            </ContainerWithBorder>
          </View>
          {data.created_at && <Text style={{ color: "#B2B2B2", marginLeft: "auto", fontSize: 12, marginTop: 10 }}>{t("fashionSize_lastUpdate") + moment(data.created_at).format('DD MMM YYYY')}</Text>}
        </ScrollView>
        <WideButton
          isBorder
          text={t("fashionSize_addNewSet")}
          onPress={() => {
            setIsModalVisible(true)
          }}
          style={{ width: "100%", backgroundColor: "transparent" }}
        />
      </>}
    </View>
  );
}

const SizeItem = () => {

  const { t } = useTranslation();

  return (
    <View style={{ width: 80, alignItems: "center", justifyContent: "center", backgroundColor: "red" }}>
      <Text style={{ ...styles.fieldText }}>{t("fashionSize_chest")}</Text>
      {/* <Text style={{ ...styles.valueText }}>20</Text> */}
      <TextInput 
        style={{ 
          backgroundColor: "blue", 
          width: "100%", 
          textAlign: "center", 
          fontSize: 24 
        }} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
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

