import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image'
import moment from 'moment';
import Share from 'react-native-share';
import i18n from '@/translate/i18n';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { HOST } from '@/constants';
import Layout from '@/constants/Layout';
import ReadMoreText from './ReadMoreText';
import Stars from './Stars';
import Icon from './Icon';

// const Review0 = ({ review }: { review: any, isFull?: boolean }) => {

//   const navigation = useNavigation<NativeStackNavigationProp<any>>();

//   const openDetailPage = () => {
//     navigation.push("ShopDetail", { id: review.commentable.id })
//   }

//   const imageSize = 82;
//   const imageMarginRight = 7;
//   const numberOfImages = Math.ceil((Layout.window.width - Layout.page.paddingHorizontal * 2) / (imageSize + imageMarginRight));

//   return (
//     <View style={{ marginVertical: 10 }}>
//       <View style={{ flexDirection: "row" }}>
//         <FastImage 
//           style={{ width: 60, height: 60, borderRadius: 30, marginRight: 10, backgroundColor: "#DDD" }} 
//           source={{ uri: review.writer.profile_photo_url }}
//         />
//         <View style={{ flex: 1 }}>
//           <View style={{ flexDirection: "row", alignItems: "flex-start", marginTop: 4, marginBottom: 8 }}>
//             <Text style={{ fontWeight: "bold", fontSize: 14, marginRight: 5, flex: 1 }} numberOfLines={2}>{review.title}</Text>
//             <Text style={{ color: "#AAAAAA" }}>{moment(review.created_at).format('DD MMM YYYY')}</Text>
//           </View>
//           <View>
//             <ReadMoreText numberOfLines={2}>
//               {review.content}
//             </ReadMoreText>
//           </View>
//         </View>
//       </View>
//       <View style={{ flexDirection: "row", marginTop: 17, overflow: "hidden" }}>
//         {review.images.slice(0, numberOfImages).map((image: string, index: number) => {
//           return (
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.push("AlbumModal", { images: review.images, index });
//               }}
//             >
//               <FastImage 
//                 style={{ width: imageSize, height: imageSize, marginRight: imageMarginRight }} 
//                 source={{ uri: image }}
//               />
//               {index == numberOfImages - 1 && numberOfImages < review.images &&
//                 <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#000000AA", justifyContent: "center", alignItems: "center" }}>
//                   <Text style={{ fontWeight: "bold", color: "white", fontSize: 26 }}>+{review.images.length - numberOfImages}</Text>
//               </View>
//               }
//             </TouchableOpacity>
//           )
//         })}
//     </View>
//   </View>
//   )
// };

const Review = ({ review, isFull, isProfile }: { review: any, isFull?: boolean, isProfile?: boolean }) => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const openDetailPage = () => {
    navigation.push("ShopDetail", { id: review.commentable.id })
  }

  const share = async () => {
    const url = `${HOST}${i18n.language == "en" ? "en" : "zh_HK"}/shop/${review.commentable.shop_code}/${review.commentable.slug}`;
    Share.open({
      url
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  const imageSize = 82;
  const imageMarginRight = 7;
  const numberOfImages = Math.ceil((Layout.window.width - Layout.page.paddingHorizontal * 3) / (imageSize + imageMarginRight));

  return (
    <View style={{ paddingTop: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 17 }}>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={isProfile ? openDetailPage : undefined} activeOpacity={isProfile ? 0.6 : 1}>
          <FastImage 
            style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: "#DDD" }} 
            source={{ uri: isProfile ? review.commentable.cover : review.writer.profile_photo_url }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            <TouchableOpacity style={{ marginRight: 5 }} onPress={openDetailPage}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }} numberOfLines={1}>{isProfile ? review.commentable.name : review.writer.name}</Text>
            </TouchableOpacity>
            <Text style={{ }}>{moment(review.created_at).format('DD MMM YYYY')}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Stars stars={review.stars} size={16} />
            {isProfile &&
              <Icon
                size={15}
                icon={require("@/assets/icons/icon-share2.png")}
                style={{ marginLeft: 5 }}
                onPress={share}
              />
            }
          </View>
        </View>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Icon
            size={15}
            icon={require("@/assets/icons/icon-like2.png")}
            style={{ marginRight: 5 }}
          />
          <Text>{review.total_like}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "white", paddingVertical: isFull ? 15 : 0 }}>
        <View style={{ paddingHorizontal: isFull ? Layout.page.paddingHorizontal : 0 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>{review.title}</Text>
          <ReadMoreText numberOfLines={4}>
            {review.content}
          </ReadMoreText>
        </View>
        {review.images.length > 0 &&
          <View style={{ flexDirection: "row", paddingLeft: Layout.page.paddingHorizontal, marginTop: 17, overflow: "hidden" }}>
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
        }
      </View>
      <View style={{ width: "100%", height: 1, backgroundColor: "#030335", opacity: 0.2, marginBottom: 0, marginTop: 20 }} />
    </View>
  )
};

export default Review;