import React, { useState, useEffect } from 'react';
import { View, Image, Text, ScrollView, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useNavigation, StackActions } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

import { RootState } from '@/store';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getHomePageData } from '@/store/homePageData';
import WideButton from '@/components/WideButton';
import SearchBar from '@/components/SearchBar';

export default function FilterMenu() {

  const navigation = useNavigation();
  const popAction = StackActions.pop(1);
  const [searchText, setSearchText] = useState("");

  const [mode, setMode] = useState<null | string>(null);

  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => <View style={{ position: "absolute", backgroundColor: "white", width: "100%", height: "100%", paddingHorizontal: 20, paddingBottom: 10 + (insets?.bottom ?? 0) }}>

        <WideButton
          text="Search"
          onPress={() => {}}
          style={{
            marginTop: "auto"
          }}
        />
        
      </View>}
    </SafeAreaInsetsContext.Consumer>
  );
}



