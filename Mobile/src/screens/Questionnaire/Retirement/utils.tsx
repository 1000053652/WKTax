import { questionListType } from '../Tabs/utils'
import { t } from 'i18next'
import { formatCurrency } from '../../../theme/common/TextInput/utils'
export const listData: questionListType[] = [
  {
    type: 'segment',
    title: t('retirement:NAVRETIREMENT'),
    APIkey: 'NavRetirement',
    id: 0,
    enable: false,
    value: '',
    children: false,
    isHeaderQuestion: false,
  },
  {
    headerTitle:
      t('dynamicquestions:IN') +
      ' ${YEAR} ' +
      t('dynamicquestions:DID_YOU') +
      '...',
    type: 'segment',
    title: t('retirement:YNOCONTIRAACCT'),
    APIkey: 'ynoContIRAAcct',
    id: 1,
    enable: true,
    value: '',
    children: true,
    isHeaderQuestion: true,
  },
  {
    type: 'segment',
    title: t('retirement:YNOROLLOVER'),
    APIkey: 'ynoRollOver',
    id: 2,
    enable: true,
    value: '',
    children: false,
    isHeaderQuestion: false,
  },
  {
    type: 'segment',
    title: t('retirement:YNONEWDISTRIBUTION'),
    APIkey: 'ynoNewDistribution',
    id: 3,
    enable: true,
    value: '',
    children: false,
    isHeaderQuestion: false,
  },
  {
    type: 'segment',
    title: t('retirement:YNOTURNMDAGE'),
    APIkey: 'ynoTurnMDAge',
    id: 4,
    enable: true,
    value: '',
    children: false,
    isHeaderQuestion: false,
  },
  {
    type: 'segment',
    title: t('retirement:YNOQCDFROMIRA'),
    APIkey: 'ynoQCDFromIRA',
    id: 5,
    enable: true,
    value: '',
    children: false,
    isHeaderQuestion: false,
  },
  {
    type: 'segment',
    title: t('retirement:YNOSOCSEC'),
    APIkey: 'ynoSocSec',
    id: 6,
    enable: true,
    value: '',
    children: false,
    isHeaderQuestion: false,
  },
  {
    type: 'segment',
    title: t('retirement:YNORETIRE'),
    APIkey: 'ynoRetire',
    id: 7,
    enable: true,
    value: '',
    children: false,
    isHeaderQuestion: false,
  },
  {
    type: 'segment',
    title: t('retirement:YNORECEIVECOMP'),
    APIkey: 'ynoReceiveComp',
    id: 8,
    enable: true,
    value: '',
    children: false,
    isHeaderQuestion: false,
  },
]

export type reponseDataType = {
  ynoContIRAAcct: 'Y'
  curRothAmtTP: ''
  curRothAmtSP: ''
  curTradIRATP: ''
  curTradIRASP: ''
  ynoRollOver: ''
  ynoNewDistribution: ''
  ynoTurnMDAge: ''
  ynoRetire: ''
  ynoReceiveComp: ''
  ynoSocSec: ''
  ynoQCDFromIRA: ''
  NavRetirement: '1'
  NavRetirementComplete: '0'
  NavRetirementDescription: ''
  code: '7007'
}

export const getAnswerData = (answerData: any) => [
  answerData.NavRetirement,
  answerData.ynoContIRAAcct,
  answerData.ynoRollOver,
  answerData.ynoNewDistribution,
  answerData.ynoTurnMDAge,
  answerData.ynoRetire,
  answerData.ynoReceiveComp,
  answerData.ynoSocSec,
  answerData.ynoQCDFromIRA,
  answerData.NavRetirementComplete,
  answerData.NavRetirementDescription,
]

export const questionnaireData = () => {
  return {
    ynoContIRAAcct: 'Y',
    curRothAmtTP: '0.0000',
    curRothAmtSP: '0.0000',
    curTradIRATP: '0.0000',
    curTradIRASP: '0.0000',
    ynoRollOver: '',
    ynoNewDistribution: '',
    ynoTurnMDAge: '',
    ynoRetire: '',
    ynoReceiveComp: '',
    ynoSocSec: '',
    ynoQCDFromIRA: '',
    NavRetirement: '1',
    NavRetirementComplete: '0',
    NavRetirementDescription: '',
  }
}

export const mapOtherData = (data: {}, isDone: boolean, formData: any) => {
  const completeData = data
  completeData['curRothAmtTP'] = formData?.curRothAmtTP
  completeData['curRothAmtSP'] = formData?.curRothAmtSP
  completeData['curTradIRATP'] = formData?.curTradIRATP
  completeData['curTradIRASP'] = formData?.curTradIRASP
  completeData['NavRetirementComplete'] = isDone ? '1' : '0'
  completeData['NavRetirementDescription'] = 'Retirement General Tile'
  completeData['code'] = '7007'
  return completeData
}

export const removeZeroAfterDecimal = (
  value: string,
  isRemoveData = false,
  fieldType = 'currency'
) => {
  if (value && value.length > 0 && !isRemoveData) {
    if (fieldType) {
      return formatCurrency(`${parseInt(value)}`, true)
    }
    return `${parseInt(value)}`
  }
  return ''
}

export  const getValueFromAPIKey = (listdata, apikey:string)=>
{
  return listdata[apikey]
}