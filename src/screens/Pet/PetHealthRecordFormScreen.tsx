import React, { useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { StackActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { RootStackScreenProps } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState, store } from '@/store';
import { getPetProfileHealthRecord, resetPetProfileUpdateStatus, updatePetProfileHealthRecord } from '@/store/pets';
import { hideLoading, showLoading } from '@/store/loading';
import FormContainer from '@/components/FormContainer';
import WideButton from '@/components/WideButton';
import { FormDateInput } from '@/components/Form/FormDateInput';
import { FormTextInput } from '@/components/Form/FormTextInput';
import { FormImageInput } from '@/components/Form/FormImageInput';

type FormValues = {
    image: any;
    name: string;
    number: string;
    date: Date;
    validUntil: Date;
};

export default function PetHealthRecordFormScreen(props: RootStackScreenProps<'PetHealthRecordForm'>) {

    const { navigation } = props;
    const { petId, itemId, data } = props.route.params;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const popAction = StackActions.pop(1);

    const status = useAppSelector((state: RootState) => state.pets.updateHealthRecordStatus);
    const errorMsg = useAppSelector((state: RootState) => state.pets.errorMsg);

    const { ...methods } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(updatePetProfileHealthRecord({ ...data, petId, itemId }));
    };  
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => console.log(errors);

    const deleteItem = () => {
        dispatch(updatePetProfileHealthRecord({ petId, itemId, isDelete: true }));
    }

    useEffect(() => {
        if (data?.image) {
            methods.setValue("image", { uri: data.image, notUpdated: true });
        }
        if (data?.vaccine_name) 
            methods.setValue("name", data.vaccine_name);
        if (data?.batch_number) 
            methods.setValue("number", data.batch_number);
        if (data?.date) 
            methods.setValue("date", moment(data.date, "YYYY-MM-DD").toDate());
        if (data?.valid_until) 
            methods.setValue("validUntil", moment(data.valid_until, "YYYY-MM-DD").toDate());
    }, [])

    useEffect(() => {
        const subscription = methods.watch((value, { name, type }) => {
            if (name == "date" && type == "change" && value.date != undefined && value.validUntil == undefined) {
                const date = new Date(value.date);
                methods.setValue("validUntil", new Date(date.setFullYear(date.getFullYear() + 1)));
            }
        });
        return () => subscription.unsubscribe();
      }, [methods.watch]);
  
    useEffect(() => {
        if (status == "success") {
            dispatch(resetPetProfileUpdateStatus());
            dispatch(getPetProfileHealthRecord(petId));
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
                <FormImageInput
                    name="image"
                    label={t("healthRecord_digitalRecord")}
                />
                <FormTextInput
                    name="name"
                    label={t("healthRecord_vaccineName")}
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                />
                <FormTextInput
                    name="number"
                    label={t("healthRecord_batchNumber")}
                    keyboardType="number-pad"
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
                    text={itemId ? t("save") : t("healthRecord_addRecord")}
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
