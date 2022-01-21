import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, InteractionManager, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RootState } from '@/store';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getShopSearchResultNextPage, resetShopSearch } from '@/store/shopSearch';
import { ShopItem, ShopItemLarge } from '@/components/ShopItem';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export default function SearchResultScreen() {
  
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const searchStatus = useAppSelector((state: RootState) => state.shopSearch.status);
  const searchResult = useAppSelector((state: RootState) => state.shopSearch.result);
  const nextPage = useAppSelector((state: RootState) => state.shopSearch.nextPage);

  useEffect(() => {
    return () => {
      InteractionManager.runAfterInteractions(() => {
        dispatch(resetShopSearch());
      });
    }
  }, [])

  // const renderItem = ({ item }: { item: any }) => (
  //   <ShopItemLarge
  //     item={item}
  //     style={{
  //       marginBottom: 20
  //     }}
  //   />
  // );

  const renderItem = ({ item, index }: { item: any, index: number }) => (
    <View 
      style={{ 
        width: "50%", 
        ...index % 2 == 0 ? { paddingRight: "2%", paddingLeft: "4%" } : { paddingLeft: "2%", paddingRight: "4%" } 
      }}>
      <ShopItem
        item={item}
        style={{
          width: "100%",
          height: Layout.window.width * 0.5 * 0.94,
          marginBottom: 20
        }}
      />
    </View>
  );

  const onEndReached = () => {
    if (searchStatus != "loading" && nextPage != null) {
      dispatch(getShopSearchResultNextPage());
    }
  }

  // useEffect(() => {
  //   console.log(searchResult);
  // }, [searchResult])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBlue }}>

      <Header title={t("search_searchResult")}/>

      {searchStatus == "loading" && searchResult.length == 0 &&
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator/>
        </View>
      }

      {searchStatus != "loading" && searchResult.length == 0 &&
        <View style ={{ flex: 1, alignItems: "center" , justifyContent: "center" }}>
          <Text>{t("search_noResult")}</Text>
        </View>
      }

      {searchResult.length > 0 &&
        <FlatList
          data={searchResult}
          renderItem={renderItem}
          // keyExtractor={item => item.id}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ 
            // paddingHorizontal: Layout.page.paddingHorizontal,
            paddingVertical: 15,
          }}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.9}
          numColumns={2}
        />
      }
        
    </View>
  );
}



