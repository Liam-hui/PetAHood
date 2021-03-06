import React, { useEffect, useMemo, useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import FootprintGraph from './FootprintGraph';
import Icon from '@/components/Icon';
import Colors from '@/constants/Colors';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function Footprint() {

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const data = useAppSelector((state: RootState) => state.profile.footprint);

  const size = 140;
  const r = size / 2;

  const [mode, setMode] = useState<"total" | "this_month">("this_month");
  const placesCount = data ? data[mode]["places-to-go"].comments : 0;
  const servicesCount = data ? data[mode]["pet-services"].comments : 0;
  const shopsCount = data ? data[mode]["shops"].comments : 0;

  const values = useMemo(() => {
    if (data != null) {
      const max = Math.max(placesCount, servicesCount, shopsCount);
      console.log(max);
      if (max == 0)
        return [0, 0, 0];
      return [
        placesCount / max,
        shopsCount / max,
        servicesCount / max,
      ]
    }
  }, [placesCount, servicesCount, shopsCount])

  if (data == null)
    return null;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 20, paddingBottom: insets.bottom }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        {/* graph */}
        <View style={{ alignItems: "center", width: size, height: size, overflow: "visible", margin: 20 }}>
          {values && <FootprintGraph size={size} values={values} />}
          <Text 
            style={{
              fontWeight: "bold",
              position: "absolute",
              top: -20,
              color: placesCount > servicesCount && placesCount > shopsCount ? Colors.orange : "black"
            }}
          >
            {t("footprint_place")}
          </Text>
          <Text 
            style={{
              fontWeight: "bold",
              position: "absolute",
              left: -30,
              top: Math.cos(Math.PI / 3) * r + r,
              color: servicesCount > placesCount && servicesCount > shopsCount ? Colors.orange : "black"
            }}
          >
            {t("footprint_service")}
          </Text>
          <Text 
            style={{
              fontWeight: "bold",
              position: "absolute",
              right: -30,
              top: Math.cos(Math.PI / 3) * r + r,
              color: shopsCount > servicesCount && shopsCount > placesCount ? Colors.orange : "black"
            }}
          >
            {t("footprint_shop")}
          </Text>
        </View>
        {/* info */}
        <View style={{ marginLeft: 20, backgroundColor: "white", paddingVertical: 5, borderRadius: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5, paddingHorizontal: 10 }}>
            <Icon
              size={12}
              icon={require("@/assets/icons/icon-placeOrange.png")}
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontWeight: "bold", marginRight: 8 }}>{t("footprint_place")}:</Text>
            <Text style={{ fontWeight: "bold", color: Colors.orange }}>{placesCount}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5, paddingHorizontal: 10 }}>
            <Icon
              size={12}
              icon={require("@/assets/icons/icon-placeGreen.png")}
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontWeight: "bold", marginRight: 8 }}>{t("footprint_service")}</Text>
            <Text style={{ fontWeight: "bold", color: Colors.orange }}>{servicesCount}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5, paddingHorizontal: 10 }}>
            <Icon
              size={12}
              icon={require("@/assets/icons/icon-placePurple.png")}
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontWeight: "bold", marginRight: 8 }}>{t("footprint_shop")}:</Text>
            <Text style={{ fontWeight: "bold", color: Colors.orange }}>{shopsCount}</Text>
          </View>
        </View>
      </View>
      {/* choose graph */}
      <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 20, marginBottom: 20 }}>
        <TouchableOpacity 
          style={{ borderRadius: 5, flexDirection: "row", paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "white", alignItems: "center", marginRight: 15 }}
          onPress={() => setMode("this_month")}
        >
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: mode == "this_month" ? Colors.orange : "#B2B2B2", marginRight: 10 }} />
          <Text>{t("footprint_currentMonth")}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ borderRadius: 5, flexDirection: "row", paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "white", alignItems: "center" }}
          onPress={() => setMode("total")}
        >
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: mode == "total" ? Colors.orange : "#B2B2B2", marginRight: 10 }} />
          <Text>{t("footprint_lifetime")}</Text>
        </TouchableOpacity>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE} 
        // pointerEvents="none"
        style={{ width: "100%", height: 300 }}
        region={{
          latitude: 22.349390506029565,
          longitude: 114.15845409035683,
          latitudeDelta: 0.33104565619627024,
          longitudeDelta: 0.4653136432170868
        }}
        scrollEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}
        onRegionChange={(region) => {
          console.log(region)
        }}
      >
        {[...data.locations["places-to-go"]].map(x => {
          return (
            <Marker
              coordinate={{
                latitude: Number(x.lat),
                longitude: Number(x.lng)
              }}
            >
              <Icon
                size={15}
                icon={require("@/assets/icons/icon-placeOrange.png")}
                style={{ marginRight: 8 }}
              />
            </Marker>
          );
        })}
        {[...data.locations["pet-services"]].map(x => {
          return (
            <Marker
              coordinate={{
                latitude: Number(x.lat),
                longitude: Number(x.lng)
              }}
            >
              <Icon
                size={15}
                icon={require("@/assets/icons/icon-placeGreen.png")}
                style={{ marginRight: 8 }}
              />
            </Marker>
          );
        })}
        {[...data.locations["shops"]].map(x => {
          return (
            <Marker
              coordinate={{
                latitude: Number(x.lat),
                longitude: Number(x.lng)
              }}
            >
              <Icon
                size={15}
                icon={require("@/assets/icons/icon-placePurple.png")}
                style={{ marginRight: 8 }}
              />
            </Marker>
          );
        })}
      </MapView>
    </ScrollView>
  );
}
