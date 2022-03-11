import React from 'react';
import { Switch, View, Platform } from 'react-native';
import { useController, useFormContext, UseControllerProps } from 'react-hook-form';
import { Container, ErrorText, LabelText } from './styles';
import Colors from '@/constants/Colors';

interface FormSwitchInputProps extends UseControllerProps {
  label: string
  name: string
  defaultValue?: string,
  style?: object,
}

export const FormSwitchInput = (props: FormSwitchInputProps) => {
  
  const formContext = useFormContext();
  const { formState } = formContext;

  const {
    name,
    label,
    rules,
    defaultValue,
    style,
  } = props;

  const { field } = useController({ name, rules, defaultValue });

  const hasError = Boolean(formState?.errors[name]);

  return (
    <Container style={{ ...style! }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <LabelText style={{ flex: 1, marginBottom: 0 }}>{label}</LabelText>
        <Switch
          trackColor={{ false: "#767577", true: Colors.orange }}
          thumbColor={field.value ? "white" : "#f4f3f4"}
          // ios_backgroundColor="#3e3e3e"
          style={{ marginLeft: 10, ...Platform.OS == "ios" && { transform: [{ scaleX: .8 }, { scaleY: .8 }] } }}
          onValueChange={() => {
            field.onChange(!field.value);
          }}
          value={field.value}
        />
      </View>
      {hasError && <ErrorText>{formState.errors[name].message}</ErrorText>}
    </Container>
  );
}

