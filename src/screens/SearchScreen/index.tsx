import React, { useState, useEffect } from 'react';
import { View, Image, Text, ScrollView, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useNavigation, StackActions } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

import Icon from '@/components/Icon';
import SearchBar from '@/components/SearchBar';
import FilterMenu from './FilterMenu';
import Colors from '@/constants/Colors';

export default function SearchScreen() {

  const navigation = useNavigation();
  const popAction = StackActions.pop(1);
  const [searchText, setSearchText] = useState("");

  const [isFilterOn, setIsFilterOn] = useState(false);
  const [mode, setMode] = useState<null | string>(null);

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>

      {/* header */}
      <SafeAreaInsetsContext.Consumer>
        {insets => <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 10, backgroundColor: "white", paddingHorizontal: 15, paddingTop: 13 + (insets?.top ?? 0) }} >
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
        </View>}
      </SafeAreaInsetsContext.Consumer>

      <View style={{ flex: 1 }}>

        {/* search bars */}
        <View style={{ backgroundColor: "white", paddingHorizontal: 20 }}>
          <SearchBar 
            value={searchText}
            placeholder="Shop name"
            onChangeText={setSearchText}
            onSubmit={() => {}}
            isSelected={mode == "name"}
            select={() => {
              setMode("name");
            }}
            unselect={() => {
              setMode(null);
            }}
            style={{marginBottom: 10 }}
          />
          <SearchBar 
            value={searchText}
            placeholder="Location, Mall"
            onChangeText={setSearchText}
            onSubmit={() => {}}
            isSelected={mode == "location"}
            select={() => {
              setMode("location");
            }}
            unselect={() => {
              setMode(null);
            }}
            style={{ marginBottom: 15 }}
          />
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}
        >

          {/* recent search */}
          <Text style={{ color: Colors.darkBlue, fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>
            Recent Search History
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {["aaaaaa", "aaaaaa", "aaaaaa", "aaaaaa", "aaaaaa", "aaaaaa", "aaaaaa"].map(item => 
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: Colors.darkBlue,
                  height: 24,
                  borderRadius: 12,
                  paddingHorizontal: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 4,
                  marginHorizontal: 3
                }}
              >
                <Text style={{ color: Colors.darkBlue, fontSize: 12 }}>{item}</Text>
              </TouchableOpacity>
            )}
          </View>


        </ScrollView>

        {isFilterOn && <FilterMenu/>}
        
      </View>
      
    </View>
  );
}



