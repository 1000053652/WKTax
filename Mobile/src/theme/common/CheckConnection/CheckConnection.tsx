import { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import { errorMessageToast } from '../../../screens/Error/utils'
import { t } from 'i18next'
let currentNetwork: boolean | null
NetInfo.fetch().then(state => {
  currentNetwork = state.isConnected
})

const CheckConnection = () => {
  const [netInfo, setNetInfo] = useState(currentNetwork)
  let unsubscribe: any
  useEffect(() => {
    unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state.isConnected)
    })
  }, [])

  if (!netInfo) {
    //show network error message
    errorMessageToast({ title: '', message: t('common:OFFLINE_MSG') })
  }

  return netInfo
}

export default CheckConnection
