import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, useWindowDimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { getUserProfileVouchers } from '@/store/profile';
import { FlatList } from 'react-native-gesture-handler';
import Layout from '@/constants/Layout';
import SelectBar from '@/components/SelectBar';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Styles from '@/constants/Styles';
import Colors from '@/constants/Colors';
import Icon from '@/components/Icon';

export default function Vouchers() {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const [selected, setSelected] = useState<"active" | "redeemed" | "expired">("active");
  const voucherTypes = [
    { value: "active" , name: t("vouchers_active") },
    { value: "redeemed" , name: t("vouchers_redeemed") },
    { value: "expired" , name: t("vouchers_expired") },
  ]

  const data = useAppSelector((state: RootState) => state.profile.vouchers[selected]);
  const isLoading = useAppSelector((state: RootState) => state.profile.vouchersLoading);
  const nextPage = useAppSelector((state: RootState) => state.profile.vouchersNextPage[selected]);

  useEffect(() => {
    dispatch(getUserProfileVouchers({
      isInit: true,
      type: selected
    }));
  }, [selected])

  const renderItem = ({ item }: { item: any }) => (
    <Voucher voucher={item} />
  );

  const onEndReached = () => {
    if (!isLoading && nextPage != null) {
      dispatch(getUserProfileVouchers({
        type: selected
      }));
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <SelectBar
        items={voucherTypes}
        value={selected}
        select={(value: any) => setSelected(value)}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1, marginTop: 5 }}
        contentContainerStyle={{ 
          paddingHorizontal: Layout.page.paddingHorizontal,
          paddingTop: 15,
          paddingBottom: insets.bottom + 15
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={
          <>
            {isLoading && <ActivityIndicator color="grey" style={{ marginVertical: 10 }}/> }
          </>
        }
      />
    </View>
  );
}

const Voucher = ({ voucher }: { voucher: any }) => {

  const { t } = useTranslation();

  return (
    <View style={{ flexDirection: "row", height: 200, width: "100%", backgroundColor: "white", borderRadius: 10, overflow: "hidden", marginBottom: 20, ...Styles.shadowStyle }}>
      <FastImage
        style={{ width: "35%", height: "100%" }}
        source={{ uri: voucher.image }}
      />
      <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 15 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 12, fontSize: 13 }}>{voucher.campaign_name}</Text>
        <Text style={{ fontSize: 13, marginBottom: 15 }}>{voucher.description}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
          <Text style={{ fontSize: 12 }}>{t("vouchers_code")}</Text>
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: voucher.isValid ? Colors.darkOrange : "grey", paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5, flexDirection: "row", alignItems: "center", alignSelf: "flex-start" }}>
              <Icon
                size={12}
                icon={require("@/assets/icons/icon-ticket.png")}
              />
              <Text style={{ fontSize: 12, marginLeft: 5, color: "white", fontWeight: "bold" }}>{voucher.code}</Text>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 12 }}>{t("vouchers_period") + voucher.date_range}</Text>
        {voucher.hvTC && 
          <TouchableOpacity style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: Colors.orange, marginRight: 10, fontSize: 13 }}>{t("vouchers_tAndC")}</Text>
            <Icon
              size={16}
              icon={require("@/assets/icons/icon-arrowRightOrange.png")}
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}