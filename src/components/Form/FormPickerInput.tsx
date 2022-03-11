import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useController, useFormContext, UseControllerProps } from 'react-hook-form';

import { Container, ErrorText, InputContainer, LabelText, ValueText } from './styles';
import BottomPicker from '../BottomPicker';
import Icon from '../Icon';

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
        <Icon
          size={16}
          icon={require("@/assets/icons/icon-downArrow-orange.png")}
          style={{ marginLeft: "auto"}}
        />
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
