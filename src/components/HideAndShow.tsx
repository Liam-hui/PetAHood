import React, { useState, useRef } from 'react';
import { Animated, View, TouchableOpacity } from 'react-native';
import Icon from '@/components/Icon';

export default function HideAndShow({ height, children, shownElement, style }: { height: number, children: React.ReactNode, shownElement: React.ReactNode, style?: object }) {

  const [isShown, setIsShown] = useState(false);
  const [hiddenHeight, setHiddenHeight] = useState(0);
  const showAnim = useRef(new Animated.Value(0)).current;
  
  const startAnimation = () => {
    Animated.timing(
      showAnim,
      {
        toValue: isShown ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }
    ).start(({ finished }) => {
      if (finished) {
        setIsShown(!isShown);
      }
    });
  };
  
  return (
    <Animated.View 
      style={{ 
        height: showAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [height, height + hiddenHeight]
        }),
        width: "100%", 
        overflow: "hidden",
        ...style! 
      }}
    >
      <TouchableOpacity 
        activeOpacity={0.4}
        style={{ width: "100%", height: height, flexDirection: "row", alignItems: "center" }}
        onPress={startAnimation}
      >
        {shownElement}
        <Animated.View  
          style={{ 
            marginLeft: "auto", 
            transform: [{ 
              rotateZ: showAnim.interpolate({
                inputRange: [0, 0.8],
                outputRange: ["0deg", "-180deg"],
                extrapolate: 'clamp',
              })
            }],
          }}
        >
          <Icon
            icon={require(`../assets/icons/icon-downArrow.png`)}
            size={24}
          />
        </Animated.View>
      </TouchableOpacity>
      <View 
        onLayout={(event) => {
          setHiddenHeight(event.nativeEvent.layout.height);
        }}
        style={{ width: "100%" }}
      > 
        {children}
      </View>
    </Animated.View>
  );
}

