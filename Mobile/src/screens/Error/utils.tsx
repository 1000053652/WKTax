import { Alert } from 'react-native'
import { t } from 'i18next'
import { showErrorMessage } from '../Common/Utils'

enum ErrorType {
  JSONERROR = 'JSON Parse error: Unexpected token: u',
  OFFLINE = t('common:OFFLINE_MSG'),
  UNDEFINED = 'undefined',
}

export const errorMessageAlert = (error: any) => {
  Alert.alert(t('error:ERROR'), t('error:COMMON_ERROR_MESSAGE'))
}
export const errorMessageToast = (error: any) => {
  console.error('errorMessageToast11==', error)
  switch (error.message) {
    case ErrorType.JSONERROR: //ignore toast message
      break
    case ErrorType.OFFLINE: //  Offline
      showErrorMessage({ title: error.title, message: error.message })
      break
    case ErrorType.UNDEFINED:
    case undefined: //Ignore
      break
    default: //default
      if (__DEV__) {
        showErrorMessage({
          title: t('error:ERROR'),
          message: t('error:COMMON_ERROR_MESSAGE'),
        })
      }

      break
  }
}
