import React, { useState, useEffect, useRef, useMemo, Dispatch, SetStateAction } from 'react';
import { View, Text, FlatList, InteractionManager, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { StackActions, useNavigation } from '@react-navigation/native';

import { useAppSelector, useAppDispatch } from '@/hooks';
import { RootState, store } from '@/store';
import { getShopSearchResult, getShopSearchResultNextPage, resetShopSearch } from '@/store/shopSearch';
import Layout from '@/constants/Layout';
import { ShopItemLarge } from '@/components/ShopItem';
import Icon from '@/components/Icon';
import { OptionBar, OptionButton, OptionText } from './styles';
import FilterModal from './FilterModal';
import SortingModal from './SortingModal';
import SearchBar from '@/components/SearchBar';
import { FilterNameType, FilterType, SortingType } from '@/types';
import { getFilterString, updatedFilter } from '@/utils/myUtils';


export default function SearchResult({ hideSearchBar }: { hideSearchBar?: boolean }) {
  
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);
  
  const searchStatus = useAppSelector((state: RootState) => state.shopSearch.status);
  const searchResult = useAppSelector((state: RootState) => state.shopSearch.result);
  const params = useAppSelector((state: RootState) => state.shopSearch.params);
  const nextPage = useAppSelector((state: RootState) => state.shopSearch.nextPage);

  const [hasInit, setHasInit] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSortingVisible, setIsSortingVisible] = useState(false);

  // const [params, setParams] = useState<any>({});
  const [searchString, setSearchString] = useState("");
  const [sorting, setSorting] = useState<SortingType>("rating")
  useEffect(() => {
    if (hasInit) {
      search();
    }
  }, [sorting])

  const [filter, setFilter] = useState<FilterType>({
    districts: [],
    petTypes: [],
    needTypes: [],
    specialCats: [],
  });
  const [filterStringArray, setFilterStringArray] = useState<string[]>([]);
  // const filterString = filterStringArray.reduce(
  //   (previousValue, currentValue) => previousValue + (previousValue == "" ? "" : ", ") + currentValue
  // , "");
  const filterString = getFilterString(filter);

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

  useEffect(() => {
    if (params.searchString) {
      setSearchString(params.searchString);
    }
    if (params.filter) {
      setFilter(params.filter);
    }
    else {
      let filter = {
        districts: [],
        petTypes: [],
        needTypes: [],
        specialCats: [],
      };
      if (params.regions) {
        filter.districts = params.regions;
      }
      if (params.pets) {
        filter.petTypes = params.pets;
      }
      if (params.cats) {
        filter.needTypes = params.cats;
      }
      setFilter(filter);
    }
    setHasInit(true);
  }, [params])

  const renderItem = ({ item }: { item: any }) => (
    <ShopItemLarge
      item={item}
      style={{
        marginBottom: 20
      }}
    />
  );

  const onEndReached = () => {
    console.log("reached", searchStatus, nextPage);
    if (searchStatus != "loading" && nextPage != null) {
      dispatch(getShopSearchResultNextPage());
    }
  }

  const search = () => {
    dispatch(getShopSearchResult({
      ...params,
      ...searchString != "" && { searchString },
      filter,
      ...sorting && { sorting }
    }));
  }

  return (
    <View style={{ flex: 1 }}>

      {/* header */}
      <SafeAreaInsetsContext.Consumer>
        {insets => 
          <View 
            style={{ 
              backgroundColor: "white", 
              paddingHorizontal: 15, 
              paddingTop: 18 + (insets?.top ?? 0),
              paddingBottom: 15, 
              zIndex: 999,
            }} 
          >
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
              {/* back arrow */}
              <Icon
                icon={require(`@/assets/icons/icon-backArrow.png`)}
                size={24}
                onPress={() => navigation.dispatch(popAction)}
                style={{ marginRight: 5 }}
              />
              {/* searbar */}
              <View style={{ flex: 1 }}>
                <SearchBar 
                  value={searchString}
                  placeholder={t("search_shopName")}
                  onChangeText={setSearchString}
                  onSubmit={search}
                />
              </View>
            </View>
            {/* filter and sorting */}
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
              <OptionBar>
                <OptionButton as={TouchableOpacity} onPress={() => setIsFilterVisible(true)}>
                  <Icon size={17} icon={require("../../assets/icons/icon-filter-red.png")}/>
                  <OptionText style={{ marginLeft: 10 }}>{t('search_filterBy')}</OptionText>
                  <Icon size={17} icon={require("../../assets/icons/icon-downArrowOrange.png")}/>
                </OptionButton>
                <OptionButton as={TouchableOpacity} onPress={() => setIsSortingVisible(true)}>
                  <Icon size={17} icon={require("../../assets/icons/icon-sorting-red.png")}/>
                  <OptionText style={{ marginLeft: 10 }}>{sorting == null ? t('search_sortBy') : t(`sort_${sorting}`)}</OptionText>
                  <Icon size={17} icon={require("../../assets/icons/icon-downArrowOrange.png")}/>
                </OptionButton>
              </OptionBar>
            </View>
          </View>
        }
      </SafeAreaInsetsContext.Consumer>

      {searchStatus == "loading" && searchResult.length == 0 &&
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator color="grey" />
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
            paddingHorizontal: Layout.page.paddingHorizontal,
            paddingVertical: 15,
          }}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.9}
          ListFooterComponent={
            <>
            {searchStatus == "loading" &&
              <View style={{ width: "100%", alignItems: "center", justifyContent: "center"}}>
                <ActivityIndicator color="grey" />
              </View>
            }
            </>
          }
        />
      }

      <FilterModal
        filter={filter}
        updateFilter={updateFilter}
        resetFilter={resetFilter}
        isVisible={isFilterVisible}
        close={() => setIsFilterVisible(false)}
        confirm={search}
      />

      <SortingModal
        isVisible={isSortingVisible}
        close={() => setIsSortingVisible(false)}
        sorting={sorting}
        setSorting={setSorting}
      />
        
    </View>
  );
}



