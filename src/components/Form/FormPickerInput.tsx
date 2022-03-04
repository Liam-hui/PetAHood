import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useController, useFormContext, UseControllerProps } from 'react-hook-form';

import { Container, ErrorText, InputContainer, LabelText, ValueText } from './styles';
import BottomPicker from '../BottomPicker';

interface FormPickerInputProps extends UseControllerProps {
  label: string
  name: string
  items: { value: any, label: string }[],
  defaultValue?: any,
  style?: object,
}

export const FormPickerInput = (props: FormPickerInputProps) => {

  const formContext = useFormContext();
  const { formState } = formContext;

  const {
    name,
    label,
    rules,
    defaultValue,
    items,
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
        <ValueText>{items.find(x => x.value == field.value)?.label ?? ""}</ValueText>
        {/* <ValueText>{field.value}</ValueText> */}
      </InputContainer>
      <BottomPicker
        isVisible={isPickerVisible}
        value={field.value}
        close={() => setIsPickerVisible(false)}
        select={(value) => field.onChange(value)}
        items={items}
      />
    {hasError && <ErrorText>{formState.errors[name].message}</ErrorText>}
    </Container>
  );
}
