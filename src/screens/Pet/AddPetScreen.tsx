import React, { useEffect, useMemo, useState } from 'react';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { StackActions } from '@react-navigation/native';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState, store } from '@/store';
import { getPetProfileAll, resetPetProfileUpdateStatus, updatePetProfile } from '@/store/pets';
import { hideLoading, showLoading } from '@/store/loading';
import FormContainer from '@/components/FormContainer';
import WideButton from '@/components/WideButton';
import { FormDateInput } from '@/components/Form/FormDateInput';
import { FormTextInput } from '@/components/Form/FormTextInput';
import { FormPickerInput } from '@/components/Form/FormPickerInput';
import {  objectToValueLabelPair } from '@/utils/myUtils';
import { getUserProfile } from '@/store/profile';
import { FormImageInput } from '@/components/Form/FormImageInput';
import { RootStackScreenProps } from '@/types';

type FormValues = {
    name: string;
    petType: number;
    petBreed: string;
    birthday: Date;
    gender: string;
    sterilizeStatus: string;
    chipNumber: string;
    photo: any;
};
  
export default function AddPetScreen(props: RootStackScreenProps<'AddPet'>) {

    const { navigation } = props;
    const id = props.route.params?.id;
    const data = props.route.params?.data;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const popAction = StackActions.pop(1);

    const status = useAppSelector((state: RootState) => state.pets.updatePetProfileStatus);
    const errorMsg = useAppSelector((state: RootState) => state.pets.errorMsg);

    const { ...methods } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(updatePetProfile({ ...data, id }));
    };  
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => console.log(errors); 

    const [hasInit, setHasInit] = useState(false);
    const petTypes = useAppSelector((state: RootState) => state.resources.petTypes);    
    const petTypeSelected = methods.watch('petType');
    const petBreeds = useMemo(() => {
        try {
            if (petTypeSelected) {
                if (hasInit)
                    methods.resetField('petBreed');
                else 
                    setHasInit(true);
                return store.getState().resources.petBreeds[petTypeSelected].map((x: any) => {
                    return { label: x.name, value: x.id }
                });
            }
        }
        catch (e) {}
        return null
    }, [petTypes, petTypeSelected])
    const petGenders = useAppSelector((state: RootState) => state.resources.petGenders);   
  
    useEffect(() => {
        if (data?.name) 
            methods.setValue("name", data.name);
        if (data?.pet_type_id) 
            methods.setValue("petType", data.pet_type_id);
        if (data?.pet_breed) 
            methods.setValue("petBreed", data.pet_breed);
        if (data?.dob) 
            methods.setValue("birthday", moment(data.dob, "YYYY-MM-DD").toDate());
        if (data?.gender) 
            methods.setValue("gender", data.gender);
        if (data?.sterilisation_status) 
            methods.setValue("sterilizeStatus", data.sterilisation_status);
        if (data?.chip_number) 
            methods.setValue("chipNumber", data.chip_number);
        if (data?.image) 
            methods.setValue("photo", { uri: data.image, notUpdated: true });
    }, [])

    useEffect(() => {
        if (status == "success") {
            dispatch(getUserProfile());
            if (id != undefined) {
                dispatch(getPetProfileAll(id));
            }
            dispatch(resetPetProfileUpdateStatus());
            navigation.dispatch(popAction);
        }
        else if (status == "failed") {
            navigation.navigate("Dialog", { message: errorMsg != undefined && errorMsg != "" ? errorMsg : t("tryAgain") });
            dispatch(resetPetProfileUpdateStatus());
        }
 
        // toggle loading
        if (status == "loading") 
            dispatch(showLoading());
        else
            dispatch(hideLoading());
    }, [status])

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
                <FormImageInput
                    name="photo"
                    label={t("pet_photo")}
                />
                <WideButton
                    isBorder
                    text={t("save")}
                    onPress={methods.handleSubmit(onSubmit, onError)}
                    style={{ width: "100%", backgroundColor: "transparent", marginTop: 20 }}
                />
            </FormProvider>
        </FormContainer>
    );
}
