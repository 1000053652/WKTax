import { t } from 'i18next'
import { store } from '../../../store'
const singleServiceListData = store.getState()?.home?.singleServiceListData
const year =  singleServiceListData?.taxYear ?? new Date().getFullYear()-1
type listType = {
  title: string
  status: string
  id: number
  answerKey: string
}

export const listData: listType[] = [
  {
    title: t('dependent:IS_DEPENDENT_CLAIMED'),
    status: '',
    id: 0,
    answerKey: 'ynoDepOfAnother',
  },
  {
    title: t('dependent:IS_DEPENDENT_CONSIDERED'),
    status: '',
    id: 1,
    answerKey: 'ynoDisabled',
  },
  {
    title: t('dependent:DID_DEPENDENT_EARNED')+ year,
    status: '',
    id: 2,
    answerKey: 'ynoDepIncomeLevel',
  },
  {
    title: t('dependent:DID_DEPENDENT_UNEARNED')+ year,
    status: '',
    id: 3,
    answerKey: 'ynoDepUnearnedInc',
  },
  {
    title: t('dependent:IS_DEPENDENT_US_CITIZEN'),
    status: '',
    id: 4,
    answerKey: 'ynoCitizen',
  },

  {
    title: t('dependent:HAS_DEPENDENT_VICTIM'),
    status: '',
    id: 5,
    answerKey: 'ynoIDTheft',
  },
  {
    title: t('dependent:WAS_RELEASE_CLAIM'),
    status: '',
    id: 6,
    answerKey: 'ynoClaimExpemption',
  },
  {
    title: t('dependent:DID_PAY'),
    status: '',
    id: 8,
    answerKey: 'ynoCareExp',
  },
  {
    title: t('dependent:DID_ADOPTION'),
    status: '',
    id: 8,
    answerKey: 'ynoAdoptExp',
  },
]
