import React, { useEffect, useMemo } from 'react';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState, store } from '@/store';
import { resetPetProfileStatus, updatePetProfile } from '@/store/pets';
import { hideLoading, showLoading } from '@/store/loading';
import FormContainer from '@/components/FormContainer';
import WideButton from '@/components/WideButton';
import { FormDateInput } from '@/components/Form/FormDateInput';
import { FormTextInput } from '@/components/Form/FormTextInput';
import { FormPickerInput } from '@/components/Form/FormPickerInput';
import {  objectToValueLabelPair } from '@/utils/myUtils';
import { getUserProfile } from '@/store/profile';

type FormValues = {
    name: string;
    petType: number;
    petBreed: string;
    birthday: Date;
    gender: string;
    sterilizeStatus: string;
    chipNumber: string;
};
  
export default function AddPetScreen() {

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const popAction = StackActions.pop(1);

    const status = useAppSelector((state: RootState) => state.pets.updatePetProfileStatus);
  
    useEffect(() => {
        if (status == "success") {
            dispatch(getUserProfile());
            dispatch(resetPetProfileStatus());
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
        dispatch(updatePetProfile(data));
    };  
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => console.log(errors);

    const petTypes = useAppSelector((state: RootState) => state.resources.petTypes);    
    const petTypeSelected = methods.watch('petType');
    const petBreeds = useMemo(() => {
        methods.resetField('petBreed');
        try {
            if (petTypeSelected) {
                return store.getState().resources.petBreeds[petTypeSelected].map((x: any) => {
                    return { label: x.name, value: x.id }
                });
            }
        }
        catch (e) {}
        return null
    }, [petTypes, petTypeSelected])
    const petGenders = useAppSelector((state: RootState) => state.resources.petGenders);    

    return (
        <FormContainer>
            <FormProvider { ...methods } >
                <FormTextInput
                    name="name"
                    label={t("pet_name")}
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                />
                <FormPickerInput
                    name="petType"
                    label={t("pet_petType")}
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                    items={objectToValueLabelPair(petTypes)}
                />
                {petBreeds &&
                    <FormPickerInput
                        name="petBreed"
                        label={t("pet_breed")}
                        items={petBreeds}
                    />
                }
                <FormDateInput
                    name="birthday"
                    label={t("pet_bd")}
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                />
                <FormPickerInput
                    name="gender"
                    label={t("pet_gender")}
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                    items={objectToValueLabelPair(petGenders)}
                />
                <FormPickerInput
                    name="sterilizeStatus"
                    label={t("pet_sterilizeStatus")}
                    items={[
                        { value: "sterilised", label: t("pet_sterilized") },
                        { value: "not_sterilised", label: t("pet_notSterilized") },
                        { value: "unsure", label: t("pet_unsure") }
                    ]}
                />
                <FormTextInput
                    name="chipNumber"
                    label={t("pet_chipNumber")}
                    // keyboardType="numeric"
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
