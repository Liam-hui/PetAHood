import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Platform, ActivityIndicator } from 'react-native';
import { useTranslation } from "react-i18next";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import FastImage from 'react-native-fast-image'
import moment from 'moment';

import Icon from '@/components/Icon';
import ReadMoreText from '@/components/ReadMoreText';
import HideAndShow from '@/components/HideAndShow';
import ShopList from '@/components/ShopList';
import { RootStackScreenProps } from '@/types';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getShopDetailById } from '@/store/shopDetails';
import { RootState } from '@/store';
import Colors from '@/constants/Colors';

import { InfoRow, InfoText, Card, Sep, Section, Heading } from './styles';
import Layout from '@/constants/Layout';
import Header from '@/components/Header';

export default function ShopDetailScreen(props: RootStackScreenProps<'ShopDetail'>) {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { navigation } = props;
  const { id } = props.route.params;
  const data = useAppSelector((state: RootState) => state.shopDetails.data[id]);
  const status = useAppSelector((state: RootState) => state.shopDetails.status);

  useEffect(() => {
    dispatch(getShopDetailById(id));
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBlue }}>

      <Header title={data?.name!}/>

      {status == "loading" && !data &&
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator/>
        </View>
      }

      {status == "failed" && !data &&
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
          <TouchableOpacity
            onPress={() => dispatch(getShopDetailById(id))}
          >
            <Text>{t("tryAgain")}</Text>
          </TouchableOpacity>
        </View>
      }

      {data && <>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 0 }}
        >
          {/* album */}
          {data.albums?.length == 0 && data.cover_image &&
            <FastImage 
              style={{ width: "100%", height: Layout.window.width * 2 / 3 }} 
              source={{ uri: data.cover_image }}
            />
          }
          {data.albums?.length > 0 &&
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity 
                style={{ width: Layout.window.width * 2 / 3,  height: Layout.window.width * 2 / 3, paddingRight: 2 }}  
                onPress={() => {
                  navigation.push("AlbumModal", { images: data.albums, index: 0 });
                }}
              >
                <FastImage 
                  style={{ width: "100%", height: "100%" }} 
                  source={{ uri: data.albums[0] }}
                />
              </TouchableOpacity>
              <View>
                {data.albums?.length > 1 &&
                  <TouchableOpacity 
                    style={{ width: Layout.window.width / 3,  height: Layout.window.width / 3, paddingLeft: 2, paddingBottom: 2 }} 
                    onPress={() => {
                      navigation.push("AlbumModal", { images: data.albums, index: 1 });
                    }}
                  >
                    <FastImage 
                      style={{ width: "100%", height: "100%"  }} 
                      source={{ uri: data.albums[1] }}
                    />
                  </TouchableOpacity>
                }
                {data.albums?.length > 2 &&
                  <TouchableOpacity  
                    style={{ width: Layout.window.width / 3,  height: Layout.window.width / 3, paddingLeft: 2, paddingTop: 2 }} 
                    onPress={() => {
                      navigation.push("AlbumModal", { images: data.albums, index: 2 });
                    }}
                  >
                    <FastImage 
                      style={{ width: "100%", height: "100%"  }} 
                      source={{ uri: data.albums[2] }}
                    />
                     {data.albums.length > 3 &&
                        <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#000000AA", justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ fontWeight: "bold", color: "white", fontSize: 26 }}>+{data.albums.length - 3}</Text>
                        </View>
                      }
                  </TouchableOpacity>
                }
              </View>
            </View>
          }

          {/* main content */}
          <View style={{ paddingHorizontal: Layout.page.paddingHorizontal }}>

            <Card style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: Colors.darkBlue }}>{data.name}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, marginBottom: 10, paddingLeft: 1 }}>
                <Text style={{ fontWeight: "bold", marginRight: 4 }}>{data.approved_comments_with_show_avg_stars.toFixed(1)}</Text>
                <Stars stars={data.approved_comments_with_show_avg_stars}/>
                {data.approved_comments_with_show_count != undefined && 
                  <Text style={{ marginLeft: 4, color: "#B2B2B2" }}>{`(${data.approved_comments_with_show_count})`}</Text>
                }
              </View>
              {data.description != undefined && data.description != "" && 
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
                    <InfoText>{t("shopDetails_rating")}</InfoText>
                  </>
                }
              >
                {data.rating.map((rating: any) => 
                  <Rating key={rating.name} rating={rating}/>
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
                    <InfoText>{t("shopDetails_openingHours")}</InfoText>
                  </>
                }
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: 35, marginBottom: 30 }}>
                  <Text style={{ color: "#d65d5a", fontWeight: "bold", fontSize: 16 }}>{t("shopDetails_today")}</Text>
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
                  <InfoText>{data.address}</InfoText>
                </InfoRow>
              }
              {data.phone &&
                <InfoRow as={TouchableOpacity}
                  activeOpacity={0.5}
                  onPress={async () => {
                    await Linking.openURL(`tel:${data.phone}`)
                  }}
                >
                  <Icon
                    icon={require(`../../assets/icons/icon-phone.png`)}
                    size={24}
                  />
                  <InfoText>{data.phone}</InfoText>
                </InfoRow>
              }
              {data.whatsapp &&
                <InfoRow as={TouchableOpacity}
                  activeOpacity={0.5}
                  onPress={async () => {
                    await Linking.openURL(`whatsapp://send?text=&phone=${data.whatsapp}`);
                  }}
                >
                  <Icon
                    icon={require(`../../assets/icons/icon-whatsapp.png`)}
                    size={24}
                  />
                  <InfoText>{data.whatsapp}</InfoText>
                </InfoRow>
              }
              {data.website &&
                <InfoRow as={TouchableOpacity}
                  activeOpacity={0.5}
                  onPress={async () => {
                    await Linking.openURL(data.website);
                  }}
                >
                  <Icon
                    icon={require(`../../assets/icons/icon-website.png`)}
                    size={24}
                  />
                  <InfoText>{data.website}</InfoText>
                </InfoRow>
              }

              {/* map */}
              {data.location != undefined && typeof data.location != 'string'  && 
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    Linking.openURL(`https://www.google.com/maps/place/${data.location.lat},${data.location.lng}`);
                  }}
                >
                  <MapView
                    provider={PROVIDER_GOOGLE} 
                    pointerEvents="none"
                    style={{ width: "100%", height: 200, marginTop: 10 }}
                    region={{
                      latitude: Number(data.location.lat),
                      longitude: Number(data.location.lng),
                      latitudeDelta: 0.0015,
                      longitudeDelta: 0.002,
                    }}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                  >
                    <Marker
                      coordinate={{
                        latitude: Number(data.location.lat),
                        longitude: Number(data.location.lng)
                      }}
                    >
                       <FastImage
                        style={{ width: 30, height: 40 }}
                        source={require("../../assets/images/locationMarker.png")}
                        resizeMode='contain'
                      />
                    </Marker>
                  </MapView>
                </TouchableOpacity>
              } 

            </Card>

            {/* customer upload */}
            {data.comment_photos.length > 0 &&
              <Card style={{ marginTop: 20, paddingTop: 20, paddingBottom: 0, paddingHorizontal: 0 }}>
                <Heading style={{ marginBottom: 10, marginLeft: 15 }}>{t("shopDetails_customerUpload")}</Heading>
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
                      <FastImage 
                        style={{ width: "100%", height: "100%", backgroundColor: "black" }} 
                        source={{ uri: photo }}
                      />
                      {(index == 5 && data.comment_photos.length > 6) &&
                        <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#000000AA", justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ fontWeight: "bold", color: "white", fontSize: 26 }}>+{data.comment_photos.length - 6}</Text>
                        </View>
                      }
                    </TouchableOpacity>
                  )}
                </View>
              </Card>
            }

            {/* reviews */}
            {data.reviews.length > 0 &&
              <Section>
                <Heading style={{ marginBottom: 10 }}>{t("shopDetails_reviews")}</Heading>
                {data.reviews.map((review: any) =>
                  <Review key={review.id} review={review} />
                )}
              </Section>
            }

          </View>

          <Section style={{ backgroundColor: "white", paddingVertical: 20, marginBottom: 0 }}>
            <Heading style={{ marginBottom: 10, marginLeft: Layout.page.paddingHorizontal }}>{t("shopDetails_maybeInterest")}</Heading>
            <ShopList data={data.related_shops} />
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
          key={i}
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

  const { t } = useTranslation();
  const ratingTitle: { [key: string]: string } = {
    professionalism: t("shopDetails_ratingProfessionalism"),
    customer_service: t("shopDetails_ratingCustomerService"),
    shop_environment: t("shopDetails_ratingShopEnvironment"),
    pricing: t("shopDetails_ratingPricing"),
    facilities: t("shopDetails_ratingFacilities"),
    accessibility: t("shopDetails_ratingAccessibility"),
    environment: t("shopDetails_ratingEnvironment"),
    product_variety: t("shopDetails_ratingProductVariety"),
  } 

  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 38, marginVertical: 5 }}>
      <Text style={{ width: "25%" }}>{ratingTitle[rating.name] ?? ""}</Text>
      {rating.rating && <>
        <View style={{ flexDirection: "row", flex: 1, marginHorizontal: 8, height: 13, borderColor: "#E5E5E5", borderRadius: 5, borderWidth: 1 }}>
          <View style={{ position: "absolute", height: "100%", width: `${rating.rating / 5 * 100}%`, backgroundColor: "#ffb331" }} />
          {[...Array(5)].map((_, i) =>
            <View key={i} style={{ height: "100%", flex: 1, borderColor: "#E5E5E5", borderRightWidth: i == 4 ? 0 : 1 }}/>
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
        <FastImage 
          style={{ width: 60, height: 60, borderRadius: 30, marginRight: 10, backgroundColor: "#DDD" }} 
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