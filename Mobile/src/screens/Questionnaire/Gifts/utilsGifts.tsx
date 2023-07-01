import { t } from 'i18next'

export type addGiftType = {
  title: string
  status: string
  id: number
  fieldType: string
  answerKey: string
}

export const receipientTypeData = [
  { value: t('questionnaire:INDIVIDUAL'), label: 'I' },
  { value: t('questionnaire:TRUST'), label: 'T' },
]
export const receipientTypeDataForGiven = [
  { value: t('questionnaire:INDIVIDUAL'), label: 'I' },
  { value: t('questionnaire:TRUST'), label: 'T' },
  { value: t('questionnaire:OTHER'), label: 'O' },
]

export const addGift = [
  {
    title: t('questionnaire:NAME_OF_RECIPIENT_OR_TRUST'),
    status: '',
    id: 0,
    fieldType: 'TextField',
    answerKey: 'txtName',
  },
  {
    title: t('questionnaire:RECIPIENT_TYPE'),
    status: '',
    id: 1,
    fieldType: 'Dropdown',
    answerKey: 'dropdown',
  },
  {
    title: t('questionnaire:ADDRESS_OF_RECIPIENT_TYPE'),
    status: '',
    id: 2,
    fieldType: 'TextField',
    answerKey: 'txtAddress',
  },
  {
    title: t('questionnaire:RELATIONSHIP_TO_DONOR'),
    status: '',
    id: 3,
    fieldType: 'TextField',
    answerKey: 'txtRelationship',
  },
  {
    title: t('questionnaire:PURPOSE_OF_GIFT'),
    status: '',
    id: 4,
    fieldType: 'TextField',
    answerKey: 'txtGiftPurpose',
  },
  {
    title: t('questionnaire:AMOUNT_VALUE_OF_GIFT'),
    status: '',
    id: 5,
    fieldType: 'TextField',
    answerKey: 'curValue',
  },
  {
    title: t('questionnaire:DATE_OF_GIFT'),
    status: '',
    id: 6,
    fieldType: 'DateField',
    answerKey: 'datDateGift',
  },

  {
    title: t('questionnaire:NOTES'),
    status: '',
    id: 7,
    fieldType: 'TextField',
    answerKey: 'txtNotes',
  },
]

export const addForgiven = [
  {
    title: t('questionnaire:NAME_OF_RECIPIENT'),
    status: '',
    id: 0,
    fieldType: 'TextField',
    answerKey: 'txtName',
  },
  {
    title: t('questionnaire:RECIPIENT_TYPE'),
    status: '',
    id: 1,
    fieldType: 'Dropdown',
    answerKey: 'dropdown',
  },
  {
    title: t('questionnaire:ADDRESS_OF_RECIPIENT_TYPE'),
    status: '',
    id: 2,
    fieldType: 'TextField',
    answerKey: 'txtAddress',
  },
  {
    title: t('questionnaire:RELATIONSHIP_TO_DONOR'),
    status: '',
    id: 3,
    fieldType: 'TextField',
    answerKey: 'txtRelationship',
  },
  {
    title: t('questionnaire:PURPOSE'),
    status: '',
    id: 4,
    fieldType: 'TextField',
    answerKey: 'txtGiftPurpose',
  },
  {
    title: t('questionnaire:AMOUNT_OR_VALUE'),
    status: '',
    id: 5,
    fieldType: 'TextField',
    answerKey: 'curValue',
  },
  {
    title: t('questionnaire:DATE'),
    status: '',
    id: 6,
    fieldType: 'DateField',
    answerKey: 'datDateGift',
  },

  {
    title: t('questionnaire:NOTES'),
    status: '',
    id: 7,
    fieldType: 'TextField',
    answerKey: 'txtNotes',
  },
]
