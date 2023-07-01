import {
  profileUserData,
  useLogo,
  getCountryData,
  checkProfileSave,
} from '../../../store/profile'

import {
  GetCountryCodeQuery,
  GetProfileQuery,
  PutProfileQuery,
  ChangePasswordQuery,
} from './query'
import { api } from '../../api'

export type CountryCodeResponse = {
  abbreviation: string
  code: number
  country: string
}

export type LogoResponse = {
  image: string
}
export type UserProfileData = {
  id: string
  userName: string
  email: string
  firstName: string
  lastName: string
  middleName: string
  phoneNumber: {
    countryCode: string
    number: string
    extension: string
    isVerified: boolean
    countryISO2Code: string
  }
  secondaryPhoneNumber: {
    countryCode: string
    number: string
    extension: string
    isVerified: boolean
    countryISO2Code: string
  }
  twoFactorEnabled: boolean
  isActive: boolean
  isUserRegistered: boolean
}

//******************************************************************** Get Logo

export const LogoApi = api.injectEndpoints({
  endpoints: builder => ({
    //******************************************************************** Get Country Code
    countryCodeDataApi: builder.query<CountryCodeResponse, void>({
      query: () => GetCountryCodeQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          const countryLength = data.length

          const finalCountryCode = []

          for (let i = 0; i < countryLength; i++) {
            const obj = {
              label: '',
              value: '',
              abr: '',
            }
            ;(obj.label = data[i].code + ' ' + data[i].abbreviation),
              (obj.value = data[i].code),
              (obj.abr = data[i].abbreviation)

            finalCountryCode.push(obj)
          }

          dispatch(getCountryData(finalCountryCode))
        } catch (err) {}
      },
    }),

    //******************************************************************** Get Profile Data

    getProfileDataAPI: builder.query<UserProfileData, string>({
      query: () => GetProfileQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(profileUserData(data))
        } catch (err) {}
      },
    }),

    //******************************************************************** Put Profile Data

    putProfileDataAPI: builder.query<string, string>({
      query: payload => PutProfileQuery(payload),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          dispatch(checkProfileSave('ProfileSaved'))
        } catch (err) {
          dispatch(checkProfileSave('ProfileNotSaved'))
        }
      },
    }),

    //******************************************************************** Change Password Screen

    changePasswordDataAPI: builder.query<string, string>({
      query: payload => ChangePasswordQuery(payload),
    }),
  }),

  overrideExisting: true,
})

export const {
  useLazyCountryCodeDataApiQuery,
  useLazyGetProfileDataAPIQuery,
  useLazyPutProfileDataAPIQuery,
  useLazyChangePasswordDataAPIQuery,
} = LogoApi
