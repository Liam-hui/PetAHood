import React, { useEffect, useMemo } from 'react';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { RootStackScreenProps } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState, store } from '@/store';
import { getPetProfileGrooming, resetPetProfileUpdateStatus, updatePetProfileGrooming } from '@/store/pets';
import { hideLoading, showLoading } from '@/store/loading';
import FormContainer from '@/components/FormContainer';
import WideButton from '@/components/WideButton';
import { FormDateInput } from '@/components/Form/FormDateInput';
import { FormTextInput } from '@/components/Form/FormTextInput';
import { FormPickerInput } from '@/components/Form/FormPickerInput';
import {  entries, objectToValueLabelPair } from '@/utils/myUtils';

type FormValues = {
    time: string;
    company: string;
    groomer: string;
    service: number;
    remarks: string;
    priceType: number;
    price: number;
};
  
export default function PetGroomingFormScreen(props: RootStackScreenProps<'PetGroomingForm'>) {

    const { navigation } = props;
    const { petId, itemId, data } = props.route.params;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const popAction = StackActions.pop(1);

    const status = useAppSelector((state: RootState) => state.pets.updateGroomingStatus);
    const errorMsg = useAppSelector((state: RootState) => state.pets.errorMsg);

    const { ...methods } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(updatePetProfileGrooming({ ...data, petId, itemId }));
    };  
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => console.log(errors);

    const deleteItem = () => {
        dispatch(updatePetProfileGrooming({ petId, itemId, isDelete: true }));
    }

    const petGroomServiceTypes = useAppSelector((state: RootState) => state.resources.petGroomServiceType);    
    const petGroomPriceTypes = useAppSelector((state: RootState) => state.resources.petGroomPriceType);

    useEffect(() => {
        if (data?.datetime) 
            methods.setValue("time", data.datetime);
        if (data?.company_name) 
            methods.setValue("company", data.company_name);
        if (data?.groomer) 
            methods.setValue("groomer", data.groomer);
        if (data?.booked_service) 
            methods.setValue("service", Number(objectToValueLabelPair(petGroomServiceTypes).find(x => x.label == data.booked_service)?.value));
        if (data?.remarks) 
            methods.setValue("remarks", data.remarks);
    }, [])
  
    useEffect(() => {
        if (status == "success") {
            dispatch(resetPetProfileUpdateStatus());
            dispatch(getPetProfileGrooming(petId));
            navigation.dispatch(popAction);
        }
        else if (status == "failed") {
            navigation.navigate("Dialog", { message: errorMsg?? t("tryAgain") });
            dispatch(resetPetProfileUpdateStatus());
        }
 
        if (status == "loading") 
            dispatch(showLoading());
        else
            dispatch(hideLoading());
    }, [status])

    return (
        <FormContainer>
            <FormProvider { ...methods } >
                <FormDateInput
                    name="time"
                    label={t("grooming_date")}
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                    mode="datetime"
                />
                <FormTextInput
                    name="company"
                    label={t("grooming_company")}
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                />
                <FormTextInput
                    name="groomer"
                    label={t("grooming_groomer")}
                />
                <FormPickerInput
                    name="service"
                    label={t("grooming_service")}
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                    items={objectToValueLabelPair(petGroomServiceTypes)}
                />
                <FormTextInput
                    name="remarks"
                    label={t("grooming_remarks")}
                    inputStyle={{ height: 100 }}
                    numberOfLines={undefined}
                    multiline
                />
                <FormPickerInput
                    name="priceType"
                    label={t("grooming_priceType")}
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                    items={objectToValueLabelPair(petGroomPriceTypes)}
                />
                <FormTextInput
                    name="price"
                    label={t("grooming_price")}
                    keyboardType="number-pad"
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                />
                <WideButton
                    text={itemId ? t("save") : t("grooming_add")}
                    onPress={methods.handleSubmit(onSubmit, onError)}
                    style={{ width: "100%", marginTop: 20 }}
                />
                {itemId &&
                    <WideButton
                        isBorder
                        text={t("healthRecord_deleteRecord")}
                        onPress={deleteItem}
                        style={{ width: "100%", backgroundColor: "transparent", marginTop: 20 }}
                    />
                }
            </FormProvider>
        </FormContainer>
    );
}
