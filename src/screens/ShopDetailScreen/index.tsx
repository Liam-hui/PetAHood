import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Platform, ActivityIndicator, SectionList } from 'react-native';
import { useTranslation } from "react-i18next";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';

import Icon from '@/components/Icon';
import ReadMoreText from '@/components/ReadMoreText';
import { ShopList } from '@/components/ShopList';
import { RootStackScreenProps } from '@/types';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getShopDetailById } from '@/store/shopDetails';
import { RootState } from '@/store';
import Colors from '@/constants/Colors';
import { InfoRow, InfoText, Card, Sep, Section, Heading, DarkSep } from './styles';
import Layout from '@/constants/Layout';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import { TabView } from 'react-native-tab-view';
import Styles from '@/constants/Styles';
import Review from '@/components/Review';
import { getShopSearchResult } from '@/store/shopSearch';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HOST } from '@/constants';
import i18n from '@/translate/i18n';
import HideAndShow from '@/components/HideAndShow';
import Stars from '@/components/Stars';
import Tag from '@/components/Tag';
import { toggleFav, userToggleFav } from '@/store/favourites';

export default function ShopDetailScreen(props: RootStackScreenProps<'ShopDetail'>) {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = props.route.params;
  const data = useAppSelector((state: RootState) => state.shopDetails.data[id]);
  const status = useAppSelector((state: RootState) => state.shopDetails.status);

  const sectionListRef = useRef<any | null>(null);
  const [isNavSticked, setIsNavSticked] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const sections = useMemo(() => {
    if (data) {
      let temp = [];
      if (data.comment_photos.length > 0)
        temp.push({ key: "customerUpload", title: t("shopDetails_customerUpload")});
      if (data.reviews.length > 0)
        temp.push({ key: "reviews", title: t("shopDetails_reviews")});
      if (data.facilities.length > 0)
        temp.push({ key: "facilities", title: t("shopDetails_facilities")});
      if (data.categories.length > 0)
        temp.push({ key: "services", title: t("shopDetails_services")});
      if (data.shop_rules.length > 0 || data.remarks.length > 0) 
        temp.push({ key: "importantNotes", title: t("shopDetails_importantNotes")});
      if (data.tags.length > 0)
        temp.push({ key: "tags", title: t("shopDetails_tags")});
      if (data.related_shops.length > 0)
        temp.push({ key: "relatedShops", title: t("shopDetails_maybeInterest")});
      return temp;
    }
    return [];
  }, [data])

  useEffect(() => {
    dispatch(getShopDetailById(id));
  }, [])

  const onScroll = ({ nativeEvent }: { nativeEvent: any }) => {
    const { contentOffset } = nativeEvent;
    setHasScroll(contentOffset.y > 200);
  }

  const scrollToSection = (index: number) => {
    if (sectionListRef.current != null)
      sectionListRef.current.scrollToLocation({
        itemIndex: index + 1,
        sectionIndex: 1
      });
  }

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
    setIsNavSticked(viewableItems.findIndex((x: any) => x.item == "topCard") == -1);
  }

  const share = async () => {
    const url = `${HOST}${i18n.language == "en" ? "en" : "zh_HK"}/shop/${data.shop_code}/${data.slug}`;
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

  return (
    <View style={{ flex: 1, backgroundColor: data ? "white" : Colors.lightBlue }}>

      <Header 
        title={hasScroll ? data?.name : " "} 
        noShadow={!hasScroll || isNavSticked}
        isLeft
        action={
          <View style={{ flexDirection: "row" }}>
            <FavIcon id={id} isFav={data?.fav_by_user!}/>
            <Icon
              icon={require(`../../assets/icons/icon-share.png`)}
              size={24}
              style={{ marginHorizontal: 5 }}
              onPress={share}
            />
            <Icon
              icon={require(`../../assets/icons/icon-cart2.png`)}
              size={24}
              style={{ marginHorizontal: 5 }}
              // onPress=
            />
          </View>
        }
        actionWidth={100}
      />

      {status == "loading" && !data &&
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator color="grey" />
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

      {data &&
        <SectionList
          ref={sectionListRef}
          keyExtractor={(item) => String(item)}
          contentContainerStyle={{ paddingBottom: 40, backgroundColor: Colors.lightBlue }}
          onScroll={onScroll}
          scrollEventThrottle={400}
          renderItem={({ item, index, section }) => {
            if (item == "topCard") return <TopCard data={data} />;
            if (item == "customerUpload") return <CustomerUpload data={data} />;
            if (item == "reviews") return <Reviews data={data} />;
            if (item == "facilities") return <Facilities data={data} />;
            if (item == "services") return <Services data={data} />;
            if (item == "importantNotes") return <ImportantNotes data={data} />;
            if (item == "tags") return <Tags data={data} />;
            if (item == "relatedShops") return <RelatedShops data={data} />;
            return null;
          }}
          renderSectionHeader={(props) => {
            const { section } = props;
            if (section.title == "body") 
              return (
                <View style={{ backgroundColor: isNavSticked ? "white" : Colors.lightBlue, width: "100%", paddingBottom: 15, ...isNavSticked && { ...Styles.shadowStyle } }}>
                  <NavBar sections={sections} scrollToSection={scrollToSection} />
                </View>
              );
            return null;
          }}
          sections={[
            { title: "top", data: ["topCard"] },
            { title: "body", data: sections.map(section => section.key) },
          ]}
          stickySectionHeadersEnabled
          onViewableItemsChanged={onViewableItemsChanged}
          onScrollToIndexFailed={() => {}}
        />
      }

    </View>
  );
}

const FavIcon = (props: { id: number, isFav: boolean }) => {

  const { id } = props;

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state: RootState) => state.auth.status);
  const favourites = useAppSelector((state: RootState) => state.favourites.ids);

  const [isFav, setIsFav] = useState(authStatus == "success" ? props.isFav : favourites.findIndex(x => x == id) != -1);

  useEffect(() => {
    setIsFav(authStatus == "success" ? props.isFav : favourites.findIndex(x => x == id) != -1);
  }, [props.isFav])

  const fav = () => {
    if (authStatus == "success") {
      dispatch(userToggleFav(id));
    }
    else {
      dispatch(toggleFav(id));
    }
    setIsFav(!isFav);
  }

  return (
    <Icon
      icon={isFav ? require(`../../assets/icons/icon-liked.png`) : require(`../../assets/icons/icon-like.png`)}
      size={24}
      style={{ marginHorizontal: 5 }}
      onPress={fav}
    />
  )
}

