import { apiServer } from '../services/Constant'
import { Linking } from 'react-native'
import { store } from '../store'
import { LinkingOptions } from '@react-navigation/native'

const connectionsConfig = () => {
  const connections = store.getState().firmConnection.connections
  const isLogin = store.getState().auth.isLogin
  if (isLogin) {
    return {
      screens: {
        AfterLoginNavigator: {
          screens: {
            ServiceRequestList: {
              path: '/#/firm/:firmcodeFromQuery',
            },
          },
        },
      },
    }
  } else if (connections === null || connections.length === 0) {
    return {
      screens: {
        AuthNavigator: {
          screens: {
            AddFirmConnection: {
              path: '/#/firm/:firmcodeFromQuery',
            },
          },
        },
      },
    }
  } else {
    return {
      screens: {
        AuthNavigator: {
          initialRouteName: 'FirmConnections',
          screens: {
            AddFirm: {
              path: '/#/firm/:firmcodeFromQuery',
            },
          },
        },
      },
    }
  }
}
export const linking: LinkingOptions<any> = {
  prefixes: [apiServer.API_BASE_URL_CLIENT_WEBSITE],
  config: connectionsConfig(),
}
