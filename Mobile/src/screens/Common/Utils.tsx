import Toast from 'react-native-toast-message'

export type ToastMessageProps = {
  title?: string
  message?: string
  onPress?: () => void
  autoHide?: boolean
}
export const showErrorMessage = (props: ToastMessageProps) => {
  if (
    (props.title === undefined || props.title === '' || props.title === null) &&
    (props.message === undefined ||
      props.message === '' ||
      props.message === null)
  ) {
    return
  }
  Toast.show({
    type: 'toastError',
    position: 'top',
    text1: props.title,
    text2: props.message,
    autoHide: props?.autoHide,
    onPress: () => {
      Toast.hide()
      if (props.onPress) {
        props.onPress()
      }
    },
  })
}
export const showSuccessMessage = (props: ToastMessageProps) => {
  if (
    (props.title === undefined || props.title === '' || props.title === null) &&
    (props.message === undefined ||
      props.message === '' ||
      props.message === null)
  ) {
    return
  }
  Toast.show({
    type: 'toastSuccess',
    position: 'top',
    text1: props.title,
    text2: props.message,
    autoHide: props?.autoHide,
    onPress: () => {
      Toast.hide()
      if (props.onPress) {
        props.onPress()
      }
    },
  })
}
