import * as React from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';

import { ShopItem, ShopItemLarge } from '@/components/ShopItem';
import Layout from '@/constants/Layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ShopList({ data }: { data: any[] }) {

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ marginRight: 10, paddingBottom: 10 }}>
      <ShopItem item={item}/>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: 15 }}
      contentContainerStyle={{ paddingLeft: 15, paddingRight: 5, alignItems: "center" }}
    />
  );
}

interface ShopListFullProps {
  data: any,
  isLoading?: boolean,
  emptyText?: string,
  onEndReached?: () => void
}

export function ShopListFull(props: ShopListFullProps) {

  const insets = useSafeAreaInsets();

  const { data, isLoading, emptyText, onEndReached } = props;

  const renderShopItem = ({ item }: { item: any }) => (
    <ShopItemLarge
      item={item}
      style={{
        marginBottom: 20
      }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderShopItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          paddingHorizontal: Layout.page.paddingHorizontal,
          paddingTop: 15,
          paddingBottom: insets.bottom + 15
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
        ListEmptyComponent={
          <>
            {!isLoading && emptyText && <Text style={{ textAlign: "center", marginTop: 20 }}>{emptyText}</Text>}
          </>
        }
        ListFooterComponent={
          <>
            {isLoading && <ActivityIndicator color="grey" style={{ marginVertical: 10 }}/> }
          </>
        }
      />
    </View>
  );
}
