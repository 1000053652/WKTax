import { t } from 'i18next'
export type listType = {
  answerType:string
questionText: string
status: string
order: number
isHeaderQuestion: boolean
answerKey: string
severStatus: string
}

export const listData: listType[] = [
  {
    answerType: 'Yes/No',
    questionText: t('taxable:NavInvestments'),
    status: '',
    order: 1,
    isHeaderQuestion: true,
    answerKey: 'NavInvestments',
    severStatus:'',
  },
  {
    answerType: 'Yes/No',
    questionText: t('taxable:NavBusiness'),
    status: '',
    order: 2,
    isHeaderQuestion: false,
    answerKey: 'NavBusiness',
    severStatus:'',
  },
  {
    answerType: 'Yes/No',
    questionText: t('taxable:NavDeductions'),
    status: '',
    order: 3,
    isHeaderQuestion: false,
    answerKey: 'NavDeductions',
    severStatus:'',
  },
  {
    answerType: 'Yes/No',
    questionText: t('taxable:NavEducation'),
    status: '',
    order: 4,
    isHeaderQuestion: false,
    answerKey: 'NavEducation',
    severStatus:'',
  },
  {
    answerType: 'Yes/No',
    questionText: t('taxable:NavRetirement'),
    status: '',
    order: 5,
    isHeaderQuestion: false,
    answerKey: 'NavRetirement',
    severStatus:'',
  },

  {
    answerType: 'Yes/No',
    questionText: t('taxable:NavHealthcare'),
    status: '',
    order: 6,
    isHeaderQuestion: false,
    answerKey: 'NavHealthcare',
    severStatus:'',
  },
  {
    answerType: 'Yes/No',
    questionText: t('taxable:NavTaxpayment'),
    status: '',
    order: 7,
    isHeaderQuestion: false,
    answerKey: 'NavTaxpayment',
    severStatus:'',
  },

  {
    answerType: 'Yes/No',
    questionText: t('taxable:NavGifts'),
    status: '',
    order: 8,
    isHeaderQuestion: false,
    answerKey: 'NavGifts',
    severStatus:'',
  },
  {
    answerType: 'Yes/No',
    questionText: t('taxable:NavForeignMatters'),
    status: '',
    order: 9,
    isHeaderQuestion: false,
    answerKey: 'NavForeignMatters',
    severStatus:'',
  },
  {
    answerType: 'Yes/No',
    questionText: t('taxable:NavMoving'),
    status: '',
    order: 10,
    isHeaderQuestion: false,
    answerKey: 'NavMoving',
    severStatus:'',
  },
  {
    answerType: 'Yes/No',
    questionText: t('taxable:NavMiscellaneous'),
    status: '',
    order: 11,
    isHeaderQuestion: false,
    answerKey: 'NavMiscellaneous',
    severStatus:'',
  },
]
