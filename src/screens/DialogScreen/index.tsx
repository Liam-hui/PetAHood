import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView  } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image'

import { RootStackScreenProps } from '@/types';
import Layout from '@/constants/Layout';
import { Button, ButtonText } from './styles';
import { useTranslation } from 'react-i18next';
import { StackActions } from '@react-navigation/native';

export default function DialogScreen(props: RootStackScreenProps<'Dialog'>) {

  const { navigation } = props;
  const popAction = StackActions.pop(1);
  const { t } = useTranslation();

  const { message, confirm, confirmText, cancel, cancelText } = props.route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: "center", justifyContent: 'center', paddingHorizontal: 25 }}>
      <View style={{ backgroundColor: "white", width: "100%", borderRadius: 10, paddingHorizontal: 15, paddingVertical: 15}}>
        <Text style={{ alignSelf: "center", marginBottom: 15 }}>{message}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Button as={TouchableOpacity}
            onPress={() => {
              if (confirm) {
                confirm();
              }
              else {
                navigation.dispatch(popAction);
              }
            }}
          >
            <ButtonText>{confirmText ?? t("confirm")}</ButtonText>
          </Button>
          {confirm &&
            <Button as={TouchableOpacity}
              onPress={() => {
                if (cancel) {
                  cancel();
                }
                else {
                  navigation.dispatch(popAction);
                }
              }}
            >
              <ButtonText>{cancelText ?? t("cancel")}</ButtonText>
            </Button>
          }
        </View>
      </View>
    </View>
  );
}
