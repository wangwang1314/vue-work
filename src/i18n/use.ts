// import { useI18n } from 'vue-i18n'
// // 国际化实例
// const { t } = useI18n()
import i18n from '@/i18n'
const { t } = i18n.global
const $t = (text: string) => {
  if (!text) {
    return ''
  }
  return t(`index.${text}`)
}
export default $t
