import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Platform, ActivityIndicator, FlatList, InteractionManager } from 'react-native';
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
import Review from '@/components/Review';
import { getReviewsById, resetReviews } from '@/store/reviews';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ReviewsScreen(props: RootStackScreenProps<'Reviews'>) {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const { id, count } = props.route.params;
  const reviewsFromDetails = props.route.params.data;
  const reviewsFromApi = useAppSelector((state: RootState) => state.reviews.data);
  const hasInit = useAppSelector((state: RootState) => state.reviews.hasInit);
  const status = useAppSelector((state: RootState) => state.reviews.status);
  const nextPage = useAppSelector((state: RootState) => state.reviews.nextPage);

  const reviews = hasInit ? reviewsFromApi : reviewsFromDetails ;
  const [canLoadMore, setCanLoadMore] = useState(false);

  useEffect(() => {
    dispatch(getReviewsById(id));
    return () => {
      InteractionManager.runAfterInteractions(() => {
        dispatch(resetReviews());
      });
    }
  }, [])

  useEffect(() => {
    if (hasInit && reviews.length < 12 && nextPage != null) {
      dispatch(getReviewsById(id));
    }
    if (!canLoadMore && hasInit && reviews.length >= 12 && nextPage != null) {
      setCanLoadMore(true);
    }
  }, [hasInit, reviews.length])

  const onEndReached = () => {
    if (canLoadMore && status != "loading" && nextPage != null) {
      dispatch(getReviewsById(id));
    }
  }

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ backgroundColor: "white", paddingHorizontal: Layout.page.paddingHorizontal, }}>
      <Review key={item.id} review={item} />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBlue }}>

      <Header title={`${t("shopDetails_reviews")}(${count})`} />

      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          paddingBottom: insets.bottom + 15 
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={
          <>
            {status == "loading" && <ActivityIndicator color="grey" style={{ marginVertical: 10 }}/> }
          </>
        }
      />

    </View>
  );
}
