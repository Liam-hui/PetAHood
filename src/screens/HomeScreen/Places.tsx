import React from 'react';
import { View } from 'react-native';

import Heading from './Heading';
import PlacesList from '@/components/PlacesList';

export default function Places({ data }: { data: any[] }) {
  return (
    <>
      {
        data.map((item: any) => {
          return <View key={item.slider_id}>
            <Heading text={item.title} svgIcon={item.icon} style={{ marginLeft: 15 }} />
            <PlacesList data={item.data} />
          </View>
        })
      }
    </>
  );
}
