import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm, useController, useFormContext, UseControllerProps } from 'react-hook-form';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { Container, ErrorText, InputContainer, LabelText, ValueText } from './styles';
import Icon from '../Icon';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import FastImage from 'react-native-fast-image';

interface FormImageInputProps extends UseControllerProps {
  label: string
  name: string
  defaultValue?: string,
  style?: object,
}

export const FormImageInput = (props: FormImageInputProps) => {

  const { t } = useTranslation();

  const formContext = useFormContext();
  const { formState } = formContext;

  const {
    name,
    label,
    rules,
    defaultValue,
    style,
  } = props;

  const { resetField } = useForm();
  const { field } = useController({ name, rules, defaultValue });

  const hasError = Boolean(formState?.errors[name]);

  const takePhoto = async() => {
    try {
      const result = await launchCamera({
        mediaType: "photo"
      });
      field.onChange(result?.assets![0]);
    }
    catch (e) {}
  }

  const getImage = async() => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo"
      });
      field.onChange(result?.assets![0]);
    }
    catch (e) {}
  }

  return (
    <Container style={{ ...style! }}>
      <LabelText>{label}</LabelText>
      {field.value != undefined
        ? <InputContainer
            style={{ justifyContent: "center", alignItems: "center", height: (Layout.window.width - Layout.page.paddingHorizontal * 4) * 0.5, padding: 10 }}
          >
            <FastImage
              source={{ uri: field.value.uri }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
            <Icon
              size={25}
              icon={require("@/assets/icons/icon-delete.png")}
              style={{ position: "absolute", top: 7, right: 7 }}
              onPress={() => {
                resetField(name);
                field.onChange(undefined);
                console.log(field.value)
              }}
            />
          </InputContainer>
        : <>
          <InputContainer as={TouchableOpacity}
            onPress={() => {
              takePhoto();
            }}
            style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", height: (Layout.window.width - Layout.page.paddingHorizontal * 4) * 0.5, marginBottom: 15 }}
          >
            <Icon
              size={45}
              icon={require("@/assets/icons/icon-camera.png")}
            />
            <Text style={{ color: Colors.orange, marginTop: 10 }}>{t("takePhoto")}</Text>
          </InputContainer>
          <InputContainer as={TouchableOpacity}
            onPress={() => {
              getImage();
            }}
            style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", height: (Layout.window.width - Layout.page.paddingHorizontal * 4) * 0.5, backgroundColor: Colors.orange }}
          >
            <Icon
              size={45}
              icon={require("@/assets/icons/icon-uploadPhoto.png")}
            />
            <Text style={{ color: "white", marginTop: 10 }}>{t("uploadImage")}</Text>
          </InputContainer>
        </>
      }
      {hasError && <ErrorText>{formState.errors[name].message}</ErrorText>}
    </Container>
  );
}
