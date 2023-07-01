import { t } from 'i18next'

export type questionnaireBusinessType = {
  type: string
  title: string
  APIkey: string
  placeholder: string
  value: string
  validation: []
  enable: boolean
  styles: []
}

export const questionnaireAddressData = [
  {
    type: 'TextField',
    title: t('questionnaireBusiness:STREET'),
    APIkey: 'street',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'TextField',
    title: t('questionnaireBusiness:CITY_S'),
    APIkey: 'city',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'Dropdown',
    title: t('questionnaireBusiness:STATE_S'),
    APIkey: 'state',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'TextField',
    title: t('questionnaireBusiness:ZIP_CODE'),
    APIkey: 'zipCode',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'TextField',
    title: t('questionnaireBusiness:FORGIVEN_PROVINCE_STATE_COUNTRY'),
    APIkey: 'foreignProvince',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'TextField',
    title: t('questionnaireBusiness:FORGIVEN_COUNTRY'),
    APIkey: 'foreignCountry',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'TextField',
    title: t('questionnaireBusiness:FOREIGN_POSTAL_CODE'),
    APIkey: 'foreignPostalCode',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },
]
