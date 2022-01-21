import * as React from 'react';
import { View, FlatList } from 'react-native';

import { ShopItem } from '@/components/ShopItem';

export default function ShopList({ data, endComponent }: { data: any[], endComponent? : any }) {

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
      ListFooterComponent={endComponent!}
    />
  );
}
