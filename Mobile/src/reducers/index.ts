import { combineReducers } from '@reduxjs/toolkit'
import { api } from '../services/api'
import theme from '../store/theme'
import firmConnection from '../store/auth/firmConnection'
import auth from '../store/auth/login'
import home from '../store/home'
import TaskScreen from '../store/task'
import profile from '../store/profile'
import aboutyou from '../store/aboutyou'
import questionnaire from '../store/questionnaire'
import taxableEvent from '../store/taxableEvent'
import assetsEvent from '../store/Assets'
import business from '../store/business'
import homeOffice from '../store/questionnaire/homeOffice'
import taxpayment from '../store/questionnaire/taxpayment'
import vehiclesEvent from '../store/Vehicles'
import electronicFunds from '../store/ElectronicFunds'
import businessEntity from '../store/BusinessEntity'
import businessAssets from '../store/AssetsBusiness'
const reducers = combineReducers({
  theme,
  firmConnection,
  auth,
  home,
  TaskScreen,
  profile,
  aboutyou,
  business,
  questionnaire,
  taxableEvent,
  assetsEvent,
  homeOffice,
  vehiclesEvent,
  taxpayment,
  electronicFunds,
  businessEntity,
  businessAssets,
  [api.reducerPath]: api.reducer,
})

export default reducers
