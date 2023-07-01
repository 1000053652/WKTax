import {
  addTokenData,
  setIsLogin,
  setLastAppStateDt,
} from '../../../src/store/auth/login'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, AppState, AppStateStatus } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyGetRefereshTokenApiQuery } from '../../../src/services/modules/auth'
import { GetTokenRequest } from '../../../src/services/modules/auth/requestTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useInActivityHook = () => {
  const isLogin = useSelector(state => state?.auth?.isLogin)
  const timerId = useRef()
  const timerRefresh = useRef()
  const appState = useRef(AppState.currentState)
  const session = useSelector(state => state?.auth?.session)
  const [getRefereshTokenApi] = useLazyGetRefereshTokenApiQuery()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const timeForInactivityInSecond = 1200
  const checkMinTimeForRefresh = 16
  const checkHoursTimeForRefresh = 24
  useEffect(() => {
    resetInactivityTimeout()
  }, [session])

  const timeForRefershToken = 900

  const AuthorizationValue = useSelector(
    state => 'Bearer ' + state?.auth?.authData?.authorizationToken
  )
  const AuthToken: string = useSelector(
    state => state?.auth?.authData?.authToken as string
  )
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        isLogin
      ) {
        checkTimeout(nextAppState)
      } else if (nextAppState === 'active' && isLogin) {
        checkTimeout(nextAppState)
        refreshAPI()
        callRefreshAPi()
      }
      appState.current = nextAppState
    })
    refreshAPI()
    return () => {
      subscription.remove()
    }
  }, [])
  const callRefreshAPi = () => {
    if (isLogin) {
      const request: GetTokenRequest = {
        authToken: AuthToken,
        authCode: AuthorizationValue,
      }
      getRefereshTokenApi(request, false)
        .unwrap()
        .then(payload => {
          dispatch(setLastAppStateDt(`${new Date()}`))
          dispatch(addTokenData(payload))
          const _storeData = async () => {
            try {
              await AsyncStorage.setItem(
                'lastSessiondt',
                `${new Date()}`,
                err => {
                  console.error('error storing data', err)
                }
              )
            } catch (error) {
              console.error('error storing data', error)
            }
          }

          _storeData()

          refreshAPI()
        })
        .catch(error => {})
    }
  }

  const checkTimeout = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active' && isLogin) {
      const _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('lastSessiondt')
          if (value !== null) {
            const date: Date = new Date(value)
            const diffMin = diff_minutes(date, new Date())
            const diffHours = diff_hour(date, new Date())
            if (
              diffMin > checkMinTimeForRefresh ||
              diffHours > checkHoursTimeForRefresh
            ) {
              showInactivityPopUp()
            }
          }
        } catch (error) {
          console.error('error retrieving data', error)
        }
      }
      _retrieveData()
    }
  }

  const diff_minutes = (dt2: Date, dt1: Date) => {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000
    diff /= 60
    return Math.abs(Math.round(diff))
  }
  const diff_hour = (dt2: Date, dt1: Date) => {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000
    diff /= 60 * 60
    return Math.abs(Math.round(diff))
  }

  const refreshAPI = () => {
    clearTimeout(timerRefresh.current)
    if (isLogin) {
      timerRefresh.current = setTimeout(() => {
        callRefreshAPi()
      }, timeForRefershToken * 1000)
    }
  }
  const resetInactivityTimeout = () => {
    clearTimeout(timerId.current)

    if (isLogin) {
      timerId.current = setTimeout(() => {
        // action after user has been detected idle
        showInactivityPopUp()
      }, timeForInactivityInSecond * 1000)
    }
  }

  const showInactivityPopUp = () => {
    Alert.alert('', t('common:SESSION_EXPIRE'), [
      {
        text: t('common:OK'),
        onPress: () => {
          dispatch(setIsLogin(false))
        },
        style: 'default',
      },
    ])
  }

  return { showInactivityPopUp }
}