const TopCard = ({ data }: { data: any }) => {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const searchByChainStores = () => {
    if (data.chain_stores.length > 0) {
      const ids = data.chain_stores.reduce(
        (prev: any, current: any, index: number) => {
          return prev + (index == 0 ? "" : ",") + current.id
        }, 
        ""
      );
      dispatch(getShopSearchResult({
        ids
      }));
      navigation.push("SearchResult");
    }
  }

  return (
    <View style={{ paddingHorizontal: Layout.page.paddingHorizontal, backgroundColor: "white", paddingTop: 10, borderBottomRightRadius: 27, borderBottomLeftRadius: 27, ...Styles.shadowStyle }}>
      {/* image */}
      {(data?.albums?.length > 0 || data?.cover_image) &&
        <View style={{ width: "100%", height: 170 }} >
          <FastImage 
            style={{ width: "100%", height: "100%", borderRadius: 8 }} 
            source={{ uri: data.cover_image ? data.cover_image : data.albums[0]  }}
          />
          {(data?.cover_image || data?.albums?.length > 0 || data?.comment_photos.length > 0) && 
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.push("Photos", { data: { shop: [data.cover_image].concat(data.albums), customer: data.comment_photos } });
              }}
              style={{ flexDirection: "row", backgroundColor: "#F1F5F9", borderRadius: 10, position: "absolute", bottom: 7, right: 6, paddingHorizontal: 8, paddingVertical: 10 }}
            >
              <Icon icon={require("@/assets/icons/icon-photo.png")} size={15} />
              <Text style={{ color: "#030335", fontWeight: "bold", marginLeft: 5 }}>{t("shopDetails_photos")}</Text>
            </TouchableOpacity>
          }
        </View>
      }
      <View style={{ flexDirection: "row", marginTop: 15, alignItems: "center" }}>
        {/* title */}
        <Text style={{ fontSize: 24, fontWeight: "bold", color: Colors.darkBlue }}>{data.name}</Text>
        {/* veriied */}
        {data.verified && 
          <Icon icon={require("@/assets/icons/icon-verified.png")} size={20} style={{ marginLeft: 5 }} />
        }
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, marginBottom: 10, paddingLeft: 1 }}>
        {/* star */}
        <Stars stars={data.approved_comments_with_show_avg_stars}/>
        {/* rating */}
        <Text style={{ fontWeight: "bold", marginRight: 2, marginLeft: 8 }}>{data.approved_comments_with_show_avg_stars.toFixed(1)}</Text>
        {/* comment count */}
        {data.approved_comments_with_show_count != undefined && 
          <Text style={{ marginLeft: 4, color: "#B2B2B2" }}>{`(${data.approved_comments_with_show_count})`}</Text>
        }
      </View>
      {/* description */}
      {data.description != undefined && data.description != "" && 
        <ReadMoreText style={{ marginBottom: 10, lineHeight: 20 }} numberOfLines={3}>
          {data.description}
        </ReadMoreText>
      }
      <Sep/>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* info */}
        <View style={{ flex: 1, paddingRight: 10 }}>
          {data.address &&
            <InfoRow>
              <Icon
                icon={require(`../../assets/icons/icon-address.png`)}
                size={16}
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
                size={16}
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
                size={16}
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
                size={16}
              />
              <InfoText>{data.website}</InfoText>
            </InfoRow>
          }
        </View>
        {/* map */}
        {data.location != undefined && typeof data.location != 'string'  && 
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              Linking.openURL(`https://www.google.com/maps/place/${data.location.lat},${data.location.lng}`);
            }}
            style={{ width: Layout.window.width * 0.23, height: Layout.window.width * 0.23 }}
          >
            <MapView
              provider={PROVIDER_GOOGLE} 
              pointerEvents="none"
              style={{ width: "100%", height: "100%" }}
              region={{
                latitude: Number(data.location.lat),
                longitude: Number(data.location.lng),
                latitudeDelta: 0.015,
                longitudeDelta: 0.005,
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
                  style={{ width: 20, height: 20 }}
                  source={require("@/assets/icons/icon-locationMarker.png")}
                  resizeMode='contain'
                />
              </Marker>
            </MapView>
          </TouchableOpacity>
        } 
      </View>
      <Sep/>
      {/* chain stores */}
      {data.hv_chain_stores &&
        <>
          <TouchableOpacity 
            style={{ alignSelf: "center", marginVertical: 10, flexDirection: "row", alignItems: "center" }}
            onPress={searchByChainStores}
          >
            <Text style={{ color: Colors.darkOrange }}>{t("shopDetails_allChains")}</Text>
            <Icon size={16} icon={require("@/assets/icons/icon-downArrowOrange.png")} style={{ marginLeft: 5, transform: [{ rotateZ: "-90deg" }] }} />
          </TouchableOpacity>
          <Sep/>
        </>
      }
      {/* opening hour */}
      <TouchableOpacity 
        style={{ width: "100%", marginTop: 10, marginBottom: 15, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
        onPress={() => navigation.push("OpeningHour", { data: data.opening_hour })}
      >
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: data.isWorkingHour ? "#2ECC71" : "#CD2F44", marginRight: 5 }}/>
        <Text style={{ color: data.isWorkingHour ? "#2ECC71" : "#CD2F44", fontWeight: "bold", marginRight: 10}}>{data.isWorkingHour ? t("shopDetails_open") : t("shopDetails_closed")}</Text>
        <Text>{`(${t("shopDetails_today")}) ${data.opening_hour.today}`}</Text>
        <Icon size={16} icon={require("@/assets/icons/icon-downArrow.png")} style={{ position: "absolute", right: 0, transform: [{ rotateZ: "-90deg" }] }} />
      </TouchableOpacity>
    </View>
  )
}

