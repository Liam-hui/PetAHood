import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';
// import 'moment/locale/zh-hk'

import en from './translations/en';
import zh from './translations/zh';

const languages = {
  "en": { translation: en },
  "zh": { translation: zh }
};

const detector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('user-language', (err, language) => {
      if (err || !language) {
        if (err) {
          console.log('Error fetching Languages from asyncstorage ', err);
        } else {
          console.log('No language is set, choosing English as fallback');
        }
        const findBestAvailableLanguage =
          RNLocalize.findBestAvailableLanguage(Object.keys(languages));

        callback(findBestAvailableLanguage.languageTag || 'en');
        // moment.locale(findBestAvailableLanguage.languageTag || 'en');
        return;
      }
      // moment.locale(language == "zh" ? "zh-hk" : "en");
      callback(language);
    });
  },
  init: () => {
  },
  cacheUserLanguage: language => {
    AsyncStorage.setItem('user-language', language);
  }
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: languages,
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
