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
import { getShopQuickSearchResult, getShopSearchResult, resetShopQuickSearch, resetShopSearchFilter } from '@/store/shopSearch';
import { FilterTab } from './FilterTab';

import { NearBy, BorderItem, BorderItemText, BorderItemWrapper } from './styles';
import { hideLoading, showLoading } from '@/store/loading';
import { useTranslation } from 'react-i18next';
import ShopList from '@/components/ShopList';
import HotPicks from './HotPicks';
import Layout from '@/constants/Layout';

export default function SearchScreen() {
  
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const searchStatus = useAppSelector((state: RootState) => state.shopSearch.status);
  const [searchHistory, setSearchHistory] = useState([]);
  
  const [searchString, setSearchString] = useState("");
  const searchInputRef = createRef<TextInput>();

  const quickSearchStatus = useAppSelector((state: RootState) => state.shopSearch.quickSearchStatus);
  const quickSearchResult = useAppSelector((state: RootState) => state.shopSearch.quickSearchResult);

  const filter = useAppSelector((state: RootState) => state.shopSearch.filter);
  const filterString = useAppSelector((state: RootState) => state.shopSearch.filterString);
  const filterCount = Object.values(filter).reduce(
    (prev, current) => {
      return prev + current.length
    }, 
    0
  );
  
  const [mode, setMode] = useState<string | null>(null);

  useEffect(() => {
    searchInputRef.current!.focus();

    return resetFilter;
  }, [])

  useEffect(() => {
    if (isFocused) {
      if (searchStatus == "loading") {
        dispatch(showLoading());
      }
      else if (searchStatus == "success") {
        dispatch(hideLoading());
        navigation.navigate("SearchResult");
      }
      else if (searchStatus == "failed") {
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
    if (searchString != "" || filterCount > 0)
      dispatch(getShopSearchResult({
        searchString,
        filter
      }));
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

  const resetFilter = () => {
    dispatch(resetShopSearchFilter());
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
          // onPress={() => isFilterOn ? setIsFilterOn(false) : navigation.dispatch(popAction) }
        />
        <Image 
          style={{ height: 40 }}
          resizeMode="contain"
          source={require('../../assets/images/logo.png')} 
        />
        {/* <Icon
          icon={require(`../../assets/icons/icon-filter.png`)}
          size={24}
          onPress={isFilterOn ? undefined : () => setIsFilterOn(true) }
          style={{ opacity: isFilterOn ? 0 : 1}}
        /> */}
      </View>

      <View style={{ flex: 1, paddingBottom: insets.bottom + 15 }}>

        {/* search bars */}
        <View style={{ backgroundColor: "white", paddingHorizontal: 20 }}>
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
            }}
            style={{ marginBottom: 10 }}
          />
          <SearchBar 
            value={filterString}
            placeholder={t("search_filter")}
            isSelected={mode == "filter"}
            select={() => {
              setMode("filter");
            }}
            unselect={() => {
              setMode(null);
              resetFilter();
            }}
            style={{ marginBottom: 15 }}
            isTextDisabled
          />
        </View>

        {(mode == null || (mode == "search" && searchString == "")) &&
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 20,
            }}
          >
            <View style={{ paddingHorizontal: Layout.page.paddingHorizontal }}>
              <NearBy as={TouchableOpacity}
                activeOpacity={0.7}
                // onPress={() => navigation.navigate("NearBy")}
              >
                <Icon
                  icon={require(`../../assets/icons/icon-location.png`)}
                  size={30}
                  style={{ marginRight: 15 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold", color: Colors.orange, marginBottom: 3 }}>Near by</Text>
                  <Text>Services, Place-to-go, Shops</Text>
                </View>
                <Icon
                  icon={require(`../../assets/icons/icon-backArrow.png`)}
                  size={24}
                  style={{ marginLeft: 15, transform: [{ rotate: "180deg" }] }}
                />
              </NearBy>
          
              {/* recent search */}
              {searchHistory.length > 0 && <>
                <Text style={{ color: Colors.darkBlue, fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>
                  {t('search_recentSearch')}
                </Text>
                <BorderItemWrapper>
                  {searchHistory.map((item, index) => 
                    <BorderItem as={TouchableOpacity}
                      key={index}
                      onPress={() => {
                        dispatch(getShopSearchResult({ searchString: item }));
                      }}
                    >
                      <BorderItemText>{item}</BorderItemText>
                    </BorderItem>
                  )}
                </BorderItemWrapper>
              </>}
            </View>
            
            <ScrollView 
              style={{ marginTop: 20 }}
              contentContainerStyle={{ flexDirection: "row", paddingHorizontal: Layout.page.paddingHorizontal }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <HotPicks/>
              <HotPicks/>
            </ScrollView>
      
          </ScrollView>
        }

        {/* quick search result */}
        {mode == "search" && searchString != "" &&
          <View style={{ marginTop: 30 }}>
            {quickSearchStatus == "loading"
              ? <ActivityIndicator color="#AAAAAA"/>
              : quickSearchResult.length > 0
                ? <ShopList 
                    data={quickSearchResult} 
                    endComponent={<>
                      {quickSearchResult.length >= 20 &&
                        <TouchableOpacity 
                          style={{ 
                            paddingHorizontal: 10,
                            marginRight: 20
                          }}
                          onPress={() => {
                            dispatch(getShopSearchResult({
                              searchString
                            }));
                          }}
                        >
                          <Text>{t("search_more")}</Text>
                        </TouchableOpacity>
                      }
                      </>}
                  />
                : <Text style={{ alignSelf: "center" }}>{t("search_noResult")}</Text>
            }
          </View>
        }

        {mode == "filter" &&
          <View style={{ flex: 1, paddingTop: 10 }}>
            <FilterTab/>
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


