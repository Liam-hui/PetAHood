import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Heading from './Heading';;
import { getShopSearchResult } from '@/store/shopSearch';
import { useAppDispatch } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { ShopList } from '@/components/ShopList';

export default function Shops({ data }: { data: any[] }) {

  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const goToMore = (params: any) => {
    dispatch(getShopSearchResult(params));
    navigation.navigate("SearchResult");
  }

  if (data.length > 0) return (
    <View style={{ marginVertical: 10 }}>
      {
        data.map((item: any) => {
          return (
            <View key={item.slider_id}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                <Heading text={item.title} icon={{ uri: item.icon }} style={{ marginLeft: 15 }} />
                <TouchableOpacity 
                  activeOpacity={0.6}
                  style={{ marginRight: 15 }}  
                  onPress={() => goToMore(item.params)}
                >
                  <Text>{t("home_more")}</Text>
                </TouchableOpacity>
              </View>
              <ShopList data={item.data} />
            </View>
          )
        })
      }
    </View>
  );
  return null;
}
