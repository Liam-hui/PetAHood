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
  Pet: { id: number }
  Blog: { id: number }
  AlbumModal: { images: any[], index?: number }
  Dialog: { message: string, confirm?: any, confirmText?: string, cancel?: any, cancelText?: string }
  AddNewLocation: undefined,
  RegisterAsPartner: undefined,
  WebView: { url: string, heading?: string };
  // Profile
  Profile: undefined,
  AddPet: undefined,
  PetGroomingForm: { petId: number, itemId?: number, data: any | null },
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
  Home: undefined,
  Wishlist: undefined,
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

export type Status = "idle" | "loading" | "success" | "failed";