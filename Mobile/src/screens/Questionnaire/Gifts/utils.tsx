import { t } from 'i18next'
import { store } from '../../../store'
const singleServiceListData = store.getState()?.home?.singleServiceListData

export const aList = [
  {
    title: t('questionnaireBusiness:DID_YOU_MAKE_ANY_SIGNIFICANT_GIFT'),
    status: '',
    id: '1',
    isHeaderQuestion: true,
    answerKey: 'NavGifts',
  },
  {
    title:
      t('questionnaireBusiness:IN') +
      ' ' +
      singleServiceListData?.taxYear +
      ' ' +
      t('questionnaireBusiness:DID_YOU'),
    status: '',
    id: '0',
    isHeaderQuestion: false,
    answerKey: 'inDidYou',
  },
  {
    title: t('questionnaireBusiness:MAKE_ANY_GIFT_OF_DIFFUCULT'),
    status: '',
    id: '2',
    isHeaderQuestion: false,
    answerKey: 'ynoDifAssetsValue',
  },
  {
    title: t('questionnaireBusiness:CREATE_A_NEW_TRUST_OF_ANY_TYPE'),
    status: '',
    id: '3',
    isHeaderQuestion: false,
    answerKey: 'ynoNewTrust',
  },
  {
    title: t('questionnaireBusiness:HAVE_A_LIFE_INSURANCE_TRUST'),
    status: '',
    id: '4',
    isHeaderQuestion: false,
    answerKey: 'ynoLifeInsTrust',
  },
  {
    title: t('questionnaireBusiness:ASSIST_WITH_THE_PURCHASE_OF_ANY_ASSET'),
    status: '',
    id: '5',
    isHeaderQuestion: false,
    answerKey: 'ynoPurchaseAutoForInd',
  },
  {
    title: t('questionnaireBusiness:GIVE_GIFTS_TO_ANY_INDIVIDUAL'),
    subtitle: t(
      'questionnaireBusiness:GIFT_AMY_INCLUDE_BIRTHDAY_HOLIDAY_ANNIVERSARY_GRADUATION'
    ),
    status: '',
    id: '10',
    isHeaderQuestion: false,
    answerKey: 'ynoQCDFromIRA',
    switchText: t('questionnaireBusiness:REMIND_ME_TO_ATTACH_DOCUMENTATIONS'),
  },
  {
    title: t('questionnaireBusiness:FORGIVE_ANY_AMOUNT_OF_DEBT_OWED_TO_YOU'),
    status: '',
    id: '11',
    isHeaderQuestion: false,
    answerKey: 'ynoSocSec',
    switchText: t('questionnaireBusiness:REMIND_ME_TO_ATTACH_DOCUMENTATIONS'),
  },
]
