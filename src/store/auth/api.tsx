import api from '@/api';
import EncryptedStorage from 'react-native-encrypted-storage';
import i18n from "i18next";

export async function loginApi(email: string, password: string) {
  var body = new FormData();
  body.append('email', email);
  body.append('password', password);

  try {
    const { data } = await api.post('/auth/login', body);
    if (data.code == 0) {
      await EncryptedStorage.setItem(
        "token",
        data.payload.access_token
      );
      return {
        isSuccess: true,
      }
    }
    else return {
      isSuccess: false,
      errorMsg: data.payload?.length ? data.payload[0] : i18n.t(('tryAgain'))
    }
  } catch (error: any) {
    const errorMsg = 
      error?.response?.data?.payload?.length 
        ? error.response.data.payload[0] 
        : error?.code
          ? error.code
          : i18n.t(('tryAgain'));
    return {
      isSuccess: false,
      errorMsg
    }
  }
}

export async function refreshTokenApi() {
  try {
    const { data } = await api.post('/auth/refresh');
    if (data.code == 0) {
      await EncryptedStorage.setItem(
        "token",
        data.payload.access_token
      );
      return {
        isSuccess: true,
      }
    }
    else {
      await EncryptedStorage.removeItem("token");
      return {
        isSuccess: false,
      }
    }
  } catch (error: any) {
    await EncryptedStorage.removeItem("token");
    return {
      isSuccess: false,
    }
  }
}