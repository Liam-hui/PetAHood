import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';

export default function BottomSheet({ points, isOpen, close, children }: { points: (string | number)[] | Animated.SharedValue<(string | number)[]>, isOpen: boolean, children: React.ReactNode, close: () => void }) {

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    }
    else {
      bottomSheetModalRef.current?.close();
    }
  },[isOpen])

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => points, [points]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1)
      close();
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
        pressBehavior={'close'}
      >
        <TouchableOpacity activeOpacity={1} style={{ width: "100%", height: "100%" }} onPress={close} />
      </BottomSheetBackdrop>
    ),
  [])

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
      >
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
