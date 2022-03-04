import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Share from 'react-native-share';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { getUserProfileReviews } from '@/store/profile';
import Layout from '@/constants/Layout';
import FastImage from 'react-native-fast-image';
import ReadMoreText from '@/components/ReadMoreText';
import moment from 'moment';
import Stars from '@/components/Stars';
import Icon from '@/components/Icon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HOST } from '@/constants';
import i18n from '@/translate/i18n';
import { useTranslation } from 'react-i18next';

export default function Reviews() {

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.profile.reviews);
  const isLoading = useAppSelector((state: RootState) => state.profile.reviewsLoading);
  const nextPage = useAppSelector((state: RootState) => state.profile.reviewsNextPage);

  const renderItem = ({ item }: { item: any }) => (
    <ProfileReview key={item.id} review={item} />
  );

  const onEndReached = () => {
    if (!isLoading && nextPage != null) {
      dispatch(getUserProfileReviews({}));
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          paddingHorizontal: Layout.page.paddingHorizontal,
          paddingTop: 15,
          paddingBottom: insets.bottom + 15
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 30 }}>{t("profile_noReviews")}</Text>
        }
        ListFooterComponent={
          <>
            {isLoading && <ActivityIndicator color="grey" style={{ marginVertical: 10 }}/> }
          </>
        }
      />
    </View>
  );
}

const ProfileReview = ({ review }: { review: any }) => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const openDetailPage = () => {
    navigation.push("ShopDetail", { id: review.commentable.id })
  }

  const share = async () => {
    const url = `${HOST}${i18n.language == "en" ? "en" : "zh_HK"}/shop/${review.commentable.shop_code}/${review.commentable.slug}`;
    Share.open({
      url
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  const imageSize = 82;
  const imageMarginRight = 7;
  const numberOfImages = Math.ceil((Layout.window.width - Layout.page.paddingHorizontal * 3) / (imageSize + imageMarginRight));

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 17 }}>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={openDetailPage}>
          <FastImage 
            style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: "#DDD" }} 
            source={{ uri: review.commentable.cover }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            <TouchableOpacity style={{ marginRight: 5 }} onPress={openDetailPage}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }} numberOfLines={1}>{review.commentable.name}</Text>
            </TouchableOpacity>
            <Text style={{ }}>{moment(review.created_at).format('DD MMM YYYY')}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Stars stars={review.stars} size={16} />
            <Icon
              size={15}
              icon={require("@/assets/icons/icon-share2.png")}
              style={{ marginLeft: 5 }}
              onPress={share}
            />
          </View>
        </View>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Icon
            size={15}
            icon={require("@/assets/icons/icon-like2.png")}
            style={{ marginRight: 5 }}
          />
          <Text>{review.total_like}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "white", paddingVertical: 15 }}>
        <View style={{ paddingHorizontal: Layout.page.paddingHorizontal }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>{review.title}</Text>
          <Text style={{ }} >{review.content}</Text>
        </View>
        <View style={{ flexDirection: "row", paddingLeft: Layout.page.paddingHorizontal, marginTop: 17, overflow: "hidden" }}>
          {review.images.slice(0, numberOfImages).map((image: string, index: number) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push("AlbumModal", { images: review.images, index });
                }}
              >
                <FastImage 
                  style={{ width: imageSize, height: imageSize, marginRight: imageMarginRight }} 
                  source={{ uri: image }}
                />
                {index == numberOfImages - 1 && numberOfImages < review.images &&
                  <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#000000AA", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", color: "white", fontSize: 26 }}>+{review.images.length - numberOfImages}</Text>
                 </View>
                }
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      <View style={{ width: "100%", height: 1, backgroundColor: "#030335", opacity: 0.2, marginVertical: 25 }} />
    </View>
  )
};