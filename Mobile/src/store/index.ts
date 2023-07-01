import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Storage,
} from 'redux-persist'

import { MMKV } from 'react-native-mmkv'
import Reactotron from '../config/reactotron'
import reducers from '../reducers'
import { api } from '../services/api'
const storage = new MMKV()

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value)

    return Promise.resolve(true)
  },

  getItem: key => {
    const value = storage.getString(key)

    return Promise.resolve(value)
  },

  removeItem: key => {
    storage.delete(key)

    return Promise.resolve()
  },
}

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const enhancers = []

if (__DEV__ && !process.env.JEST_WORKER_ID)
  enhancers.push(Reactotron.createEnhancer())

const store = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware)

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default

      middlewares.push(createDebugger())
    }

    return middlewares
  },

  enhancers: [],

  devTools: true,
})

const persistor = persistStore(store)
setupListeners(store.dispatch)
export { store, persistor }
