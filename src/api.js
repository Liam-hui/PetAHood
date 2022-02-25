import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

import { HOST } from '@/constants';

const api = axios.create({
  baseURL: HOST + "api/v1"
});

api.interceptors.request.use(async (config) => {
  const token = await EncryptedStorage.getItem("token");

  const headers = { 
    ...config.headers,
    "Accept-Language": await getLanguage()
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { ...config, headers };
});

const getLanguage = async () => {
  const language = await AsyncStorage.getItem('user-language');
  if (language.includes("zh"))
    return "zh-HK";
  return "en";
}

export default api;