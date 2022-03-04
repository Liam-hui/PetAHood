import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import moment from 'moment';

import Layout from '@/constants/Layout';
import { ContainerWithBorder, LabelText, ValueText } from './styles';
import Styles from '@/constants/Styles';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { editPetProfilePetInsurance, getPetProfilePetInsurance, resetPetProfileStatus } from '@/store/pets';
import WideButton from '@/components/WideButton';
import FormModal from '@/components/FormModal';
import { FormTextInput } from '@/components/Form/FormTextInput';
import { FormDateInput } from '@/components/Form/FormDateInput';
import Icon from '@/components/Icon';
import Colors from '@/constants/Colors';

export default function PetInsurance({ id }: { id: number }) {

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.pets.data[id]?.petInsurance);
  const status = useAppSelector((state: RootState) => state.pets.getPetInsuranceStatus);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | undefined>(undefined);

  useEffect(() => {
    dispatch(getPetProfilePetInsurance(id));
  }, [])

  const renderItem = ({ item }: { item: any }) => {
    return (
      <ContainerWithBorder style={{ flexDirection: "row", width: "100%", backgroundColor: "white", marginBottom: 20, ...Styles.shadowStyle }}>
        <ContainerWithBorder style={{ paddingHorizontal: 28, paddingVertical: 20, alignItems: "center", justifyContnet: "center", alignSelf: "flex-start" }}>
          <Icon
            size={40}
            icon={require("@/assets/icons/icon-insurance.png")}
          />
          <Text style={{ color: "white", marginTop: 10, marginBottom: 7 }}>{t("petInsurance_insurer")}</Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>{item.period}</Text>
        </ContainerWithBorder>
        <View style={{ paddingVertical: 20, paddingHorizontal: 15, flex: 1 }}>
          <Text style={{ color: Colors.orange, fontSize: 18, fontWeight: "bold", marginBottom: 13 }}>{item.insurancer_name}</Text>
          <LabelText style={{ marginBottom: 10 }}>{t("petInsurance_coverage")}</LabelText>
          <ValueText>{`${item.start_date}  ${t("to")}  ${item.end_date}`}</ValueText>
          <TouchableOpacity
            style={{ borderWidth: 1, borderColor: "black", borderRadius: 5, alignSelf: "flex-start", paddingVertical: 5, paddingHorizontal: 10, marginTop: 15 }}
            onPress={() => {
              setSelectedItem(item);
              setIsModalVisible(true)
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{t("edit")}</Text>
          </TouchableOpacity>
        </View>
      </ContainerWithBorder>
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
          ListFooterComponent={
            <WideButton
              isBorder
              text={t("petInsurance_add")}
              onPress={() => {
                setSelectedItem(undefined);
                setIsModalVisible(true)
              }}
              style={{ width: "100%", backgroundColor: "transparent", marginTop: 20 }}
            />
          }
        />
      </>}
      <PetInsuranceForm
        id={id}
        item={selectedItem}
        isVisible={isModalVisible}
        close={() => {
          setIsModalVisible(false);
          setSelectedItem(undefined);
        }}
      />
    </View>
  );
}

type FormValues = {
  name: string;
  startDate: Date;
  endDate: Date;
};

const PetInsuranceForm = ({ id, item, isVisible, close }: { id: number, item?: any, isVisible: boolean, close: () => void }) => {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { ...methods } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { name, startDate, endDate } = data;
    dispatch(editPetProfilePetInsurance({ id, name, startDate, endDate, ...item && { insuranceId: item.id } }));
  };  
  const onError: SubmitErrorHandler<FormValues> = (errors, e) => console.log(errors);

  const status = useAppSelector((state: RootState) => state.pets.editPetInsuranceStatus);

  useEffect(() => {
    methods.reset();
  }, [isVisible])

  useEffect(() => {
    if (item) {
      methods.setValue("name", item.insurancer_name);
      methods.setValue("startDate", moment(item.start_date, "YYYY-MM-DD").toDate());
      methods.setValue("endDate", moment(item.end_date, "YYYY-MM-DD").toDate());
    }
  }, [item])

  useEffect(() => {
    if (status == "success") {
      dispatch(resetPetProfileStatus());
      dispatch(getPetProfilePetInsurance(id));
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
          label={t("petInsurance_insurance")}
          rules={{
            required: String(t("fieldRequired")),
          }}
        />
        <FormDateInput
          name="startDate"
          label={t("petInsurance_startDate")}
          rules={{
            required: String(t("fieldRequired")),
          }}
        />
         <FormDateInput
          name="endDate"
          label={t("petInsurance_endDate")}
          rules={{
            required: String(t("fieldRequired")),
          }}
        />
        <WideButton
          isBorder
          text={item ? t("petInsurance_edit") : t("petInsurance_add")}
          onPress={methods.handleSubmit(onSubmit, onError)}
          style={{ width: "100%", backgroundColor: "transparent", marginTop: 20 }}
        />
      </FormProvider>
    </FormModal>
  )
}
