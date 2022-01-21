import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import storage from '@/utils/storage';

const api = axios.create({
  // baseURL: 'https://petahood.com/api/v1',
  baseURL: 'https://pettest.itisdemo.com/api/v1',
});

api.interceptors.request.use(async (config) => {
  // const token = await storage.getToken();

  const headers = { 
    ...config.headers,
    "Accept-Language": await getLanguage()
  };

  // if (token) {
  //   headers.Authorization = `Bearer ${token}`;
  // }

  return { ...config, headers };
});

const getLanguage = async () => {
  const language = await AsyncStorage.getItem('user-language');
  if (language.includes("zh"))
    return "zh-HK";
  return "en";
}

export default api;