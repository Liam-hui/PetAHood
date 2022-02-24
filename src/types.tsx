import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Login: undefined,
  Profile: undefined,
  Blog: { id: number }
  AlbumModal: { images: any[], index?: number }
  WebView: { url: string, heading?: string };
  // Shop Detail
  ShopDetail: { id: number },
  Photos: { data: any, goto?: { album: string, index: number } },
  OpeningHour: { data: any },
  Reviews: { id: number, data: any, count: number },
  // Search
  Search: undefined,
  SearchResult: { params?: any } | undefined,
  NearBy: undefined,
  // Setting
  Setting: undefined,
  Language: undefined,
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  StackScreenProps<RootStackParamList>
>;

export type FilterType = {
  districts: any[],
  petTypes: any[],
  needTypes: any[],
  specialCats: any[]
};

export type FilterNameType = "districts" | "petTypes" | "needTypes" | "specialCats";

export type SortingType = "rating" | "new" | "az" | "za" | "comment";