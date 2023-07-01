import { t } from 'i18next'
import { store } from '../../../store'
const singleServiceListData = store.getState()?.home?.singleServiceListData

export const aList = [
  {
    type: 'RadionButton',
    title: t('questionnaire:NAVMISCELLANEOUS'),
    APIkey: 'NavMiscellaneous',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },
  {
    type: 'RadionButton',
    title:
      t('questionnaireBusiness:IN') +
      ' ' +
      singleServiceListData?.taxYear +
      ' ' +
      t('questionnaireBusiness:DID_YOU'),
    APIkey: 'IN_DID_YOU',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOSTATETAXREFUND'),
    APIkey: 'ynoStateTaxRefund',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNO1099G'),
    APIkey: 'yno1099G',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNONEWJOB'),
    APIkey: 'ynoNewJob',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOTIPINCOME'),
    APIkey: 'ynoTipIncome',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNODAMAGEAWARD'),
    APIkey: 'ynoDamageAward',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOBARTERING'),
    APIkey: 'ynoBartering',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOMINISTERINGINCOME'),
    APIkey: 'ynoMinisterialIncome',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOALIMONY'),
    APIkey: 'ynoAlimony',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOGAMBLING'),
    APIkey: 'ynoGambling',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },
  {
    type: 'RadionButton',
    title: t('questionnaire:YNOINTERNETPURCHASES'),
    APIkey: 'ynoInternetPurchases',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOHHEMPLOYEES'),
    APIkey: 'ynoHHEmployees',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOPRETURNCHANGES'),
    APIkey: 'ynoPYReturnChanges',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOSPLITDOLLARLIFEINS'),
    APIkey: 'ynoSplitDollarLifeIns',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOTRUSTEE'),
    APIkey: 'ynoTrustee',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOTRUSTEEDIED'),
    APIkey: 'ynoTrusteeDied',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOTAXSHELTER'),
    APIkey: 'ynoTaxShelter',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOLOANFORGIVENESS'),
    APIkey: 'ynoloanForgiveness',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },
]
