import loaderStyle from '../../../screens/Common/LoaderStyle'
import React from 'react'
import SpinnerOverlay from 'react-native-loading-spinner-overlay/lib'
import { t } from 'i18next'
import { TextStyle } from 'react-native'
import checkConnection from '../CheckConnection/CheckConnection'
import { errorMessageToast } from '../../../screens/Error/utils'

interface loaderProps {
  visible?: boolean
  textContent?: string
  textStyle?: TextStyle
  size?: 'small' | 'large' | number
}

export const Spinner = (props: loaderProps) => {
  let isLoading: boolean | undefined = props.visible ?? defaultValue.visible
  if (!checkConnection()) {
    isLoading = false
    errorMessageToast({ title: '', message: t('common:OFFLINE_MSG') })
  }
  return (
    <SpinnerOverlay
      visible={isLoading}
      textContent={props.textContent ?? defaultValue.textContent}
      size={props.size ?? defaultValue.size}
      textStyle={props.textStyle ?? defaultValue.textStyle}
    />
  )
}

const defaultValue: Partial<loaderProps> = {
  visible: false,
  textContent: t('common:LOADING'),
  textStyle: loaderStyle.spinnerTextStyle,
  size: 'large',
}
