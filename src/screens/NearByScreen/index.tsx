import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, InteractionManager } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';

import { RootState } from '@/store';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getShopSearchResult, getShopSearchResultNextPage, resetShopSearch } from '@/store/shopSearch';
import { ShopItemLarge } from '@/components/ShopItem';
import Header from '@/components/Header';

export default function NearByScreen() {
  
  const dispatch = useAppDispatch();
  const searchStatus = useAppSelector((state: RootState) => state.shopSearch.status);
  const searchResult = useAppSelector((state: RootState) => state.shopSearch.result);
  const nextPage = useAppSelector((state: RootState) => state.shopSearch.nextPage);

  useEffect(() => {
    dispatch(resetShopSearch());
    
    // return () => {
    //   InteractionManager.runAfterInteractions(() => {
    //     dispatch(resetShopSearch());
    //   });
    // }
  }, [])

  const renderItem = ({ item }: { item: any }) => (
    <ShopItemLarge
      item={item}
      style={{
        marginBottom: 20
      }}
    />
  );

  const onEndReached = () => {
    if (searchStatus != "loading" && nextPage != null) {
      dispatch(getShopSearchResultNextPage());
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>

      <Header/>

      {searchResult.length == 0 
        ? 
          <View style ={{ flex: 1, alignItems: "center" , justifyContent: "center" }}>
            <Text>No Result</Text>
          </View>
        :
          <FlatList
            data={searchResult}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ 
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.9}
            ListEmptyComponent={
              <View style ={{ flex: 1, alignItems: "center" , justifyContent: "center" }}>
                <Text>No Result</Text>
              </View>
            }
          />
      }
        
    </View>
  );
}