const NavBar = ({ sections, scrollToSection }: { sections: any, scrollToSection: (index: number) => void }) => {

  const [sectionIndex, setSectionIndex] = useState(0);
  useEffect(() => {
    scrollToSection(sectionIndex);
  }, [sectionIndex])

  return (
    <TabView
      navigationState={{ index: sectionIndex, routes: sections }}
      renderScene={() => null}
      renderTabBar={props =>
        <TabBar
          {...props}
          // onTabPress={() => {
            // console.log(props)
          // }}
        />
      }
      onIndexChange={setSectionIndex}
      initialLayout={{ width: Layout.window.width }}
    />
  )
}

const CustomerUpload = ({ data }: { data: any }) => {

  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={{ paddingTop: 15, backgroundColor: "white", marginBottom: 15 }}>
      <Heading style={{ marginBottom: 10, marginLeft: Layout.page.paddingHorizontal }}>{t("shopDetails_customerUpload")}</Heading>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {data.comment_photos.slice(0, 3).map((photo: string, index: number) =>
          <TouchableOpacity 
            activeOpacity={0.5}
            style={{ 
              width: (Layout.window.width - 4) / 3, 
              height: (Layout.window.width - 4) / 3,
              marginHorizontal: index % 3 == 1 ? 2 : 0
            }}
            onPress={() => {
              navigation.push("Photos", { data: { shop: [data.cover_image].concat(data.albums), customer: data.comment_photos }, goto: { album: "customer", index } });
            }}
          >
            <FastImage 
              style={{ width: "100%", height: "100%", backgroundColor: "black" }} 
              source={{ uri: photo }}
            />
            {(index == 2 && data.comment_photos.length > 6) &&
              <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#000000AA", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", color: "white", fontSize: 26 }}>+{data.comment_photos.length - 3}</Text>
              </View>
            }
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const Reviews = ({ data }: { data: any }) => {

  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={{ paddingHorizontal: Layout.page.paddingHorizontal, paddingTop: 15, backgroundColor: "white", marginBottom: 15 }}>
      <Heading style={{ marginBottom: 2 }}>{t("shopDetails_reviews")}</Heading>
      {data.reviews.slice(0, 6).map((review: any) =>
        <Review key={review.id} review={review} />
      )}
      {data.approved_comments_with_show_count > 6 
        ? <TouchableOpacity 
            style={{ alignSelf: "center", marginTop: 10, marginBottom: 15, flexDirection: "row", alignItems: "center" }}
            onPress={() => navigation.push('Reviews', { id: data.id, data: data.reviews, count: data.approved_comments_with_show_count })}
          >
            <Text style={{ color: Colors.darkOrange }}>{t("shopDetails_moreReviews")}</Text>
            <Icon size={12} icon={require("@/assets/icons/icon-downArrowOrange.png")} style={{ marginLeft: 5, transform: [{ rotateZ: "-90deg" }] }} />
          </TouchableOpacity>
        : <View style={{ height: 6 }}/>
      }
    </View>
  )
}

const Facilities = ({ data }: { data: any }) => {

  const { t } = useTranslation();

  return (
    <Section>
      <Heading style={{ marginBottom: 15 }}>{t("shopDetails_facilities")}</Heading>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {data.facilities.map((item: any) =>{
          return <View style={{ marginBottom: 15, flexDirection: "row", alignItems: "center", width: "50%" }}>
            <Icon
              size={20}
              icon={{ uri: item.icon }}
              style={{ marginRight: 5 }}
            />
            <Text>{item.name}</Text>
          </View>
        })}
      </View>
      <DarkSep/>
    </Section>
  )
}

const Services = ({ data }: { data: any }) => {

  const { t } = useTranslation();

  return (
    <Section>
      <Heading style={{ marginBottom: 10 }}>{t("shopDetails_services")}</Heading>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {data.categories.map((item: any) =>{
          return <View style={{ marginBottom: 10, marginRight: 10, flexDirection: "row", alignItems: "center" }}>
            <Icon size={20} icon={require("@/assets/icons/icon-tickThin.png")} style={{ marginRight: 5 }}/>
            <Text>{item.name}</Text>
          </View>
        })}
      </View>
      <DarkSep/>
    </Section>
  )
}

const ImportantNotes = ({ data }: { data: any }) => {

  const { t } = useTranslation();

  return (
    <Section>
      <Heading style={{ marginBottom: 10 }}>{t("shopDetails_importantNotes")}</Heading>
      {data.shop_rules.length > 0 &&
        <View style={{ marginVertical: 5 }}>
          <HideAndShow
            shownElement={
              <>
                <Icon
                  icon={require("@/assets/icons/icon-shopRules.png")}
                  size={17}
                />
                <Text style={{ marginLeft: 8, flex: 1 }}>{t("shopDetails_shopRules")}</Text>
              </>
            }
          >
            {data.shop_rules.map((item: string, index: number) => {
              return (
                <Text key={index} style={{ marginVertical: 8, marginLeft: 25 }}>{item}</Text>
              );
            })}
          </HideAndShow>
        </View>
      }
      {data.remarks.length > 0 &&
        <View style={{ marginVertical: 5 }}>
          <HideAndShow
            shownElement={
              <>
                <Icon
                  icon={require("@/assets/icons/icon-remarks.png")}
                  size={17}
                />
                <Text style={{ marginLeft: 8, flex: 1 }}>{t("shopDetails_remarks")}</Text>
              </>
            }
          >
            {data.remarks.map((item: string, index: number) => {
              return (
                <Text key={index} style={{ marginVertical: 8, marginLeft: 25 }}>{item}</Text>
              );
            })}
          </HideAndShow>
        </View>
      }
      <DarkSep/>
    </Section>
  )
}

const Tags = ({ data }: { data: any }) => {

  const { t } = useTranslation();

  return (
    <Section>
      <Heading style={{ marginBottom: 10 }}>{t("shopDetails_tags")}</Heading>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {data.tags.map((tag: any) =>{
          return <Tag tag={tag} style={{ marginBottom: 10, marginRight: 10 }} />
        })}
      </View>
      <DarkSep/>
    </Section>
  )
}

const RelatedShops = ({ data }: { data: any }) => {

  const { t } = useTranslation();

  return (
    <View style={{ marginBottom: 10 }}>
      <Heading style={{ marginBottom: 10, marginLeft: Layout.page.paddingHorizontal }}>{t("shopDetails_maybeInterest")}</Heading>
      <ShopList data={data.related_shops} />
    </View>
  )
}