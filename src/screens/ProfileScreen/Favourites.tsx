import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import { SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { getUserProfileFav } from '@/store/profile';
import { FlatList } from 'react-native-gesture-handler';
import { ShopItemLarge } from '@/components/ShopItem';
import Layout from '@/constants/Layout';

export default function Favourites() {

  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.profile.fav);
  const isLoading = useAppSelector((state: RootState) => state.profile.favLoading);
  const nextPage = useAppSelector((state: RootState) => state.profile.favNextPage);

  const renderItem = ({ item }: { item: any }) => (
    <ShopItemLarge
      item={item}
      style={{
        marginBottom: 20
      }}
    />
  );

  const onEndReached = () => {
    if (!isLoading && nextPage != null) {
      dispatch(getUserProfileFav({

      }));
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
        ListFooterComponent={
          <>
            {isLoading && <ActivityIndicator color="grey" style={{ marginVertical: 10 }}/> }
          </>
        }
      />
    </View>
  );
}

