export const getHealthcareAnswerData = (answerData: any) => [
  answerData.NavHealthcare,
  answerData.ynoHealthCareCoverage,
  answerData.ynoMarketPlaceCoverage,
  answerData.ynoRecPremCredit,
  answerData.ynoRec1095A,
  answerData.ynoInsOtherPlan,
  answerData.ynoEmployerHealthCare,
  answerData.ynoLoseJobOwnIns,
  answerData.ynoTransHSA,
  answerData.ynoTransMSA,
  answerData.ynoLTCIns,
]
export const getHealthcareHeaderTitle = 'Healthcare'

export const questionnaireHealthcareData = () => {
  return {
    ynoHealthCareCoverage: '',
    ynoMarketPlaceCoverage: '',
    ynoRecPremCredit: '',
    ynoRec1095A: '',
    ynoInsOtherPlan: '',
    ynoEmployerHealthCare: '',
    ynoLoseJobOwnIns: '',
    ynoTransHSA: '',
    ynoTransMSA: '',
    ynoLTCIns: '',
    NavHealthcare: '',
    NavHealthcareComplete: '0',
    NavHealthcareDescription: '',
    code: '7018',
  }
}

export const mapOtherHealthcareData = (data: {}, isDone: boolean) => {
  const completeData = data
  completeData['NavHealthcareComplete'] = isDone ? '1' : '0'
  completeData['NavHealthcareDescription'] = 'Education General Title'
  completeData['code'] = 7018
  return completeData
}
