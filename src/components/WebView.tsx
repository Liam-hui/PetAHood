import React, { useState } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import DefaultWebView from 'react-native-webview';

export default function WebView(props: any) {

  const { webViewRef, source } = props;
  const [loadingState, setLoadingState] = useState<|"loading"|"error"|"success">("loading");

  const css = `
    .pb-72 {
      padding-bottom: 14rem;
    }
    ${props.css ?? ""}
  `;

  const jsCode = `
    document.getElementById("topbar").style.display = "none";
    document.getElementById("mb-main-menu").style.display = "none";
    document.querySelectorAll('.bg-blue-dark')[0].style.display = "none";
    window.ReactNativeWebView.postMessage("finished");

    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode('${css.replace(/[\r\n]+/g," ")}'));
    document.head.appendChild(style);
  `;

  return (
    <View style={{ flex: 1 }}>
      <DefaultWebView 
        ref={webViewRef!}
        source={source} 
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
        onNavigationStateChange={props.onNavigationStateChange!}
      />
      {loadingState == "loading" && 
        <View style={{ position: "absolute", width: "100%", height: "100%", alignItems: 'center', justifyContent: "center" }}>
          <ActivityIndicator color={Platform.OS == "android" ? "black" : "grey"}/>
        </View>
      }
    </View>
  );
}
