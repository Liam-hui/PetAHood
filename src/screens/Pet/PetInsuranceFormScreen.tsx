import React, { useEffect } from 'react';
import { Text } from 'react-native'
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { StackActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { RootStackScreenProps } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState, store } from '@/store';
import { getPetProfileInsurance, resetPetProfileUpdateStatus, updatePetProfileInsurance } from '@/store/pets';
import { hideLoading, showLoading } from '@/store/loading';
import FormContainer from '@/components/FormContainer';
import WideButton from '@/components/WideButton';
import { FormDateInput } from '@/components/Form/FormDateInput';
import { FormTextInput } from '@/components/Form/FormTextInput';
import { FormSwitchInput } from '@/components/Form/FormSwitchInput';

type FormValues = {
    name: string;
    startDate: Date;
    endDate: Date;
    remindMe: boolean;
};

export default function PetInsuranceFormScreen(props: RootStackScreenProps<'PetInsuranceForm'>) {

    const { navigation } = props;
    const { petId, itemId, data } = props.route.params;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const popAction = StackActions.pop(1);

    const status = useAppSelector((state: RootState) => state.pets.updateInsuranceStatus);
    const errorMsg = useAppSelector((state: RootState) => state.pets.errorMsg);

    const { ...methods } = useForm<FormValues>({
        defaultValues: { 
            remindMe: true
        },
    });
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(updatePetProfileInsurance({ ...data, petId, itemId }));
    };  
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => console.log(errors);

    const deleteItem = () => {
        dispatch(updatePetProfileInsurance({ petId, itemId, isDelete: true }));
    }

    useEffect(() => {
        if (data?.insurancer_name) 
            methods.setValue("name", data.insurancer_name);
        if (data?.start_date) 
            methods.setValue("startDate", moment(data.start_date, "YYYY-MM-DD").toDate());
        if (data?.end_date) 
            methods.setValue("endDate", moment(data.end_date, "YYYY-MM-DD").toDate());
        if (data?.reminder_before_30 != undefined) 
            methods.setValue("remindMe", data.reminder_before_30);
    }, [])

    useEffect(() => {
        const subscription = methods.watch((value, { name, type }) => {
            if (name == "startDate" && type == "change" && value.startDate != undefined && value.endDate == undefined) {
                const date = new Date(value.startDate);
                methods.setValue("endDate", new Date(date.setFullYear(date.getFullYear() + 1)));
            }
        });
        return () => subscription.unsubscribe();
      }, [methods.watch]);
  
    useEffect(() => {
        if (status == "success") {
            dispatch(resetPetProfileUpdateStatus());
            dispatch(getPetProfileInsurance(petId));
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
                <FormTextInput
                    name="name"
                    label={t("petInsurance_insurance")}
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 15 }}>{t("petInsurance_coverage")}</Text>
                <FormDateInput
                    name="startDate"
                    label={t("petInsurance_startDate")}
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                    labelStyle={{ fontWeight: "normal", fontSize: 14 }}
                />
                <FormDateInput
                    name="endDate"
                    label={t("petInsurance_endDate")}
                    rules={{
                        required: String(t("fieldRequired")),
                    }}
                    labelStyle={{ fontWeight: "normal", fontSize: 14 }}
                />
                <FormSwitchInput
                    name="remindMe"
                    label={t("petInsurance_remindMe")}
                />
                <WideButton
                    text={itemId ? t("save") : t("petInsurance_add")}
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
