import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import i18n from '@/translate/i18n';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { getPetProfileFashionSize, resetPetProfileUpdateStatus, updatePetProfileFashionSize } from '@/store/pets';
import moment from 'moment';
import WideButton from '@/components/WideButton';
import { hideLoading, showLoading } from '@/store/loading';
import Reloader from '@/components/Reloader';

export default function FashionSize({ id }: { id: number }) {

  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const data = useAppSelector((state: RootState) => state.pets.data[id]?.fashionSize);
  const getStatus = useAppSelector((state: RootState) => state.pets.getFashionSizeStatus);
  const updateStatus = useAppSelector((state: RootState) => state.pets.updateFashionSizeStatus);
  const errorMsg = useAppSelector((state: RootState) => state.pets.errorMsg);

  const size = 10;
  const [body, setBody] = useState<string | undefined>(data?.body);
  const [chest, setChest] = useState<string | undefined>(data?.chest);
  const [neck, setNeck] = useState<string | undefined>(data?.neck);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data?.body != undefined) 
      setBody(String(data.body));
    if (data?.chest) 
      setChest(String(data.chest));
    if (data?.neck) 
      setNeck(String(data.neck));
  }, [data])

  useEffect(() => {
    if (updateStatus == "success") {
      setIsEditing(false);
      dispatch(getPetProfileFashionSize(id));
      dispatch(resetPetProfileUpdateStatus());
    }
    else if (updateStatus == "failed") {
      navigation.navigate("Dialog", { message: errorMsg?? t("tryAgain") });
      dispatch(resetPetProfileUpdateStatus());
    }

    if (updateStatus == "loading") 
      dispatch(showLoading());
    else
      dispatch(hideLoading());
  }, [updateStatus])

  const confirm = () => {
    dispatch(updatePetProfileFashionSize({ id, size, body, chest, neck }));
  }

  return (
    <View style={{ flex: 1, alignItems: "center", paddingBottom: insets.bottom + 20, paddingHorizontal: Layout.page.paddingHorizontal }}>
      {getStatus == "failed" && <Reloader reload={() => dispatch(getPetProfileFashionSize(id))} />}
      {getStatus == "loading" && <ActivityIndicator color="grey" style={{ marginVertical: 20 }} /> }
      {data && <>
        <KeyboardAwareScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={{ paddingTop: 20, alignItems: "center" }} bounces={false}>
          {data.type == "cats" && <>
            {i18n.language == "zh"
              ? <FastImage source={require(`@/assets/images/fashionSize-cats-zh.png`)} style={{ width: 232, height: 153, marginBottom: 30 }} resizeMode="contain" />
              : <FastImage source={require(`@/assets/images/fashionSize-cats-en.png`)} style={{ width: 232, height: 153, marginBottom: 30 }} resizeMode="contain" />
            }
          </>}
          {data.type == "dogs" && <>
            {i18n.language == "zh"
              ? <FastImage source={require(`@/assets/images/fashionSize-dogs-zh.png`)} style={{ width: 232, height: 153, marginBottom: 30 }} resizeMode="contain" />
              : <FastImage source={require(`@/assets/images/fashionSize-dogs-en.png`)} style={{ width: 232, height: 153, marginBottom: 30 }} resizeMode="contain" />
            }
          </>}
          <View style={{ width: "100%", flexDirection: "row", paddingVertical: 25, backgroundColor: "white", borderRadius: 25, ...Styles.shadowStyle }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ ...styles.fieldText }}>{t("fashionSize_body")}</Text>
              <TextInput 
                editable={isEditing}
                style={{ ...styles.valueText }}
                value={isEditing ? body : (body != undefined && body != "" ? body + " cm" : "- cm")}
                onChangeText={(text) => setBody(text)}
                keyboardType="number-pad"
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ ...styles.fieldText }}>{t("fashionSize_chest")}</Text>
              <TextInput 
                editable={isEditing}
                style={{ ...styles.valueText }}
                value={isEditing ? chest : (chest != undefined && chest != "" ? chest + " cm" : "- cm")}
                onChangeText={(text) => setChest(text)}
                keyboardType="number-pad"
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ ...styles.fieldText }}>{t("fashionSize_neck")}</Text>
              <TextInput 
                editable={isEditing}
                style={{ ...styles.valueText }}
                value={isEditing ? neck : (neck != undefined && neck != "" ? neck + " cm" : "- cm")}
                onChangeText={(text) => setNeck(text)}
                keyboardType="number-pad"
              />
            </View>
          </View>
          {data.created_at && <Text style={{ color: "#B2B2B2", marginLeft: "auto", fontSize: 12, marginTop: 10 }}>{t("fashionSize_lastUpdate") + moment(data.created_at).format('YYYY-MM-DD')}</Text>}
        </KeyboardAwareScrollView>
        {isEditing
          ? <WideButton
              text={t("confirm")}
              onPress={confirm}
              style={{ width: "100%" }}
            />
          : <WideButton
              isBorder
              text={t("fashionSize_addNewSet")}
              onPress={() => {
                setIsEditing(true)
              }}
              style={{ width: "100%", backgroundColor: "transparent" }}
            />
        }
      </>}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldText: {
    fontWeight: "bold",
    fontSize: 12,
    color: Colors.orange,
    marginBottom: 5
  },
  valueText: {
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.orange,
    textAlign: "center",
  }
});

