import { deductionandCreditsData } from './DeductionandCredits/DeductionandCreditsData'
import { investment } from './Investment/InvestmentData'
import { foreign } from './Foreign/ForeignData'
import { healthcare } from './Healthcare/HealthcareData'
import { education } from './Education/EducationData'

import {
  getDeductionsHeaderTitle,
  getDeductionAnswerData,
  questionnaireDeductionsData,
  mapOtherDeductionsData,
} from './DeductionandCredits/DeductionandCreditsUtils'
import {
  getForeignAnswerData,
  getForeignHeaderTitle,
  mapOtherForeignData,
  questionnaireForeignData,
} from './Foreign/ForeignUtils'
import {
  getHealthcareAnswerData,
  getHealthcareHeaderTitle,
  mapOtherHealthcareData,
  questionnaireHealthcareData,
} from './Healthcare/HealthcareUtils'
import {
  getEducationAnswerData,
  getEducationHeaderTitle,
  mapOtherEducationData,
  questionnaireEducationData,
} from './Education/Educationutils'
import {
  getInverstmentAnswerData,
  getInverstmentHeaderTitle,
  mapOtherInverstmentData,
  questionnaireInverstmentData,
} from './Investment/InverstmentUtils'

export const getAnswerData = (pageCode: number, answerData: any) => {
  switch (pageCode) {
    case 7009:
      return getDeductionAnswerData(answerData)
    case 7010:
      return getForeignAnswerData(answerData)
    case 7011:
      return getInverstmentAnswerData(answerData)
    case 7018:
      return getHealthcareAnswerData(answerData)
    case 7020:
      return getEducationAnswerData(answerData)
  }
}
export const getHeaderTitle = (pageCode: number) => {
  switch (pageCode) {
    case 7009:
      return getDeductionsHeaderTitle
    case 7010:
      return getForeignHeaderTitle
    case 7011:
      return getInverstmentHeaderTitle
    case 7018:
      return getHealthcareHeaderTitle
    case 7020:
      return getEducationHeaderTitle
  }
}
export const questionnaireData: {} = (pageCode: number) => {
  switch (pageCode) {
    case 7009:
      return questionnaireDeductionsData()
    case 7010:
      return questionnaireForeignData()
    case 7011:
      return questionnaireInverstmentData()
    case 7018:
      return questionnaireHealthcareData()
    case 7020:
      return questionnaireEducationData()
  }
}
export const listData = (pageCode: number) => {
  switch (pageCode) {
    case 7009:
      return deductionandCreditsData
    case 7010:
      return foreign
    case 7011:
      return investment
    case 7018:
      return healthcare
    case 7020:
      return education
  }
}

export const mapOtherData = (pageCode: number, data: {}, isDone: boolean) => {
  switch (pageCode) {
    case 7009:
      return mapOtherDeductionsData(data, isDone)
    case 7010:
      return mapOtherForeignData(data, isDone)
    case 7011:
      return mapOtherInverstmentData(data, isDone)
    case 7018:
      return mapOtherHealthcareData(data, isDone)
    case 7020:
      return mapOtherEducationData(data, isDone)
  }
  return data
}
