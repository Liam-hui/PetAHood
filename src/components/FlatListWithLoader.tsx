import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, FlatListProps, RefreshControl } from 'react-native';

import { Status } from '@/types';
import Reloader from './Reloader';

interface FlatListWithLoaderProps extends FlatListProps<any> {
  status: Status,
  reload: () => void,
}

export default function FlatListWithLoader(props: FlatListWithLoaderProps) {
  
  const {
    data,
    status,
    reload,
    ...flatListProps
  } = props;

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    reload();
  }, []);

  useEffect(() => {
    if (status != "loading")
      setRefreshing(false);
  }, [status])
  
  return (
    <>
      {status == "failed" && <Reloader reload={reload}/>}
      {status == "loading" && !data && <ActivityIndicator color="grey" style={{ marginVertical: 10 }}/>}
      {status != "failed" && data && 
        <FlatList
          {...flatListProps}
          data={data}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListFooterComponent={
            <>
              {status == 'loading' && !refreshing && <ActivityIndicator color="grey" style={{ marginVertical: 10 }}/>}
              {props.ListFooterComponent}
            </>
          }
        />
      }
    </>
  );
}

