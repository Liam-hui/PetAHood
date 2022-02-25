import Colors from '@/constants/Colors';
import { useAppDispatch } from '@/hooks';
import { getShopSearchResult } from '@/store/shopSearch';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Tag({ tag, style }: { tag: any, style?: any }) {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const search = () => {
    dispatch(getShopSearchResult({
      cats: [ tag.id ]
    }));
    navigation.navigate("SearchResult");
  }

  return (
    <TouchableOpacity 
      style={{ borderWidth: 1, borderColor: Colors.darkOrange, borderRadius: 4, padding: 5, ...style! }}
      onPress={search}
    >
      <Text style={{ color: Colors.darkOrange, fontWeight: "bold", fontSize: style?.fontSize?? 14 }}>{tag.name}</Text>
    </TouchableOpacity>
  );
}

