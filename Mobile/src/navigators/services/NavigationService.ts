import { createRef } from 'react'
import {
  PartialState,
  NavigationAction,
  NavigationState,
  getStateFromPath,
  getPathFromState,
  getActionFromState,
  NavigationContainerRef,
} from '@react-navigation/native'
import { linking } from '../Linking'
import { apiServer } from '../../../src/services/Constant'

export const DeepLinkSchema = apiServer.API_BASE_URL_CLIENT_WEBSITE
export const navigationRef = createRef<NavigationContainerRef<any>>()

const cleanPathStr = (path: string) => {
  const queryVairablesIndex = path.indexOf('?')
  if (queryVairablesIndex === -1) {
    return path
  }
  return path.substr(0, queryVairablesIndex)
}

export const checkDeepLinkResult = (url: string) => {
  const extractedUrl = url.replace(DeepLinkSchema, '')
  const currentState = navigationRef.current?.getRootState() as NavigationState
  const linkState = getStateFromPath(
    extractedUrl,
    linking.config as any
  ) as PartialState<NavigationState>
  const currentPath = cleanPathStr(getPathFromState(currentState))
  const linkPath = cleanPathStr(getPathFromState(linkState))
  const action = getActionFromState(linkState) as NavigationAction
  return {
    action,
    linkPath,
    didDeepLinkLand: currentPath === linkPath,
  }
}
