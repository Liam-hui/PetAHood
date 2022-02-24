import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Platform, ActivityIndicator, FlatList } from 'react-native';
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
import { getReviewsById } from '@/store/reviews';

export default function ReviewsScreen(props: RootStackScreenProps<'Reviews'>) {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id, count } = props.route.params;
  const reviewsFromDetails = props.route.params.data;
  const reviewsFromApi = useAppSelector((state: RootState) => state.reviews.data);
  const hasInit = useAppSelector((state: RootState) => state.reviews.hasInit);
  const status = useAppSelector((state: RootState) => state.reviews.status);
  const nextPage = useAppSelector((state: RootState) => state.reviews.nextPage);

  const reviews = hasInit ? reviewsFromDetails : reviewsFromApi;

  useEffect(() => {
    if (reviews.length < 12 && reviews.length < count) {
      dispatch(getReviewsById(id));
    }
  }, [reviews])

  const onEndReached = () => {
    if (hasInit && status != "loading" && nextPage != null) {
      dispatch(getReviewsById(id));
    }
  }

  const renderItem = ({ item }: { item: any }) => (
    <Review key={item.id} review={item} />
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
          backgroundColor: "white", 
          paddingHorizontal: Layout.page.paddingHorizontal, 
          paddingVertical: 15 
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
      />

      {/* <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ backgroundColor: "white", paddingHorizontal: Layout.page.paddingHorizontal, paddingVertical: 15 }}
      >
        {reviews.map((review: any) =>
          <Review key={review.id} review={review} />
        )}
      </ScrollView> */}

    </View>
  );
}
