import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useController, useFormContext, UseControllerProps } from 'react-hook-form';
import { Container, ErrorText, InputContainer, LabelText } from './styles';

interface FormTextInputProps extends TextInputProps, UseControllerProps {
  label: string
  name: string
  defaultValue?: string,
  style?: object,
  inputStyle?: object,
}

export const FormTextInput = (props: FormTextInputProps) => {
  
  const formContext = useFormContext();
  const { formState } = formContext;

  const {
    name,
    label,
    rules,
    defaultValue,
    style,
    inputStyle,
    ...inputProps
  } = props;

  const { field } = useController({ name, rules, defaultValue });

  const hasError = Boolean(formState?.errors[name]);

  return (
    <Container style={{ ...style! }}>
      <LabelText>{label}</LabelText>
      <InputContainer style={{ ...inputStyle! }}>
        <TextInput
          autoCapitalize="none"
          textAlign="left"
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          numberOfLines={1}
          style={{ flex: 1, height: "100%" }}
          {...inputProps}
        />
      </InputContainer>
      {hasError && <ErrorText>{formState.errors[name].message}</ErrorText>}
    </Container>
  );
}

