import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Platform, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native';

import { RootStackScreenProps } from '@/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@/components/Icon';
import Styles from '@/constants/Styles';
import { StackActions } from '@react-navigation/native';
import { ModalContainer, ContentContainer, FieldName, Heading } from './styles';
import { TextInput } from '@/components/Themed';
import { useTranslation } from 'react-i18next';
import WideButton from '@/components/WideButton';
import Colors from '@/constants/Colors';
import Checkbox from '@/components/Checkbox';
import { TabView } from 'react-native-tab-view';
import Layout from '@/constants/Layout';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { login } from '@/store/auth';
import { RootState } from '@/store';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function LoginScreen(props: RootStackScreenProps<'Login'>) {

  const { t } = useTranslation();
  const { navigation } = props;
  const popAction = StackActions.pop(1);
  const insets = useSafeAreaInsets();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'login', title: "login" },
    { key: 'signup', title: "signup" },
  ]);

  const goToSignup = () => {
    setIndex(1);
  }

  const goToLogin = () => {
    setIndex(0);
  }

  return (
    <ModalContainer style={{ paddingTop: Platform.OS == "android" ? insets.top + 25 : 25 }}>
      <Icon
        icon={require("@/assets/icons/icon-close-black.png")}
        size={18}
        style={{ marginLeft: "auto", marginBottom: 20, marginRight: 20 }}
        onPress={() => navigation.dispatch(popAction)}
      />
      <TabView
        swipeEnabled={false}
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          return route.key == "login"
            ? <LoginTab goToSignup={goToSignup} />
            : <SignupTab goToLogin={goToLogin} />
        }}
        renderTabBar={props =>
          null
        }
        onIndexChange={setIndex}
        initialLayout={{ width: Layout.window.width }}
        style={{ flex: 1 }}
      />
    </ModalContainer>
  );
}

const LoginTab = ({ goToSignup }: { goToSignup: () => void }) => {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const isLoading = useAppSelector((state: RootState) => state.auth.isLoading);
  const status = useAppSelector((state: RootState) => state.auth.status);
  const errorMsg = useAppSelector((state: RootState) => state.auth.errorMsg);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [isErrorMsgShown, setIsErrorMsgShown] = useState(false);

  useEffect(() => {
    getCredentials();
  }, [])

  useEffect(() => {
    setIsErrorMsgShown(false);
  }, [email, password])

  useEffect(() => {
    if (!isLoading && status == "failed" && errorMsg != null) {
      setIsErrorMsgShown(true);
    }
  }, [isLoading, status, errorMsg])


  const getCredentials = async() => {
    try {   
      const credentials = await EncryptedStorage.getItem("credentials");
      if (credentials != undefined) {
        const credentialsParsed = JSON.parse(credentials);
        setEmail(credentialsParsed?.email);
        setPassword(credentialsParsed?.password);
        setIsRemember(true);
      }
    } catch (error) {}
  }

  const loginPressed = async () => {
    if (email != "" && password != "") {
      dispatch(login({ email, password }));
      if (isRemember) {
        await EncryptedStorage.setItem(
          "credentials",
          JSON.stringify({
            email,
            password
          })
        );
      }
      else {
        await EncryptedStorage.removeItem("credentials")
      }
    }
  }

  return (
    <>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: insets.bottom + 15 }} showsVerticalScrollIndicator={false} bounces={false}>
        <ContentContainer style={{ ...Styles.shadowStyle }}>
          <Heading>{t("auth_login")}</Heading>
          <FieldName>{t("auth_email")}<Text style={{ color: Colors.darkOrange }}>*</Text></FieldName>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{ marginBottom: 20 }}
          />
          <FieldName>{t("auth_password")}<Text style={{ color: Colors.darkOrange }}>*</Text></FieldName>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{ marginBottom: 10 }}
          />
          <View pointerEvents='none' style={{ marginBottom: 20 }}>
            <Text style={{ color: "grey", opacity: isErrorMsgShown ? 1 : 0 }}>{errorMsg?? " "}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: "center", marginBottom: 20 }}>
            <Checkbox
              size={18}
              value={isRemember}
              onPress={() => setIsRemember(!isRemember)}
              style={{ marginRight: 8 }}
            />
            <Text>{t("auth_rememberMe")}</Text>
            <TouchableOpacity
              style={{  marginLeft: "auto" }}
            >
              <Text style={{ fontWeight: "bold", color: Colors.darkOrange }}>{t("auth_forgotPassword")}</Text>
            </TouchableOpacity>
          </View>
          <WideButton
            text={t("auth_login")}
            onPress={loginPressed}
            color={Colors.darkOrange}
          />
          <Text style={{ alignSelf: "center", marginVertical: 15 }}>{t("auth_or")}</Text>
          <WideButton
            isBorder
            onPress={() => {

            }}
            color={"#030335"}
            style={{
              justifyContent: "flex-start",
              paddingHorizontal: 15,
              marginBottom: 15
            }}
          >
            <Icon
              icon={require("@/assets/icons/icon-facebook2.png")}
              size={20}
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontWeight: "bold" }}>{t("auth_fbSignin")}</Text>
          </WideButton>
          <WideButton
            isBorder
            onPress={() => {

            }}
            color={"#030335"}
            style={{
              justifyContent: "flex-start",
              paddingHorizontal: 15,
            }}
          >
            <Icon
              icon={require("@/assets/icons/icon-google.png")}
              size={20}
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontWeight: "bold" }}>{t("auth_googleSignin")}</Text>
          </WideButton>
        </ContentContainer>
        <ContentContainer style={{ ...Styles.shadowStyle, marginTop: 20 }}>
          <WideButton
            isBorder
            text={t("auth_createAccount")}
            onPress={goToSignup}
            color={Colors.darkOrange}
          />
        </ContentContainer>
      </ScrollView>
      {isLoading && 
        <Modal
          animationType="fade"
          visible={isLoading}
          transparent
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator color="black" />
          </View>
        </Modal>
      }
    </>
  )
}

const SignupTab = ({ goToLogin }: { goToLogin: () => void }) => {

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: insets.bottom + 15 }} showsVerticalScrollIndicator={false} bounces={false}>
      <ContentContainer style={{ ...Styles.shadowStyle }}>
        <Heading>{t("auth_createAccount")}</Heading>
        <FieldName>{t("auth_firstName")}<Text style={{ color: Colors.darkOrange }}>*</Text></FieldName>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={{ marginBottom: 20 }}
        />
        <FieldName>{t("auth_lastName")}<Text style={{ color: Colors.darkOrange }}>*</Text></FieldName>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={{ marginBottom: 20 }}
        />
        <FieldName>{t("auth_email")}<Text style={{ color: Colors.darkOrange }}>*</Text></FieldName>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 20 }}
        />
        <FieldName>{t("auth_password")}<Text style={{ color: Colors.darkOrange }}>*</Text></FieldName>
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{ marginBottom: 20 }}
        />
        <FieldName>{t("auth_confirmPassword")}<Text style={{ color: Colors.darkOrange }}>*</Text></FieldName>
        <TextInput
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{ marginBottom: 20 }}
        />
        <WideButton
          text={t("auth_createAccount")}
          onPress={() => {

          }}
          color={Colors.darkOrange}
          style={{ marginBottom: 15 }}
        />
        <WideButton
          isBorder
          text={t("cancel")}
          onPress={goToLogin}
          color={Colors.darkOrange}
        />
      </ContentContainer>
    </ScrollView>
  )
}