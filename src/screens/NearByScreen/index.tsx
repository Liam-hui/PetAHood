import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, FlatList, InteractionManager, TouchableOpacity, ActivityIndicator, Platform, PermissionsAndroid } from 'react-native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { RootState } from '@/store';
import { getShopSearchResult, getShopSearchResultNextPage, resetShopSearch } from '@/store/shopSearch';
import { useAppSelector, useAppDispatch } from '@/hooks';
import Header from '@/components/Header';
import SearchResult from '@/screens/SearchResultScreen/SearchResult';
import Colors from '@/constants/Colors';
import Icon from '@/components/Icon';
import { ShopItemLarge } from '@/components/ShopItem';
import Layout from '@/constants/Layout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';

export default function NearByScreen() {
  
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  // const isFocused = useIsFocused();
  
  const searchResult = useAppSelector((state: RootState) => state.shopSearch.result);
  const searchStatus = useAppSelector((state: RootState) => state.shopSearch.status);
  const nextPage = useAppSelector((state: RootState) => state.shopSearch.nextPage);

  const mapRef = useRef<any | null>(null);
  const [status, setStatus] = useState<"idle" | "finished" | "started">("idle");
  const [location, setLocation] = useState<{ long:number, lat:number } | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    getLocation();
    return () => {
      InteractionManager.runAfterInteractions(() => {
        dispatch(resetShopSearch());
      });
    }
  }, [])

  // useFocusEffect(
  //   useCallback(() => {
  //     if (location != null)
  //       dispatch(getShopSearchResult({
  //         location
  //       }));
  //   }, [location])
  // );

  useEffect(() => {
    if (location != null && status == "idle") {
      dispatch(getShopSearchResult({
        location
      }));
      setStatus("started");
    }
  }, [location])

  useEffect(() => {
    if (status == "started" && searchStatus == "success") {
      setResults(searchResult);
      if (nextPage != null && searchResult.length > 0 && searchResult[searchResult.length - 1]["distance_in_km"] < 1) {
        dispatch(getShopSearchResultNextPage());
      }
      else {
        setStatus("finished");
      }
    }
  }, [searchResult])

  const getLocation = async () => {
    if (
      (Platform.OS == "android" && await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) ||
      (Platform.OS == "ios" && await Geolocation.requestAuthorization("whenInUse"))
    ) {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation({ long: Number(position.coords.longitude), lat: Number(position.coords.latitude) });
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }

  const goToSearchResult = () => {
    dispatch(getShopSearchResult({
      location
    }));
    navigation.navigate("SearchResult");
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBlue }}>

      <Header 
        title={t("nearby_heading")}
        action={
          <Icon
            icon={require("../../assets/icons/icon-list.png")}
            size={22}
            onPress={goToSearchResult}
          />
        }
      />

      <View style={{ flex: 1 }}>

        {location == null && 
          <View style={{ position: "absolute", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator/>
          </View>
        }

        {location != null &&
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE} 
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: location.lat,
              longitude: location.long,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onRegionChangeComplete={(region) => {
              // setLocation({ lat: region.latitude, long: region.longitude })
            }}
          >
            {results.map(item =>
              <>
                {item.location &&
                  <Marker
                    key={item.id}
                    coordinate={{
                      latitude: Number(item.location.lat),
                      longitude: Number(item.location.lng)
                    }}
                    onPress={() => {
                      // mapRef.current.animateToRegion({
                      //   latitude: Number(item.location.lat),
                      //   longitude: Number(item.location.lng),
                      //   // latitudeDelta: 0.0043,
                      //   // longitudeDelta: 0.0034
                      // }, 500);
                      setSelectedItem(item);
                    }}
                  >
                    <FastImage
                      style={{ width: 30, height: 40 }}
                      source={require("@/assets/icons/icon-locationMarker.png")}
                      resizeMode='contain'
                    />
                  </Marker>
                }
              </>
            )}
          </MapView>
        }

        {selectedItem &&
          <SafeAreaView 
            edges={["bottom"]}
            style={{ position: "absolute", bottom: 30, width: "100%", paddingHorizontal: Layout.page.paddingHorizontal }}
          >
            <ShopItemLarge
              item={selectedItem}
              // isPressTitle
            />
             {/* <Icon
              style={{ position: "absolute", top: 10, right: Layout.page.paddingHorizontal + 10 }}
              icon={require("../../assets/icons/icon-close.png")}
              size={15}
              onPress={() => setSelectedItem(null)}
            /> */}
          </SafeAreaView>
        }

      </View>
    </View>
  );
}



