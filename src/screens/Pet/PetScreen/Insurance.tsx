import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import Layout from '@/constants/Layout';
import { ContainerWithBorder, LabelText, ValueText } from './styles';
import Styles from '@/constants/Styles';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { getPetProfileInsurance } from '@/store/pets';
import WideButton from '@/components/WideButton';
import Icon from '@/components/Icon';
import Colors from '@/constants/Colors';
import FlatListWithLoader from '@/components/FlatListWithLoader';

export default function Insurance({ id }: { id: number }) {

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.pets.data[id]?.petInsurance);
  const status = useAppSelector((state: RootState) => state.pets.getInsuranceStatus);

  // useEffect(() => {
  //   if (status == "idle")
  //     dispatch(getPetProfileInsurance(id));
  // }, [])

  const renderItem = ({ item }: { item: any }) => {
    return (
      <ContainerWithBorder style={{ flexDirection: "row", width: "100%", backgroundColor: "white", marginBottom: 20, ...Styles.shadowStyle }}>
        <ContainerWithBorder style={{ paddingHorizontal: 28, paddingVertical: 20, alignItems: "center", justifyContnet: "center", alignSelf: "flex-start" }}>
          <Icon
            size={40}
            icon={require("@/assets/icons/icon-insurance.png")}
          />
          <Text style={{ color: "white", marginTop: 10, marginBottom: 7 }}>{t("petInsurance_insurer")}</Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>{item.period}</Text>
        </ContainerWithBorder>
        <View style={{ paddingVertical: 20, paddingHorizontal: 15, flex: 1 }}>
          <Text style={{ color: Colors.orange, fontSize: 18, fontWeight: "bold", marginBottom: 13 }}>{item.insurancer_name}</Text>
          <LabelText style={{ marginBottom: 10 }}>{t("petInsurance_coverage")}</LabelText>
          <ValueText>{`${item.start_date}  ${t("to")}  ${item.end_date}`}</ValueText>
          <TouchableOpacity
            style={{ borderWidth: 1, borderColor: "black", borderRadius: 5, alignSelf: "flex-start", paddingVertical: 5, paddingHorizontal: 10, marginTop: 15 }}
            onPress={() => {
              navigation.push("PetInsuranceForm", { petId: id, itemId: item.id, data: item });
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{t("edit")}</Text>
          </TouchableOpacity>
        </View>
      </ContainerWithBorder>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: "center", paddingHorizontal: Layout.page.paddingHorizontal }}>
      <FlatListWithLoader
        data={data}
        status={status}
        reload={() => dispatch(getPetProfileInsurance(id))}
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
            text={t("petInsurance_add")}
            onPress={() => {
              navigation.push("PetInsuranceForm", { petId: id });
            }}
            style={{ width: "100%", backgroundColor: "transparent", marginTop: 20 }}
          />
        }
      />
    </View>
  );
}