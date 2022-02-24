import React, { useState, useEffect } from 'react';
import { View, InteractionManager } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { resetShopSearch } from '@/store/shopSearch';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import SearchResult from './SearchResult'
import SearchBar from '@/components/SearchBar';
import Layout from '@/constants/Layout';
import { RootStackScreenProps } from '@/types';
import { RootState } from '@/store';

export default function SearchResultScreen(props: RootStackScreenProps<'SearchResult'>) {
  
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      InteractionManager.runAfterInteractions(() => {
        dispatch(resetShopSearch());
      });
    }
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBlue }}>
      {/* <Header title={t("search_searchResult")} noShadow /> */}
      <SearchResult/>  
    </View>
  );
}



