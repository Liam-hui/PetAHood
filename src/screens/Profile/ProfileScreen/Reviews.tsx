import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { getUserProfileReviews } from '@/store/profile';
import { useTranslation } from 'react-i18next';
import Review from '@/components/Review';
import FlatListWithLoader from '@/components/FlatListWithLoader';

export default function Reviews() {

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.profile.reviews);
  const status = useAppSelector((state: RootState) => state.profile.reviewsStatus);
  const nextPage = useAppSelector((state: RootState) => state.profile.reviewsNextPage);

  const renderItem = ({ item }: { item: any }) => (
    <Review key={item.id} review={item} isProfile isFull />
  );

  const onEndReached = () => {
    if (status != "loading" && nextPage != null) {
      dispatch(getUserProfileReviews({}));
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatListWithLoader
        data={data}
        status={status}
        reload={() => dispatch(getUserProfileReviews({ isInit: true }))}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1, marginTop: 10 }}
        contentContainerStyle={{ 
          paddingTop: 5,
          paddingBottom: insets.bottom + 15
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
        ListEmptyComponent={
          <>
            {status != "loading" && <Text style={{ textAlign: "center", marginTop: 30 }}>{t("profile_noReviews")}</Text>}
          </>
        }
      />
    </View>
  );
}