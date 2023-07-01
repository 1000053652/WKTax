export const getForeignAnswerData = (answerData: any) => [
  answerData.NavForeignMatters,
  answerData.ynoForeignWork,
  answerData.ynoForeignAssignment,
  answerData.ynoFamilyAllowances,
  answerData.ynoGrantorForeignTrust,
  answerData.ynoBeneficiaryRetirePlan,
  answerData.ynoForeignInvestCompany,
  answerData.ynoTransferMoney,
  answerData.ynoInvestForeignCorp,
  answerData.ynoOwnSharesMutualFund,
]
export const getForeignHeaderTitle = 'Foreign Matters'

export const questionnaireForeignData = () => {
  return {
    ynoForeignWork: '',
    ynoForeignAssignment: '',
    ynoFamilyAllowances: '',
    ynoGrantorForeignTrust: '',
    ynoBeneficiaryRetirePlan: '',
    ynoForeignInvestCompany: '',
    ynoTransferMoney: '',
    ynoInvestForeignCorp: '',
    ynoOwnSharesMutualFund: '',
    NavForeignMatters: '',
    NavForeignMattersComplete: '0',
    NavForeignMattersDescription: '',
    code: '7010',
  }
}

export const mapOtherForeignData = (data: {}, isDone: boolean) => {
  const completeData = data
  completeData['NavForeignMattersComplete'] = isDone ? '1' : '0'
  completeData['NavForeignMattersDescription'] = 'Education General Title'
  completeData['code'] = 7010
  return completeData
}
