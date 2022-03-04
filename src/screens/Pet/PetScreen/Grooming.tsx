import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { getPetProfileGrooming } from '@/store/pets';
import Layout from '@/constants/Layout';
import Styles from '@/constants/Styles';
import WideButton from '@/components/WideButton';
import { LabelText, ContainerWithBorder, ValueText } from './styles';

export default function Grooming({ id }: { id: number }) {

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const data = useAppSelector((state: RootState) => state.pets.data[id]?.grooming);
  const status = useAppSelector((state: RootState) => state.pets.getGroomingStatus);

  useEffect(() => {
    dispatch(getPetProfileGrooming(id));
  }, [])

  const renderItem = ({ item }: { item: any }) => {
    return (
      <ContainerWithBorder style={{ flexDirection: "row", width: "100%", backgroundColor: "white", marginBottom: 20, paddingHorizontal: 15, paddingVertical: 20, ...Styles.shadowStyle }}>
        <View style={{ flex: 1 }}>
          <LabelText style={{ marginBottom: 10 }}>{t("grooming_date")}</LabelText>
          <ValueText style={{ marginBottom: 20 }}>{`${moment(item.datetime).format('DD/MM/YYYY h:mm A')}`}</ValueText>
          <LabelText style={{ marginBottom: 10 }}>{t("grooming_company")}</LabelText>
          <ValueText style={{ marginBottom: 20 }}>{item.company_name}</ValueText>
          <LabelText style={{ marginBottom: 10 }}>{t("grooming_groomer")}</LabelText>
          <ValueText style={{ marginBottom: 20 }}>{item.groomer}</ValueText>
          <LabelText style={{ marginBottom: 10 }}>{t("grooming_service")}</LabelText>
          <ValueText>{item.booked_service}</ValueText>
        </View>
        <TouchableOpacity
          style={{ borderWidth: 1, borderColor: "black", borderRadius: 5, alignSelf: "flex-start", paddingVertical: 5, paddingHorizontal: 10 }}
          onPress={() => {
            // setSelectedItem(item);
            // setIsModalVisible(true)
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{t("edit")}</Text>
        </TouchableOpacity>
      </ContainerWithBorder>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: "center", paddingHorizontal: Layout.page.paddingHorizontal }}>
      {!data && status == "loading" && 
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator color="grey" />
        </View>
      }
      {data && <>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={{ width: "100%", marginTop: 5 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: "100%",
            paddingTop: 10,
            paddingBottom: insets.bottom + 15
          }}
          // ListHeaderComponent={
          //   <ContainerWithBorder style={{ width: "100%", height: 100, marginBottom: 20 }}>
          //   </ContainerWithBorder>
          // }
          ListFooterComponent={
            <WideButton
              isBorder
              text={t("healthRecord_addRecord")}
              onPress={() => {
                navigation.navigate("PetGroomingForm", { petId: id });
              }}
              style={{ width: "100%", backgroundColor: "transparent", marginTop: 20 }}
            />
          }
        />
      </>}
    </View>
  );
}