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

export const questionnaireBusiness = [
  {
    type: 'TextField',
    title: t('questionnaireBusiness:BUSINESSNAME'),
    APIkey: 'name',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'TextField',
    title: t('questionnaireBusiness:NAMECONTINUED'),
    APIkey: 'nameContinued',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'DatePicker',
    title: t('questionnaireBusiness:YEAREND'),
    APIkey: 'yearEnd',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },
  {
    type: 'NumberField',
    title: t('questionnaireBusiness:EIN'),
    APIkey: 'ein',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },
  {
    type: 'Dropdown',
    title: t('questionnaireBusiness:INCOPPORATIONSTATE'),
    APIkey: 'incorporationState',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'DatePicker',
    title: t('questionnaireBusiness:DATE'),
    APIkey: 'incorporationDate',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'TextField',
    title: t('questionnaireBusiness:PRIMARYACTIIVITY'),
    APIkey: 'primaryActivity',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },
]
