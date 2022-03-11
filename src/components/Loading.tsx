import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';

import { RootState } from '@/store';
import { useAppSelector } from '@/hooks';

export default function Loading() {

  const isVisible = useAppSelector((state: RootState) => state.loading.isVisible);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (isVisible) {
      setIsHidden(false);
    }
    startAnimation();
  }, [isVisible])

  const fadeAnim = useRef(new Animated.Value(0)).current
  const startAnimation = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: isVisible ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }
    ).start(({ finished }) => {
      if (!isVisible && finished) {
        setIsHidden(true);
      }
    });
  };

  if (isHidden)  
    return null;
  else return (
    <Animated.View 
      style={{ 
        position: "absolute",
        width: "100%", 
        height: "100%", 
        top: 0, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        opacity: fadeAnim
      }}
    >
      <ActivityIndicator color="#666666"/>
    </Animated.View>
  );
}


