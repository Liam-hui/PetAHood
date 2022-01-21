import React, { useState, useEffect, useRef, createRef, useCallback } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import showdown from "showdown";
import RenderHtml, { HTMLContentModel, defaultHTMLElementModels, CustomBlockRenderer, domNodeToHTMLString } from 'react-native-render-html';
import { SvgXml } from 'react-native-svg';

import { RootStackScreenProps } from '@/types';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getBlogDetailsById } from '@/store/blogDetails';
import { RootState } from '@/store';

import Header from '@/components/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import Layout from '@/constants/Layout';
import { Title, InfoText } from './styles';
import Icon from '@/components/Icon';
import { hideLoading, showLoading } from '@/store/loading';

export default function BlogScreen(props: RootStackScreenProps<'Blog'>) {

  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { id } = props.route.params;
  const data = useAppSelector((state: RootState) => state.blogDetails.data[id]);

  const [html, setHtml] = useState<string | null>(null);
  const [imageRatio, setImageRatio] = useState<number | null>(null);

  useEffect(() => {
    dispatch(showLoading());
    dispatch(getBlogDetailsById(id));
  }, [])

  useEffect(() => {
    // convert to html
    if (data?.content) {
      const converter = new showdown.Converter();
      const html = converter.makeHtml(data.content);
      setHtml(html);
    }

    // get image size
    if (imageRatio == null && data?.image)
      Image.getSize(data.image, (width, height) => {
        setImageRatio(width / height);
      });
  }, [data])

  useEffect(() => {
    if (html && imageRatio) {
      dispatch(hideLoading());
    }
  }, [html, imageRatio])


  const customHTMLElementModels = {
    svg: defaultHTMLElementModels.svg.extend({
      contentModel: HTMLContentModel.mixed
    })
  };

  const SvgRenderer: CustomBlockRenderer = ({ tnode }) => {
    const xml = React.useMemo(() => domNodeToHTMLString(tnode.domNode), [tnode]);
    return (
      <SvgXml xml={xml}/>
    );
  };


  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>

      <Header/>
      {data && imageRatio && html &&
        <ScrollView 
          style={{ 
            flex: 1,
            backgroundColor: "white",
          }}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 15
          }}
          showsVerticalScrollIndicator={false}
        >
          <FastImage
            style={{ width: "100%", height: Layout.window.width / imageRatio }}
            source={{ uri: data.image }}
          />
          <View style={{ paddingHorizontal: Layout.page.paddingHorizontal }}>
            <Title>{data.title}</Title>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
              <FastImage 
                style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: "red" }} 
                source={{ uri: data.author_avatar }}
                resizeMode='cover'
              />
              <InfoText>{data.author}</InfoText>
              <Icon
                icon={require(`../../assets/icons/icon-date.png`)}
                size={20}
                style={{ marginLeft: 40 }}
              />
              <InfoText>{data.date}</InfoText>
            </View>
            <RenderHtml
              contentWidth={Layout.window.width - Layout.page.paddingHorizontal * 2}
              source={{ html }}
              customHTMLElementModels={customHTMLElementModels}
              renderers={{
                svg: SvgRenderer
              }}
            />
          </View>
        </ScrollView>
      }

    </View>
  );
}

