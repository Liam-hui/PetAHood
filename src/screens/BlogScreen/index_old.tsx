import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import { Text } from '@/components/Themed';
import Icon from '@/components/Icon';
import ReadMoreText from '@/components/ReadMoreText';
import HideAndShow from '@/components/HideAndShow';
import { RootStackScreenProps } from '@/types';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getShopDetailById } from '@/store/shopDetails';
import { RootState } from '@/store';
import Colors from '@/constants/Colors';

import { InfoRow, InfoText, Card, Sep, Section, Heading } from './styles';
import Layout from '@/constants/Layout';
import Header from '@/components/Header';
import { hideLoading, showLoading } from '@/store/loading';

export default function BlogScreen(props: RootStackScreenProps<'Blog'>) {

  const dispatch = useAppDispatch();
  const { url } = props.route.params;

  // const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    // dispatch(showLoading());
    // setTimeout(() => {
    //   dispatch(hideLoading());
    //   setIsShown(true);
    // }, 1000);
  }, [])

  const jsCode = `
    document.querySelectorAll('body > div').forEach(child => {
      if (child.classList.contains('body')) {
        child.querySelectorAll(':scope > div').forEach((element, index) => {
          if (index > 0) {
            element.style.display = "none";
          }
        });
      }
      else {
        child.style.display = "none";
      }
    });
  `;

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>

      <Header/>
      
      <WebView 
        source={{ uri: url }} 
        style={{ 
          flex: 1,
          // opacity: isShown ? 1 : 0
        }}
        injectedJavaScript={jsCode}
        onMessage={(event) => {
          console.log(event);
        }}
      />

    </View>
  );
}
