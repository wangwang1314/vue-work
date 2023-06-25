import { createI18n } from 'vue-i18n'

import messages from './getLangs'
const lang = window.localStorage.getItem('lang') != 'en' ? 'zh_CN' : 'en'
export default createI18n({
  legacy: false,
  locale: lang,
  messages
})
