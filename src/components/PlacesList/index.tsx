import * as React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { PlaceContainer, PlaceTitle } from './styles';

export default function PlacesList({ data }: { data: any[] }) {

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ marginRight: 20, paddingBottom: 10 }}>
      <Place item={item}/>
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
      contentContainerStyle={{ paddingHorizontal: 15 }}
    />
  );
}

const Place = ({ item }: { item: any }) => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  
  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      }}
    >
      <PlaceContainer
        activeOpacity={0.6}
        style={{ 
          width: 144, 
          height: 144,
          backgroundColor: 'white',
          elevation: 2,
        }}
        onPress={() => navigation.push("ShopDetail", { id: item.id })}
      >
        <Image 
          style={{ width: "100%", height: "50%" }}
          resizeMode="cover"
          source={{ uri: item.cover_image }} 
        />
        <View style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 8 }}>
          <PlaceTitle numberOfLines={2}>{item.name}</PlaceTitle>
          <View style={{ flexDirection: "row" }}>
            <Image 
              style={{ width: 14, height: 14, marginRight: 4 }}
              source={require('../../assets/icons/icon-star.png')} 
            />
            <Text style={{ fontWeight: 'bold', marginRight: 3 }}>{item.approved_comments_with_show_avg_stars.toFixed(1)}</Text>
            <Text>({item.approved_comments_with_show_count})</Text>
          </View>
        </View>
      </PlaceContainer>
    </View>
  );
}

