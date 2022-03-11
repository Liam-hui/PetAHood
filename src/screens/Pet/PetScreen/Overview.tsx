import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { getPetProfileOverview } from '@/store/pets';
import moment from 'moment';
import { ContainerWithBorder } from './styles';
import Icon from '@/components/Icon';
import Reloader from '@/components/Reloader';

export default function Overview({ id }: { id: number }) {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const data = useAppSelector((state: RootState) => state.pets.data[id]?.overview);
  const status = useAppSelector((state: RootState) => state.pets.getOverviewStatus);

  return (
    <View style={{ flex: 1 }}>
      {status == "failed" && <Reloader reload={() => dispatch(getPetProfileOverview(id))} />}
      {status == "loading" && !data && <ActivityIndicator color="grey" style={{ marginVertical: 20 }} /> }
      {data && <>
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 10 }}>
          {/* <View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: Layout.page.paddingHorizontal, paddingRight: Layout.page.paddingHorizontal - 13, paddingVertical: 15}} 
            >
              <ContainerWithBorder style={styles.whiteBox}>
                <Text style={{ ...styles.fieldText }}>{t("pet_fashionSize")}</Text>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Icon
                    size={48}
                    icon={require("@/assets/icons/icon-catSize.png")}
                  />
                </View>
                <Text style={{ ...styles.valueText }}>{data.pet_size ?? "/"}</Text>
              </ContainerWithBorder>
              <ContainerWithBorder style={styles.whiteBox}>
                <Text style={{ ...styles.fieldText }}>{t("pet_weight")}</Text>
                <View style={{ flex: 1 }}>

                </View>
                <Text style={{ ...styles.valueText }}>{data.weight_size?? ""}</Text>
              </ContainerWithBorder>
              <ContainerWithBorder style={styles.whiteBox}>
                <Text style={{ ...styles.fieldText }}>{t("pet_healthCare")}</Text>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Icon
                    size={48}
                    icon={require("@/assets/icons/icon-healthRecord.png")}
                  />
                </View>
                <Text style={{ ...styles.valueText }}>{data.health_record?.date ?? "/"}</Text>
              </ContainerWithBorder>
              <ContainerWithBorder style={styles.whiteBox}>
                <Text style={{ ...styles.fieldText }}>{t("pet_insurance")}</Text>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={{ color: "black", fontSize: 35, fontWeight: "bold" }}>{data.insurance_count}</Text>
                </View>
                <Text style={{ ...styles.valueText }} numberOfLines={1}>
                  {data.insurancers.length == 0 ? "/" : data.insurancers.reduce(
                    (prev: string, curr: string) => prev + (prev == "" ? "" : ", ") + curr
                  , "")}
                </Text>
              </ContainerWithBorder>
            </ScrollView>
          </View> */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", paddingHorizontal: Layout.page.paddingHorizontal }}>
            <ContainerWithBorder style={styles.whiteBox}>
              <Text style={{ ...styles.fieldText }}>{t("pet_fashionSize")}</Text>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Icon
                  size={48}
                  icon={require("@/assets/icons/icon-catSize.png")}
                />
              </View>
              <Text style={{ ...styles.valueText }}>{data.pet_size ?? "/"}</Text>
            </ContainerWithBorder>
            <ContainerWithBorder style={styles.whiteBox}>
              <Text style={{ ...styles.fieldText }}>{t("pet_weight")}</Text>
              <View style={{ flex: 1 }}>

              </View>
              <Text style={{ ...styles.valueText }}>{data.weight_size?? ""}</Text>
            </ContainerWithBorder>
            <ContainerWithBorder style={styles.whiteBox}>
              <Text style={{ ...styles.fieldText }}>{t("pet_healthCare")}</Text>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Icon
                  size={48}
                  icon={require("@/assets/icons/icon-healthRecord.png")}
                />
              </View>
              <Text style={{ ...styles.valueText }}>{data.health_record?.date ?? "/"}</Text>
            </ContainerWithBorder>
            <ContainerWithBorder style={styles.whiteBox}>
              <Text style={{ ...styles.fieldText }}>{t("pet_insurance")}</Text>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ color: "black", fontSize: 35, fontWeight: "bold" }}>{data.insurance_count}</Text>
              </View>
              <Text style={{ ...styles.valueText }} numberOfLines={1}>
                {data.insurancers.length == 0 ? "/" : data.insurancers.reduce(
                  (prev: string, curr: string) => prev + (prev == "" ? "" : ", ") + curr
                , "")}
              </Text>
            </ContainerWithBorder>
          </View>
          {data.grooming &&
            <View style={{ paddingHorizontal: Layout.page.paddingHorizontal }}>
              <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10, marginBottom: 10 }}>{t("overflow_appointment")}</Text>
              <ContainerWithBorder style={{ flexDirection: "row", width: "100%", backgroundColor: "white", marginBottom: 20, alignItems: "center", ...Styles.shadowStyle }}>
                <ContainerWithBorder style={{ paddingHorizontal: 28, paddingVertical: 20, alignItems: "center", alignSelf: "flex-start", height: "100%" }}>
                  <Icon
                    size={40}
                    icon={require("@/assets/icons/icon-groom.png")}
                  />
                  <Text style={{ color: "white", fontWeight: "bold", marginTop: 15, fontSize: 12 }}>{moment(data.grooming.datetime).format('YYYY-MM-DD')}</Text>
                </ContainerWithBorder>
                <View style={{ paddingVertical: 20, paddingHorizontal: 15, flex: 1, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 15 }}>{t("overflow_schedule")}</Text>
                  <Text style={{ fontSize: 12, fontWeight: "bold", color: "#999999", marginBottom: 8 }}>{data.grooming.booked_service}</Text>
                  <Text style={{ fontSize: 12, fontWeight: "bold", color: "#999999" }}>{moment(data.grooming.datetime).format('HH:mm')}</Text>
                </View>
                <View style={{ backgroundColor: Colors.orange, width: 8, height: 8, borderRadius: 4, marginRight: 15 }}/>
              </ContainerWithBorder>
            </View>
          }
        </ScrollView>
      </>}
    </View>
  );
}

const styles = StyleSheet.create({
  whiteBox: {
    height: Layout.window.width * 0.5 - Layout.page.paddingHorizontal - 7 * 2,
    width: Layout.window.width * 0.5 - Layout.page.paddingHorizontal - 7 * 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center", 
    marginHorizontal: 7,
    marginVertical: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    ...Styles.shadowStyle 
  },
  fieldText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    marginBottom: 5
  },
  valueText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#999999",
  }
});

