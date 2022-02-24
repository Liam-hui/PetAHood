import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image'
import moment from 'moment';
import ReadMoreText from './ReadMoreText';

const Review = ({ review }: { review: any }) => {
    return (
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <FastImage 
          style={{ width: 60, height: 60, borderRadius: 30, marginRight: 10, backgroundColor: "#DDD" }} 
          source={{ uri: review.writer.profile_photo_url }}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start", marginTop: 4, marginBottom: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 14, marginRight: 5, flex: 1 }} numberOfLines={2}>{review.title}</Text>
            <Text style={{ color: "#AAAAAA" }}>{moment(review.created_at).format('DD MMM YYYY')}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <ReadMoreText numberOfLines={2}>
              {review.content}
            </ReadMoreText>
            {/* {review.images.map((image: any) => 
              <Text>sadfasdfasasdf</Text>
            )} */}
          </View>
        </View>
      </View>
    )
};

export default Review;