import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useTranslation } from "react-i18next";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import FastImage from 'react-native-fast-image'
import moment from 'moment';

import { Text } from '@/components/Themed';
import Icon from '@/components/Icon';
import ReadMoreText from '@/components/ReadMoreText';
import HideAndShow from '@/components/HideAndShow';
import PlacesList from '@/components/PlacesList';
import { RootStackScreenProps } from '@/types';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getShopDetailById } from '@/store/shopDetails';
import { RootState } from '@/store';
import Colors from '@/constants/Colors';

import { InfoRow, InfoText, Card, Sep, Section, Heading } from './styles';
import Layout from '@/constants/Layout';
import Header from '@/components/Header';

export default function ShopDetailScreen(props: RootStackScreenProps<'ShopDetail'>) {

  const dispatch = useAppDispatch();
  const { navigation } = props;
  const { id } = props.route.params;
  const data = useAppSelector((state: RootState) => state.shopDetails.data[id]);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getShopDetailById(id));
  }, [])

  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>

      <Header/>

      {data && <>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 0 }}
        >
          {/* album */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity 
              style={{ width: Layout.window.width * 2 / 3,  height: Layout.window.width * 2 / 3, paddingRight: 2 }}  
              onPress={() => {
                navigation.push("AlbumModal", { images: [data.cover_image] });
              }}
            >
              <FastImage 
                style={{ width: "100%", height: "100%" }} 
                source={{ uri: data.cover_image }}
              />
            </TouchableOpacity>
            <View>
              <TouchableOpacity 
                style={{ width: Layout.window.width / 3,  height: Layout.window.width / 3, paddingLeft: 2, paddingBottom: 2 }} 
                onPress={() => {
                  navigation.push("AlbumModal", { images: [] });
                }}
              >
                <FastImage 
                  style={{ width: "100%", height: "100%"  }} 
                  source={{ uri: data.cover_image }}
                />
              </TouchableOpacity >
              <TouchableOpacity  
                style={{ width: Layout.window.width / 3,  height: Layout.window.width / 3, paddingLeft: 2, paddingTop: 2 }} 
                onPress={() => {
                  navigation.push("AlbumModal", { images: [] });
                }}
              >
                <FastImage 
                  style={{ width: "100%", height: "100%"  }} 
                  source={{ uri: data.cover_image }}
                />
              </TouchableOpacity >
            </View>
          </View>

          <Card style={{ marginHorizontal: 20, marginTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: Colors.darkBlue }}>{data.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, marginBottom: 10, paddingLeft: 1 }}>
              <Text style={{ fontWeight: "bold", marginRight: 4 }}>{data.approved_comments_with_show_avg_stars.toFixed(1)}</Text>
              <Stars stars={data.approved_comments_with_show_avg_stars}/>
              {data.approved_comments_with_show_count && <Text style={{ marginLeft: 4, color: "#B2B2B2" }}>{`(${data.approved_comments_with_show_count})`}</Text>}
            </View>
            {data.description! != "" && 
              <ReadMoreText style={{ marginBottom: 10, lineHeight: 20 }} numberOfLines={3}>
                {data.description}
              </ReadMoreText>
            }
            <Sep/>
            {/* rating */}
            <HideAndShow
              height={50}
              shownElement={
                <>
                  <Icon
                    icon={require(`../../assets/icons/icon-rating.png`)}
                    size={24}
                  />
                  <InfoText as={Text}>Detailed Rating</InfoText>
                </>
              }
            >
              {data.rating.map((rating: any) => 
                <Rating rating={rating}/>
              )}
            </HideAndShow>
            <Sep/>
            {/* opening hours */}
            <HideAndShow
              height={50}
              shownElement={
                <>
                  <Icon
                    icon={require(`../../assets/icons/icon-openingHours.png`)}
                    size={24}
                  />
                  <InfoText as={Text}>Opening Hours</InfoText>
                </>
              }
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: 35, marginBottom: 30 }}>
                <Text style={{ color: "#d65d5a", fontWeight: "bold", fontSize: 16 }}>Today</Text>
                <Text style={{ color: "#d65d5a", fontWeight: "bold", fontSize: 16 }}>{data.opening_hour.today}</Text>
              </View>
              {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(day => 
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: 35, marginBottom: 10}}>
                  <Text>{t(`shopDetails_${day}`)}</Text>
                  <Text>{data.opening_hour[day]}</Text>
                </View>
              )}
            </HideAndShow>
            <Sep/>
            {data.address &&
              <InfoRow>
                <Icon
                  icon={require(`../../assets/icons/icon-address.png`)}
                  size={24}
                />
                <InfoText as={Text}>{data.address}</InfoText>
              </InfoRow>
            }
            {data.phone &&
              <InfoRow>
                <Icon
                  icon={require(`../../assets/icons/icon-phone.png`)}
                  size={24}
                />
                <InfoText as={Text}>{data.phone}</InfoText>
              </InfoRow>
            }
            {data.whatsapp &&
              <InfoRow>
                <Icon
                  icon={require(`../../assets/icons/icon-whatsapp.png`)}
                  size={24}
                />
                <InfoText as={Text}>{data.whatsapp}</InfoText>
              </InfoRow>
            }
            {data.website &&
              <InfoRow>
                <Icon
                  icon={require(`../../assets/icons/icon-website.png`)}
                  size={24}
                />
                <InfoText as={Text}>{data.website}</InfoText>
              </InfoRow>
            }

            {/* map */}
            <MapView
              provider={PROVIDER_GOOGLE} 
              style={{ width: "100%", height: 200 }}
              region={{
                latitude: Number(data.location.split(',')[0]),
                longitude: Number(data.location.split(',')[1]),
                latitudeDelta: 0.001,
                longitudeDelta: 0.002,
              }}
            >
              <Marker
                coordinate={{
                  latitude: Number(data.location.split(',')[0]),
                  longitude: Number(data.location.split(',')[1])
                }}
              />
            </MapView>
          </Card>

          {/* customer upload */}
          {data.comment_photos.length > 0 &&
            <Card style={{ marginHorizontal: 20, marginTop: 20, paddingTop: 20, paddingBottom: 0, paddingHorizontal: 0 }}>
              <Heading as={Text} style={{ marginBottom: 10, marginLeft: 15 }}>Customer Upload</Heading>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {data.comment_photos.slice(0, 6).map((photo: string, index: number) =>
                  <TouchableOpacity 
                    activeOpacity={0.5}
                    style={{ 
                      width: (Layout.window.width - 40 - 4) / 3, 
                      height: (Layout.window.width - 40 - 4) / 3,
                      marginBottom: index < 3 ? 2 : 0,
                      marginHorizontal: index % 3 == 1 ? 2 : 0
                    }}
                    onPress={() => {
                      navigation.push("AlbumModal", { images: data.comment_photos, index: index });
                    }}
                  >
                    <Image 
                      style={{ width: "100%", height: "100%", backgroundColor: "black" }} 
                      source={{ uri: photo }}
                    />
                    {(index == 5 && data.comment_photos.length > 6) &&
                      <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#FFFFFF66", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", color: "white", fontSize: 26 }}>+{data.comment_photos.length - 6}</Text>
                      </View>
                    }
                  </TouchableOpacity>
                )}
              </View>
            </Card>
          }

          {/* reviews */}
          <Section>
            <Heading as={Text} style={{ marginBottom: 10 }}>Write A Review</Heading>
            {data.reviews.map((review: any) =>
              <Review key={review.id} review={review} />
            )}
          </Section>

          <Section style={{ backgroundColor: "white", paddingVertical: 20, marginBottom: 0 }}>
            <Heading as={Text} style={{ marginBottom: 10 }}>You may be interested in</Heading>
            <PlacesList data={data.related_shops} />
          </Section>

        </ScrollView>
      </>}
    </View>
  );
}

