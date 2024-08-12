import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import uz from './lang/uz.json'
import { themeConfig } from 'configs/theme.config'

const resources = {
    uz: {
        translation: uz
    },
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: themeConfig.locale,
    lng: themeConfig.locale,
    interpolation: {
        escapeValue: false
    }
})

export const dateLocales = {
    uz: () => import('dayjs/locale/uz'),
}

export default i18n