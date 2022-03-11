import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';

import Layout from '@/constants/Layout';
import { LabelText, ValueText } from './styles';
import Styles from '@/constants/Styles';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { getPetProfileHealthRecord } from '@/store/pets';
import WideButton from '@/components/WideButton';
import FlatListWithLoader from '@/components/FlatListWithLoader';

export default function HealthRecord({ id }: { id: number }) {

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.pets.data[id]?.healthRecord);
  const status = useAppSelector((state: RootState) => state.pets.getHealthRecordStatus);

  // useEffect(() => {
  //   if (status == "idle")
  //     dispatch(getPetProfileHealthRecord(id));
  // }, [])

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          borderTopLeftRadius: 24,
          borderBottomRightRadius: 24,
          borderBottomLeftRadius: 24,
          marginBottom: 20,
          overflow: "hidden",
          ...Styles.shadowStyle
        }}
      >
        {item.image &&
          <FastImage
            style={{ width: "100%", height: (Layout.window.width - Layout.page.paddingHorizontal * 2) * 0.684 }}
            source={{ uri: item.image }}
          />
        }
        <View
          style={{
            paddingHorizontal: Layout.page.paddingHorizontal,
            paddingVertical: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <LabelText>{t("healthRecord_vaccineName")}</LabelText>
              <ValueText>{item.vaccine_name}</ValueText>
            </View>
            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: "black", borderRadius: 5, alignSelf: "flex-start", paddingVertical: 5, paddingHorizontal: 10, marginLeft: "auto" }}
              onPress={() => {
                navigation.push("PetHealthRecordForm", { petId: id, itemId: item.id, data: item });
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{t("edit")}</Text>
            </TouchableOpacity>
          </View>
          {item.batch_number != undefined && <>
            <LabelText style={{ marginTop: 18 }}>{t("healthRecord_batchNumber")}</LabelText>
            <ValueText>{item.batch_number}</ValueText>
          </>}
          <View style={{ flexDirection: "row", marginTop: 18, justifyContent: "space-between", alignItems: "flex-end" }}>
            <View>
              <LabelText>{t("healthRecord_vaccineDate")}</LabelText>
              <ValueText>{item.date}</ValueText>
            </View>
            <ValueText>{t("to")}</ValueText>
            <View>
              <LabelText>{t("healthRecord_validUntil")}</LabelText>
              <ValueText>{item.valid_until}</ValueText>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: "center", paddingHorizontal: Layout.page.paddingHorizontal }}>
      <FlatListWithLoader
        data={data}
        status={status}
        reload={() => dispatch(getPetProfileHealthRecord(id))}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={{ width: "100%", marginTop: 5 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: "100%",
          paddingTop: 10,
          paddingBottom: insets.bottom + 15
        }}
        ListFooterComponent={
          <WideButton
            isBorder
            text={t("healthRecord_addRecord")}
            onPress={() => {
              navigation.push("PetHealthRecordForm", { petId: id });
            }}
            style={{ width: "100%", backgroundColor: "transparent", marginTop: 20 }}
          />
        }
      />
    </View>
  );
}