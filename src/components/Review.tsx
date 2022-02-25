import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image'
import moment from 'moment';
import ReadMoreText from './ReadMoreText';
import Layout from '@/constants/Layout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Review = ({ review }: { review: any }) => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const openDetailPage = () => {
    navigation.push("ShopDetail", { id: review.commentable.id })
  }

  const imageSize = 82;
  const imageMarginRight = 7;
  const numberOfImages = Math.ceil((Layout.window.width - Layout.page.paddingHorizontal * 2) / (imageSize + imageMarginRight));

  return (
    <View style={{ marginVertical: 10 }}>
      <View style={{ flexDirection: "row" }}>
        <FastImage 
          style={{ width: 60, height: 60, borderRadius: 30, marginRight: 10, backgroundColor: "#DDD" }} 
          source={{ uri: review.writer.profile_photo_url }}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start", marginTop: 4, marginBottom: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 14, marginRight: 5, flex: 1 }} numberOfLines={2}>{review.title}</Text>
            <Text style={{ color: "#AAAAAA" }}>{moment(review.created_at).format('DD MMM YYYY')}</Text>
          </View>
          <View>
            <ReadMoreText numberOfLines={2}>
              {review.content}
            </ReadMoreText>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 17, overflow: "hidden" }}>
        {review.images.slice(0, numberOfImages).map((image: string, index: number) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push("AlbumModal", { images: review.images, index });
              }}
            >
              <FastImage 
                style={{ width: imageSize, height: imageSize, marginRight: imageMarginRight }} 
                source={{ uri: image }}
              />
              {index == numberOfImages - 1 && numberOfImages < review.images &&
                <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#000000AA", justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontWeight: "bold", color: "white", fontSize: 26 }}>+{review.images.length - numberOfImages}</Text>
              </View>
              }
            </TouchableOpacity>
          )
        })}
    </View>
  </View>
  )
};

export default Review;