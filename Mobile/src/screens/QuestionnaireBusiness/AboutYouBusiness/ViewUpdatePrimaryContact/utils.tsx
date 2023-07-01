import { t } from 'i18next'

export type questionnairePrimayContactType = {
  type: string
  title: string
  APIkey: string
  placeholder: string
  value: string
  validation: []
  enable: boolean
  styles: []
}

export const questionnairePrimaryContactData = [
  {
    type: 'TextField',
    title: t('questionnaireBusiness:FIRSTNAME'),
    APIkey: 'firstName',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'TextField',
    title: t('questionnaireBusiness:LASTNAME'),
    APIkey: 'lastName',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'TextField',
    title: t('questionnaireBusiness:TITLE'),
    APIkey: 'title',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },
  {
    type: 'TextField',
    title: t('questionnaireBusiness:EMAILADDRESS'),
    APIkey: 'email',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },
  {
    type: 'TextField',
    title: t('questionnaireBusiness:BUSINESSPHONE'),
    APIkey: 'phone',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'TextField',
    title: t('questionnaireBusiness:MOBILEPHONE'),
    APIkey: 'mobile',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadioButton',
    title: t('questionnaireBusiness:BUSINESSPHONE'),
    APIkey: 'phonePreferred',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadioButton',
    title: t('questionnaireBusiness:MOBILEPHONE'),
    APIkey: 'mobilePreferred',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },
]
