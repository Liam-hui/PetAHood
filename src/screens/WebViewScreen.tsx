import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import WebView from 'react-native-webview';

import { RootStackScreenProps } from '../types';
import Header from '@/components/Header';

export default function WebViewScreen(props: RootStackScreenProps<'WebView'>) {

  const { url, heading } = props.route.params;
  const [loadingState, setLoadingState] = useState<|"loading"|"error"|"success">("loading");

  const jsCode = `
    document.getElementById("topbar").style.display = "none";
    document.getElementById("mb-main-menu").style.display = "none";
    document.querySelectorAll('.bg-blue-dark')[0].style.display = "none";
    window.ReactNativeWebView.postMessage("finished");
  `;

  return (
    <View style={{ flex: 1 }}>
      <Header title={heading!}/>
      <WebView 
        source={{ uri: url }} 
        style={{ flex: 1, opacity: loadingState == "success" ? 1 : 0 }}
        injectedJavaScript={jsCode}
        onMessage={(event) => {
          if (event.nativeEvent.data == "finished")
            setLoadingState("success");
        }}
        onLoadStart={() => {
          setLoadingState("loading");
        }}
        onLoadEnd={() => {

        }}
        onError={() => {
          setLoadingState("error");
        }}
      />
      {loadingState == "loading" && 
        <View style={{ position: "absolute", width: "100%", height: "100%", alignItems: 'center', justifyContent: "center" }}>
          <ActivityIndicator color={Platform.OS == "android" ? "black" : "grey"}/>
        </View>
      }
    </View>
  );
}
