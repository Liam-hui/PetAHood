import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, useWindowDimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { getUserProfileOrders, getUserProfileVouchers } from '@/store/profile';
import { FlatList } from 'react-native-gesture-handler';
import Layout from '@/constants/Layout';
import SelectBar from '@/components/SelectBar';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Styles from '@/constants/Styles';
import Colors from '@/constants/Colors';
import Icon from '@/components/Icon';
import FlatListWithLoader from '@/components/FlatListWithLoader';

export default function Orders() {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const data = useAppSelector((state: RootState) => state.profile.orders);
  const status = useAppSelector((state: RootState) => state.profile.ordersStatus);
  const nextPage = useAppSelector((state: RootState) => state.profile.ordersNextPage);

  const renderItem = ({ item, index }: { item: any, index: number }) => (
    <View style={{ 
      backgroundColor: "white",           
      paddingHorizontal: 10,
      ...index == 0 && { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
      ...index == data.length -1 && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
    }}>
      <Order order={item} />
      {index != data.length -1 &&
        <View style={{ backgroundColor: '#E5E5E5', height: 1, width: "95%", alignSelf: "center", marginVertical: 15 }}/>
      }
    </View>
  );

  const onEndReached = () => {
    if (status != "loading" && nextPage != null) {
      dispatch(getUserProfileOrders({}));
    }
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: Layout.page.paddingHorizontal }}>
      <Text style={{ fontWeight: "bold", marginLeft: 10, fontSize: 16 }}>{t("orders_heading")}</Text>
      <FlatListWithLoader
        data={data}
        status={status}
        reload={() => dispatch(getUserProfileOrders({ isInit: true }))}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1, marginTop: 10 }}
        contentContainerStyle={{ 
          paddingTop: 5,
          paddingBottom: insets.bottom + 15
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
        ListEmptyComponent={
          <>
            {status != "loading" && <Text style={{ textAlign: "center", marginTop: 10 }}>{t("orders_noOrder")}</Text>}
          </>
        }
      />
    </View>
  );
}

const Order = ({ order }: { order: any }) => {

  const { t } = useTranslation();

  return (
    <View style={{ flexDirection: "row", alignItems: "center", minHeight: 120, width: "100%" }}>
      <FastImage
        style={{ width: 80, height: 80, marginLeft: 0, borderRadius: 8 }}
        source={{ uri: order.banner }}
        resizeMode="contain"
      />
      <View style={{ flex: 1, paddingVertical: 20, paddingLeft: 10, justifyContent: "center" }}>
        <Text style={{ marginBottom: 15}}>{order.created_at}</Text>
        <Text>{t("orders_order")}<Text style={{ fontWeight: "bold" }}>{order.order_number}</Text></Text>
        <Text style={{ marginTop: 5 }}>{t("orders_status") + order.status}</Text>
        <Text style={{ marginTop: 5 }}>{t("orders_amount") + "$" + order.amount}</Text>
      </View>
      <Icon
        style={{ marginLeft: 5 }}
        size={15}
        icon={require("@/assets/icons/icon-arrowGrey.png")}
      />
    </View>
  );
}