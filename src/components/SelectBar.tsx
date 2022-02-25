import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import React from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';

export default function SelectBar({ items, value, select } : { value: any, items: { name: string, value: any }[], select: (value: any) => void }) {
  return (
    <View style={{ height: 40, width: "100%" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: "row", minWidth: "100%", justifyContent: "center", paddingHorizontal: Layout.page.paddingHorizontal }}>
        {items.map((item, index) => {
          const isSelected = value == item.value;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => select(item.value)}
              style={{
                borderWidth: 1,
                borderColor: Colors.orange,
                height: 32,
                borderRadius: 14,
                paddingHorizontal: 15,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 4,
                marginHorizontal: 3,
                ... isSelected && { backgroundColor: Colors.orange }
              }}
            >
              <Text 
                style={{ 
                  color: Colors.orange,
                  fontSize: 13,
                  fontWeight: "bold",
                  ... isSelected && { color: "white" } 
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  );
}


