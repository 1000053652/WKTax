import { t } from 'i18next'
import { store } from '../../../store'
const singleServiceListData = store.getState()?.home?.singleServiceListData

export const aList = [
  {
    type: 'RadionButton',
    title: t('questionnaire:NAVMOVING'),
    APIkey: 'NavMoving',
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
    title: t('questionnaire:YNOCHANGEADDRESS'),
    APIkey: 'ynoChangeAddress',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOTOTALMORTAGE'),
    APIkey: 'ynoTotalMortgage',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOMOVEDIFFHOME'),
    APIkey: 'ynoMoveDiffHome',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOSELLHOME'),
    APIkey: 'ynoSellHome',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOHOMEBUYDERCREDIT'),
    APIkey: 'ynoHomeBuyerCredit',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOIRAPRINCIPALRES'),
    APIkey: 'ynoIRAPrincipalRes',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOEQUITYLOAN'),
    APIkey: 'ynoEquityLoan',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },

  {
    type: 'RadionButton',
    title: t('questionnaire:YNOMORTINTPDNO1098'),
    APIkey: 'ynoMortIntPdNo1098',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },
  {
    type: 'RadionButton',
    title: t('questionnaire:YNORECMORTASSISRANCE'),
    APIkey: 'ynoRecMortAssistance',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },
  {
    type: 'RadionButton',
    title: t('questionnaire:YNOMOVINGEXPENSES'),
    APIkey: 'ynoMovingExpenses',
    placeholder: '',
    value: '',
    validation: [],
    enable: false,
    styles: [],
  },
]
