import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import Colors from '@/constants/Colors';

export default function AlbumModal({ text, onPress, style }: { text: string, onPress: () => void, style?: object }) {

  const [isVisible, setIsVisible] = useState(false);

  return (
    <Modal
      // animationType=""
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        // setModalVisible(!modalVisible);
      }}
    >
      <View style={{ flex: 1, backgroundColor: "black" }}>

      </View>
    </Modal>
  );
}
