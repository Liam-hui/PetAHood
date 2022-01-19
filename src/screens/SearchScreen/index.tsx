import React, { useState, useEffect, useRef, createRef } from 'react';
import { View, Image, Text, ScrollView, ImageSourcePropType, TouchableOpacity, TextInput, InteractionManager } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootState, store } from '@/store';
import { useAppSelector, useAppDispatch } from '@/hooks';
import Icon from '@/components/Icon';
import SearchBar from '@/components/SearchBar';
import { FilterMenu } from './FilterMenu';
import { FilterParamType, filters, FilterType } from './filters';
import Colors from '@/constants/Colors';
import WideButton from '@/components/WideButton';
import { getShopSearchResult } from '@/store/shopSearch';
import { FilterTab } from './FilterTab';

import { BorderItem, BorderItemText, BorderItemWrapper } from './styles';

export default function SearchScreen() {
  
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();
  const popAction = StackActions.pop(1);

  const dispatch = useAppDispatch();
  const searchStatus = useAppSelector((state: RootState) => state.shopSearch.status);
  const [searchHistory, setSearchHistory] = useState([]);

  const searchInputRef = createRef<TextInput>();

  const [searchString, setSearchString] = useState("");
  const [filter, setFilter] = useState<FilterType>({
    region: [],
    petType: [],
    serviceType: [],
    special: [],
  });
  const filterCount = Object.values(filter).reduce(
    (prev, current) => {
      return prev + current.length
    }, 
    0
  );
  const [filterString, setFilterString] = useState("");
  
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [mode, setMode] = useState<null | string>(null);

  useEffect(() => {
    if (searchStatus == "idle") {
    }
    else if (searchStatus == "loading") {
      // show loading
    }
    else if (searchStatus == "success") {
      // hide loading
      navigation.navigate("SearchResult");
    }
    else if (searchStatus == "failed") {
      // hide loading
    }
  }, [searchStatus])

  useEffect(() => {
    searchInputRef.current!.focus();
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      // update search history only when screen comes into focus, prevent getting updated when navigate to search result screen
      setSearchHistory((store.getState() as any).shopSearch.history);
    });
    return unsubscribe;
  }, [navigation]);

  const search = () => {
    if (searchString != "" || filterCount > 0)
      dispatch(getShopSearchResult({
        searchString,
        filter
      }));
  }

  const addFilter = (param: FilterParamType, value: number) => {
    const index = filter[param].findIndex(x => x == value);
    const label = filters[param].find(x => x.value == value)?.label;
    if (index == -1) {
      setFilter(
        {
          ...filter,
          [param]: filter[param].concat(value)
        }
      )
      setFilterString(filterString + (filterString == "" ? "" : ", ") + label);
    }
    else {
      setFilter(
        {
          ...filter,
          [param]: filter[param].filter(x => x != value)
        }
      )
      setFilterString(
        filterString.replace(", " + label, "").replace(label + ", ", "").replace(label!, "")
      );
    }
  }

  const resetFilter = () => {
    setFilter({
      region: [],
      petType: [],
      serviceType: [],
      special: [],
    });
    setFilterString("");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>

      {/* header */}
      <View 
        style={{ 
          flexDirection: "row", 
          alignItems: "center", 
          justifyContent: "space-between", 
          paddingBottom: 10, 
          backgroundColor: "white", 
          paddingHorizontal: 15, 
          paddingTop: 13 + (insets?.top ?? 0) 
        }} >
        <Icon
          icon={require(`../../assets/icons/icon-backArrow.png`)}
          size={24}
          onPress={() => isFilterOn ? setIsFilterOn(false) : navigation.dispatch(popAction) }
        />
        <Image 
          style={{ height: 40 }}
          resizeMode="contain"
          source={require('../../assets/images/logo.png')} 
        />
        <Icon
          icon={require(`../../assets/icons/icon-filter.png`)}
          size={24}
          onPress={isFilterOn ? undefined : () => setIsFilterOn(true) }
          style={{ opacity: isFilterOn ? 0 : 1}}
        />
      </View>

      <View style={{ flex: 1, paddingBottom: insets.bottom + 15 }}>

        {/* search bars */}
        <View style={{ backgroundColor: "white", paddingHorizontal: 20 }}>
          <SearchBar 
            inputRef={searchInputRef}
            value={searchString}
            placeholder="Shop name"
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
            placeholder="Location, Mall"
            isSelected={mode == "filter"}
            onChangeText={() => setFilterString(filterString)}
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

        {mode == "search" &&
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}
          >
        
            {/* recent search */}
            {searchHistory.length > 0 && <>
              <Text style={{ color: Colors.darkBlue, fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>
                Recent Search History
              </Text>
              <BorderItemWrapper>
                {searchHistory.map((item, index) => 
                  <BorderItem as={TouchableOpacity}
                    key={index}
                    onPress={() => {
                      dispatch(getShopSearchResult({
                        searchString: item
                      }));
                    }}
                  >
                    <BorderItemText>{item}</BorderItemText>
                  </BorderItem>
                )}
              </BorderItemWrapper>
            </>}
      
          </ScrollView>
        }

        {mode == "filter" &&
          <View style={{ flex: 1, paddingTop: 10 }}>
            <FilterTab filter={filter} addFilter={addFilter} />
            <WideButton
              text={"Search" + (filterCount > 0 ? ` (${filterCount})` : "")}
              onPress={search}
              style={{
                marginTop: "auto",
                marginHorizontal: 20
              }}
            />
          </View>
        }


        {isFilterOn && <FilterMenu filter={filter} setFilter={setFilter} />}
        
      </View>
      
    </View>
  );
}


