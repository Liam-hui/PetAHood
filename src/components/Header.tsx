import React from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Icon from './Icon';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';

export default function Header({ title, action, actionWidth, noShadow, isLeft }: { title?: string, action?: React.ReactNode, noShadow?: boolean, isLeft?: boolean, actionWidth?: number }) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const popAction = StackActions.pop(1);
  
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => 
        <View 
          style={{ 
            backgroundColor: "white", 
            paddingHorizontal: 15, 
            paddingTop: 18 + (insets?.top ?? 0),
            paddingBottom: 15, 
            ... !noShadow && Styles.shadowStyle,
            zIndex: 999,
          }} 
        >
          <View 
            style={{ 
              // flex: 1,
              width: "100%",
              flexDirection: "row", 
              alignItems: "center",
              ... isLeft ? { paddingLeft: 40 } : { justifyContent: "center" },
            }
          }>
            <Icon
              icon={require(`../assets/icons/icon-backArrow.png`)}
              size={24}
              onPress={() => navigation.dispatch(popAction)}
              style={{ position: "absolute", left: 0 }}
            />

            {title &&
              <Text style={{ fontWeight: "700", fontSize: 18, color: Colors.orange, ...isLeft && { flex: 1 } }} numberOfLines={1}>{title}</Text>
            }

            {actionWidth && 
              <View style={{ width: actionWidth }} />
            }

            <View style={{ position: "absolute", right: 0, alignItems: "flex-end" }}>
              {action}
            </View>
          </View>
        </View>
      }
    </SafeAreaInsetsContext.Consumer>
  );
}
