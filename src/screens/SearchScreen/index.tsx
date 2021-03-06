import React, { useState, useEffect, useRef, createRef } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation, StackActions, useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootState, store } from '@/store';
import { useAppSelector, useAppDispatch } from '@/hooks';
import Icon from '@/components/Icon';
import SearchBar from '@/components/SearchBar';
import Colors from '@/constants/Colors';
import WideButton from '@/components/WideButton';
import { Filter } from '@/components/Filter';
import { getCommentsPicks, getRatingPicks, getShopQuickSearchResult, getShopSearchResult, resetShopQuickSearch } from '@/store/shopSearch';

import { NearBy, BorderItem, BorderItemText, BorderItemWrapper } from './styles';
import { hideLoading, showLoading } from '@/store/loading';
import { useTranslation } from 'react-i18next';
import HotPicks from './HotPicks';
import Layout from '@/constants/Layout';
import { FilterNameType, FilterType } from '@/types';
import { ShopItemRow } from '@/components/ShopItem';
import { getFilterString, updatedFilter } from '@/utils/myUtils';

export default function SearchScreen() {
  
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);
  const dispatch = useAppDispatch();
  const [hasSearch, setHasSearch] = useState(false);

  const searchStatus = useAppSelector((state: RootState) => state.shopSearch.status);
  const [searchHistory, setSearchHistory] = useState([]);
  
  const [searchString, setSearchString] = useState("");
  const searchInputRef = createRef<TextInput>();

  const quickSearchStatus = useAppSelector((state: RootState) => state.shopSearch.quickSearchStatus);
  const quickSearchResult = useAppSelector((state: RootState) => state.shopSearch.quickSearchResult);

  const ratingPicks = useAppSelector((state: RootState) => state.shopSearch.ratingPicks);
  const commentsPicks = useAppSelector((state: RootState) => state.shopSearch.commentsPicks);

  const [filter, setFilter] = useState<FilterType>({
    districts: [],
    petTypes: [],
    needTypes: [],
    specialCats: [],
  });
  const [filterStringArray, setFilterStringArray] = useState<string[]>([]);
  const filterString = getFilterString(filter);
  const filterCount = Object.values(filter).reduce(
    (prev, current) => {
      return prev + current.length
    }, 
    0
  );

  const updateFilter = (filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean) => {
    const result = updatedFilter(filter, filterStringArray, filterName, items, isForceAdd);
    setFilter(result.filter);
    setFilterStringArray(result.filterStringArray);
  }

  const resetFilter = () => {
    setFilter({
      districts: [],
      petTypes: [],
      needTypes: [],
      specialCats: [],
    });
    setFilterStringArray([]);
  }
  
  const [mode, setMode] = useState<string | null>(null);

  useEffect(() => {
    searchInputRef.current!.focus();
    dispatch(getRatingPicks());
    dispatch(getCommentsPicks());
  }, [])

  useEffect(() => {
    if (hasSearch) {
      if (searchStatus == "loading") {
        dispatch(showLoading());
      }
      else if (searchStatus == "success") {
        setHasSearch(false);
        dispatch(hideLoading());
        navigation.navigate("SearchResult");
      }
      else if (searchStatus == "failed") {
        setHasSearch(false);
        dispatch(hideLoading());
      }
    }
  }, [searchStatus])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // update search history only when screen comes into focus, prevent getting updated when navigate to search result screen
      setSearchHistory((store.getState() as any).shopSearch.history);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    quickSearch();
  }, [searchString])

  const search = () => {
    if (searchString != "" || filterCount > 0) {
      setHasSearch(true);
      dispatch(getShopSearchResult({
        searchString,
        filter
      }));
    }
  }

  const searchFromHistory = (searchString: string) => {
    setHasSearch(true);
    dispatch(getShopSearchResult({ searchString }));
  }

  const searchFromQuickSearch = () => {
    if (searchString != "" || filterCount > 0) {
      setHasSearch(true);
      dispatch(getShopSearchResult({
        searchString,
      }));
    }
  }

  const quickSearch = () => {
    if (searchString != "")
      dispatch(getShopQuickSearchResult({
        searchString,
      }));
    else {
      dispatch(resetShopQuickSearch());
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBlue }}>

      {/* header */}
      <View 
        style={{ 
          flexDirection: "row", 
          alignItems: "center", 
          justifyContent: "center", 
          paddingBottom: 10, 
          backgroundColor: "white", 
          paddingHorizontal: 15, 
          paddingTop: 13 + (insets?.top ?? 0) 
        }} >
        <Icon
          icon={require(`../../assets/icons/icon-backArrow.png`)}
          size={24}
          style={{ position: "absolute" , left: 10, bottom: 15 }}
          onPress={() => navigation.dispatch(popAction)}
        />
        <Image 
          style={{ height: 40 }}
          resizeMode="contain"
          source={require('../../assets/images/logo.png')} 
        />
      </View>

      <View style={{ flex: 1 }}>

        {/* search bars */}
        <View style={{ backgroundColor: "white", paddingHorizontal: 20, paddingBottom: 15, flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ backgroundColor: Colors.orange, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, height: 32, borderRadius: 24, marginRight: 5 }}
            onPress={() => {
              setMode(mode == "filter" ? null: "filter");
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>{t("search_search")}</Text>
            {/* <Text style={{ color: "white", fontWeight: "bold", flex: 1 }} numberOfLines={1}>{filterString == "" ? t("search_filter") : filterString}</Text> */}
            <Icon icon={require("@/assets/icons/icon-backArrowWhite.png")} size={15} style={{ marginLeft: 5, transform: [{ rotate: mode == "filter" ? "90deg" : "-90deg" }] }} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <SearchBar 
              inputRef={searchInputRef}
              value={searchString}
              placeholder={t("search_shopName")}
              onChangeText={setSearchString}
              onSubmit={search}
              isSelected={mode == "search"}
              select={() => {
                setMode("search");
              }}
              unselect={() => {
                setMode(null);
                setSearchString("");
              }}
              style={{  }}
            />
          </View>
        </View>

        {(mode == null || (mode == "search" && searchString == "")) &&
          <ScrollView
            contentContainerStyle={{
              paddingTop: 20,
              paddingBottom: insets.bottom + 15
            }}
          >
            <View style={{ paddingHorizontal: Layout.page.paddingHorizontal }}>
              <NearBy as={TouchableOpacity}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("NearBy")}
              >
                <Icon
                  icon={require(`../../assets/icons/icon-location.png`)}
                  size={30}
                  style={{ marginRight: 15 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold", color: Colors.orange, marginBottom: 3 }}>{t("nearby_heading")}</Text>
                  <Text>{t("nearby_description")}</Text>
                </View>
                <Icon
                  icon={require(`../../assets/icons/icon-backArrow.png`)}
                  size={24}
                  style={{ marginLeft: 15, transform: [{ rotate: "180deg" }] }}
                />
              </NearBy>
          
              {/* recent search */}
              {searchHistory?.length > 0 && <>
                <Text style={{ color: Colors.darkBlue, fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>
                  {t('search_recentSearch')}
                </Text>
                <BorderItemWrapper>
                  {searchHistory.map((item, index) => 
                    <BorderItem as={TouchableOpacity}
                      key={index}
                      onPress={() => searchFromHistory(item)}
                    >
                      <BorderItemText>{item}</BorderItemText>
                    </BorderItem>
                  )}
                </BorderItemWrapper>
              </>}
            </View>
            
            {(ratingPicks?.length > 0 || commentsPicks?.length > 0) && 
              <ScrollView 
                style={{ marginTop: 20 }}
                contentContainerStyle={{ flexDirection: "row", paddingHorizontal: Layout.page.paddingHorizontal }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {ratingPicks?.length > 0 && <HotPicks data={ratingPicks} />}
                {commentsPicks?.length > 0 && <HotPicks data={commentsPicks} />}
              </ScrollView>
            }
        
          </ScrollView>
        }

        {/* quick search result */}
        {mode == "search" && searchString != "" &&
          <>
            {quickSearchStatus == "loading"
              ? <ActivityIndicator color="#AAAAAA" style={{ marginTop: 20 }} />
              : quickSearchResult?.length > 0
                ? <ScrollView contentContainerStyle={{ paddingHorizontal: Layout.page.paddingHorizontal, backgroundColor: "white" }}>
                  {quickSearchResult.slice(0, 20).map((item) => {
                    return (
                      <ShopItemRow
                        key={item.id}
                        item={item}
                      />
                    )
                  })}
                  <TouchableOpacity 
                    style={{ 
                      alignSelf: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      marginVertical: 10
                    }}
                    onPress={searchFromQuickSearch}
                  >
                    <Text>{t("search_more")}</Text>
                  </TouchableOpacity>
                </ScrollView>
                : <Text style={{ alignSelf: "center", marginTop: 20 }}>{t("search_noResult")}</Text>
            }
          </>
        }

        {mode == "filter" &&
          <View style={{ flex: 1, paddingTop: 10, paddingBottom: insets.bottom + 15 }}>
            <Filter filter={filter} updateFilter={updateFilter} />
            <WideButton
              text={t('search_search') + (filterCount > 0 ? ` (${filterCount})` : "")}
              onPress={search}
              style={{
                marginTop: "auto",
                marginHorizontal: 20
              }}
            />
          </View>
        }
        
      </View>
      
    </View>
  );
}