const Stars = ({ stars }: { stars: number }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(5)].map((_, i) =>
        <Icon
          icon={
            stars > i 
            ? require(`../../assets/icons/icon-star.png`)
            : require(`../../assets/icons/icon-starEmpty.png`)
          }
          size={15}
        />
      )}
    </View>
  )
}

const Rating = ({ rating }: { rating: any }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 38, marginVertical: 5 }}>
      <Text style={{ width: "25%" }}>{rating.name}</Text>
      {rating.rating && <>
        <View style={{ flexDirection: "row", flex: 1, marginHorizontal: 8, height: 13, borderColor: "#E5E5E5", borderRadius: 5, borderWidth: 1 }}>
          <View style={{ position: "absolute", height: "100%", width: `${rating.rating / 5 * 100}%`, backgroundColor: "#ffb331" }} />
          {[...Array(5)].map((_, i) =>
            <View style={{ height: "100%", flex: 1, borderColor: "#E5E5E5", borderRightWidth: i == 4 ? 0 : 1 }}/>
          )}
        </View>
        <Text style={{ width: "10%"}}>{rating.rating.toFixed(1)}</Text>
      </>}
    </View>
  )
}

const Review = ({ review }: { review: any }) => {
  return (
    <View style={{ marginVertical: 7 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Image 
          style={{ width: 60, height: 60, borderRadius: 30, marginRight: 10 }} 
          source={{ uri: review.writer.profile_photo_url }}
        />
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Text style={{ marginRight: 8 }}>{review.writer.name}</Text>
            <Text style={{ color: "#AAAAAA" }}>{moment(review.created_at).format('DD/mm/YYYY')}</Text>
          </View>
          <Stars stars={review.stars}/>
        </View>
      </View>
      <Card style={{ paddingVertical: 15 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 5 }}>{review.title}</Text>
        <ReadMoreText style={{marginBottom: 5 }} numberOfLines={5}>
        {review.content}
        </ReadMoreText>
        {/* {review.images.map((image: any) => 
          <Text>sadfasdfasasdf</Text>
        )} */}
      </Card>
    </View>
  )
}