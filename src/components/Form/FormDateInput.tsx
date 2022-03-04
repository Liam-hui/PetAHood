import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useController, useFormContext, UseControllerProps } from 'react-hook-form';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Container, ErrorText, InputContainer, LabelText, ValueText } from './styles';

interface FormDateInputProps extends UseControllerProps {
  label: string
  name: string
  defaultValue?: string,
  mode?: "date" | "time" | "datetime",
  style?: object,
}

export const FormDateInput = (props: FormDateInputProps) => {

  const { t } = useTranslation();

  const formContext = useFormContext();
  const { formState } = formContext;

  const {
    name,
    label,
    rules,
    defaultValue,
    mode,
    style,
  } = props;

  const { field } = useController({ name, rules, defaultValue });

  const hasError = Boolean(formState?.errors[name]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  return (
    <Container style={{ ...style! }}>
      <LabelText>{label}</LabelText>
      <InputContainer as={TouchableOpacity}
        onPress={() => setIsPickerVisible(true)}
      >
        <ValueText>{field.value ? (mode == "datetime" ? moment(field.value).format('DD/MM/YYYY h:mm A') : moment(field.value).format('DD/MM/YYYY') ): ""}</ValueText>
      </InputContainer>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode={mode ?? "date"}
        date={field.value}
        onConfirm={(date) => {
          field.onChange(date);
          setIsPickerVisible(false);
        }}
        onCancel={() => setIsPickerVisible(false)}
        confirmTextIOS={t("confirm")}
        cancelTextIOS={t("cancel")}
      />
    {hasError && <ErrorText>{formState.errors[name].message}</ErrorText>}
    </Container>
  );
}
