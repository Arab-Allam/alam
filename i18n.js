
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

// import ar from './src/languages/ar/Translation.json';
// import en from './src/languages/en/Translation.json';

// const resources = {
//     en: { translation: en },
//     ar: { translation: ar},
// };

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        compatibilityJSON: 'v3',
        lng: I18nManager.isRTL ? 'ar' : 'en',
        fallbackLng: 'ar',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;