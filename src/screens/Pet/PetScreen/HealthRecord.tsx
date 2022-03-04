import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import FastImage from 'react-native-fast-image';

import Layout from '@/constants/Layout';
import { LabelText, ContainerWithBorder, ValueText } from './styles';
import Styles from '@/constants/Styles';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { addPetProfileHealthRecord, getPetProfileHealthRecord, resetPetProfileStatus } from '@/store/pets';
import WideButton from '@/components/WideButton';
import FormModal from '@/components/FormModal';
import { FormTextInput } from '@/components/Form/FormTextInput';
import { FormDateInput } from '@/components/Form/FormDateInput';

export default function HealthRecord({ id }: { id: number }) {

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.pets.data[id]?.healthRecord);
  const status = useAppSelector((state: RootState) => state.pets.getHealthRecordStatus);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getPetProfileHealthRecord(id));
  }, [])

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          borderTopLeftRadius: 24,
          borderBottomRightRadius: 24,
          borderBottomLeftRadius: 24,
          marginBottom: 20,
          ...Styles.shadowStyle
        }}
      >
        {item.image &&
          <FastImage
            style={{ width: "100%", height: (Layout.window.width - Layout.page.paddingHorizontal * 2) * 0.684 }}
            source={{ uri: item.image }}
          />
        }
        <View
          style={{
            paddingHorizontal: Layout.page.paddingHorizontal,
            paddingVertical: 20,
          }}
        >
          <LabelText>{t("healthRecord_sterilisationStatus")}</LabelText>
          <ValueText>Sterilised</ValueText>
          <LabelText style={{ marginTop: 18 }}>{t("healthRecord_vaccineRecord")}</LabelText>
          <ValueText>{item.vaccine_name}</ValueText>
          <View style={{ flexDirection: "row", marginTop: 18, justifyContent: "space-between", alignItems: "flex-end" }}>
            <View>
              <LabelText>{t("healthRecord_vaccineDate")}</LabelText>
              <ValueText>{item.date}</ValueText>
            </View>
            <ValueText>{t("to")}</ValueText>
            <View>
              <LabelText>{t("healthRecord_validUntil")}</LabelText>
              <ValueText>{item.valid_until}</ValueText>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: "center", paddingHorizontal: Layout.page.paddingHorizontal }}>
      {!data && status == "loading" && 
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator color="grey" />
        </View>
      }
      {data && <>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={{ width: "100%", marginTop: 5 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: "100%",
            paddingTop: 10,
            paddingBottom: insets.bottom + 15
          }}
          // ListHeaderComponent={
          //   <ContainerWithBorder style={{ width: "100%", height: 100, marginBottom: 20 }}>
          //   </ContainerWithBorder>
          // }
          ListFooterComponent={
            <WideButton
              isBorder
              text={t("healthRecord_addRecord")}
              onPress={() => {
                setIsModalVisible(true)
              }}
              style={{ width: "100%", backgroundColor: "transparent", marginTop: 20 }}
            />
          }
        />
      </>}
      <HealthRecordForm
        id={id}
        isVisible={isModalVisible}
        close={() => setIsModalVisible(false)}
      />
    </View>
  );
}

type FormValues = {
  name: string;
  date: Date;
  validUntil: Date;
};

const HealthRecordForm = ({ id, isVisible, close }: { id: number, isVisible: boolean, close: () => void }) => {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { ...methods } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { name, date, validUntil } = data;
    dispatch(addPetProfileHealthRecord({ id, name, date, validUntil }));
  };  
  const onError: SubmitErrorHandler<FormValues> = (errors, e) => console.log(errors);

  const status = useAppSelector((state: RootState) => state.pets.addHealthRecordStatus);

  useEffect(() => {
    methods.reset();
  }, [isVisible])

  useEffect(() => {
    if (status == "success") {
      dispatch(resetPetProfileStatus());
      dispatch(getPetProfileHealthRecord(id));
      close();
    }
    else if (status == "failed") {
      dispatch(resetPetProfileStatus());
    }
  }, [status])

  return (
    <FormModal 
      isVisible={isVisible}
      close={close}
      isLoading={status == "loading"}
    >
      <FormProvider { ...methods } >
        <FormTextInput
          name="name"
          label={t("healthRecord_vaccineName")}
          rules={{
            required: String(t("fieldRequired")),
          }}
        />
        <FormDateInput
          name="date"
          label={t("healthRecord_vaccineDate")}
          rules={{
            required: String(t("fieldRequired")),
          }}
        />
         <FormDateInput
          name="validUntil"
          label={t("healthRecord_validUntil")}
          rules={{
            required: String(t("fieldRequired")),
          }}
        />
        <WideButton
          isBorder
          text={t("healthRecord_addRecord")}
          onPress={methods.handleSubmit(onSubmit, onError)}
          style={{ width: "100%", backgroundColor: "transparent", marginTop: 20 }}
        />
      </FormProvider>
    </FormModal>
  )
}
