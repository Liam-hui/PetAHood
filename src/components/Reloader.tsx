import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from '@/components/Icon';
import { Status } from '@/types';

export default function Reloader({ reload }: { reload: () => void }) {
  
  const { t } = useTranslation();

  return (
    <TouchableOpacity 
      style={{ alignItems: "center", marginVertical: 20 }}
      onPress={reload}
    >
      <Icon
        size={25}
        icon={require("@/assets/icons/icon-refresh.png")}
      />
      <Text style={{ marginTop: 5 }}>{t("tryAgain")}</Text>
    </TouchableOpacity> 
  );
}

