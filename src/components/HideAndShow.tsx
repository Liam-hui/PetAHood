import React, { useState, useRef } from 'react';
import { Animated, View, TouchableOpacity } from 'react-native';
import Icon from '@/components/Icon';

export default function HideAndShow({ children, shownElement, onShow, onHide, isAtBottom, isHideArrow, style }: { children: React.ReactNode, shownElement: React.ReactNode, onShow?: () => void, onHide?: () => void, isAtBottom?: boolean, isHideArrow?: boolean, style?: object }) {

  const [isShown, setIsShown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hiddenHeight, setHiddenHeight] = useState(0);
  const showAnim = useRef(new Animated.Value(0)).current;
  
  const startAnimation = () => {
    setIsAnimating(true);
    Animated.timing(
      showAnim,
      {
        toValue: isShown ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }
    ).start(({ finished }) => {
      if (finished) {
        if (!isShown && onShow) onShow();
        if (isShown && onHide) onHide();
        setIsShown(!isShown);
        setIsAnimating(false);
      }
    });
  };
  
  return (
    <View style={{ flexDirection: isAtBottom ? "column-reverse" : "column" }}>
      <TouchableOpacity 
        activeOpacity={0.4}
        style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
        onPress={startAnimation}
      >
        {shownElement}
        {!isHideArrow && 
          <Animated.View  
            style={{ 
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
        }
      </TouchableOpacity>
      <Animated.View 
        style={{ 
          ...(!isShown || isAnimating) && {
            height: showAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1 + hiddenHeight]
            }),
          },
          overflow: isShown ? "visible" : "hidden",
          ...style! 
        }}
      >
        <Animated.View 
          onLayout={(event) => {
            setHiddenHeight(event.nativeEvent.layout.height);
          }}
          style={{ 
            width: "100%",
            opacity: showAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            }),
          }}
          pointerEvents={isShown ? "auto" : "none"}
        > 
          {children}
        </Animated.View>
      </Animated.View>
    </View>
  );
}

