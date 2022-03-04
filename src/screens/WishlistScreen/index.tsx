import React, { useState, useEffect, createRef, useCallback } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StackActions, useFocusEffect } from '@react-navigation/native';
import DefaultWebView from 'react-native-webview';

import Header from '@/components/Header';
import { RootTabScreenProps } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { getFavs } from '@/store/favourites';
import { ShopListFull } from '@/components/ShopList';
import { getUserProfileFav } from '@/store/profile';

export default function WishlistScreen(props: RootTabScreenProps<'Wishlist'>) {

  const { t } = useTranslation();
  const authStatus = useAppSelector((state: RootState) => state.auth.status);

  return (
    <View style={{ flex: 1 }}>
      <Header title={t("bottomTabItem_favourites")} cantBack />
      {authStatus == "success" ? <UserWishlist/> : <LocalWishlist/>}
    </View>
  );
}

const LocalWishlist = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { ids, data, status, nextPage }  = useAppSelector((state: RootState) => state.favourites);

  useFocusEffect(
    useCallback(() => {
      dispatch(getFavs({
        isInit: true,
        ids
      }));
      return () => {};
    }, [ids])
  );

  const onEndReached = () => {
    if (status != "loading" && nextPage != null) {
      dispatch(getFavs({
        ids
      }));
    }
  }
  
  return (
    <ShopListFull 
      isLoading={status == "loading"}
      data={data}
      onEndReached={onEndReached}
      emptyText={t("fav_empty")}
    />
  );
}

const UserWishlist = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const data = useAppSelector((state: RootState) => state.profile.fav);
  const isLoading = useAppSelector((state: RootState) => state.profile.favLoading);
  const nextPage = useAppSelector((state: RootState) => state.profile.favNextPage);

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserProfileFav({
        isInit: true
      }));
      return () => {};
    }, [])
  );

  const onEndReached = () => {
    if (!isLoading && nextPage != null) {
      dispatch(getUserProfileFav({
      }));
    }
  }
  
  return (
    <ShopListFull 
      isLoading={isLoading}
      data={data}
      onEndReached={onEndReached}
      emptyText={t("fav_empty")}
    />
  );
}
