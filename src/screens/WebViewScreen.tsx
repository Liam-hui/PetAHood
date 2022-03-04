import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';

import { RootStackScreenProps } from '../types';
import Header from '@/components/Header';
import WebView from '@/components/WebView';

export default function WebViewScreen(props: RootStackScreenProps<'WebView'>) {

  const { url, heading } = props.route.params;

  return (
    <View style={{ flex: 1 }}>
      <Header title={heading!}/>
      <WebView source={{ uri: url }} />
    </View>
  );
}
