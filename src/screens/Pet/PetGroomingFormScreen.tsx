import React, { useEffect, useMemo } from 'react';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { RootStackScreenProps } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState, store } from '@/store';
import { getPetProfileGrooming, resetPetProfileStatus, updatePetProfile, updatePetProfileGrooming } from '@/store/pets';
import { hideLoading, showLoading } from '@/store/loading';
import FormContainer from '@/components/FormContainer';
import WideButton from '@/components/WideButton';
import { FormDateInput } from '@/components/Form/FormDateInput';
import { FormTextInput } from '@/components/Form/FormTextInput';
import { FormPickerInput } from '@/components/Form/FormPickerInput';
import {  objectToValueLabelPair } from '@/utils/myUtils';

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

    const status = useAppSelector((state: RootState) => state.pets.updatePetProfileStatus);
  
    useEffect(() => {
        if (status == "success") {
            dispatch(resetPetProfileStatus());
            dispatch(getPetProfileGrooming(petId));
            navigation.dispatch(popAction);
        }
        else if (status == "failed") {
            dispatch(resetPetProfileStatus());
        }
 
        // toggle loading
        if (status == "loading") 
            dispatch(showLoading());
        else
            dispatch(hideLoading());
    }, [status])

    const { ...methods } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(updatePetProfileGrooming({ ...data, petId, itemId }));
    };  
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => console.log(errors);

    const petGroomServiceTypes = useAppSelector((state: RootState) => state.resources.petGroomServiceType);    
    const petGroomPriceTypes = useAppSelector((state: RootState) => state.resources.petGroomPriceType);

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
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                />
                <WideButton
                    isBorder
                    text={t("submit")}
                    onPress={methods.handleSubmit(onSubmit, onError)}
                    style={{ width: "100%", backgroundColor: "transparent", marginTop: 20 }}
                />
            </FormProvider>
        </FormContainer>
    );
}
