export const getDeductionAnswerData = (answerData: any) => [
  answerData.NavDeductions,
  answerData.ynoMedDental,
  answerData.ynoRETaxes,
  answerData.ynoPPTaxes,
  answerData.ynoMortgageInt,
  answerData.ynoCharitableCont,
  answerData.ynoContributeProp,
  answerData.ynoInvetInEnergyImprmts,
  answerData.ynoCasualtyLoss,
  answerData.ynoSpecialFuels,
]
export const getDeductionsHeaderTitle = 'Deductions & Credits'

export const questionnaireDeductionsData = () => {
  return {
    ynoMedDental: '',
    ynoRETaxes: '',
    ynoPPTaxes: '',
    ynoMortgageInt: '',
    ynoCharitableCont: '',
    ynoContributeProp: '',
    ynoInvetInEnergyImprmts: '',
    ynoCasualtyLoss: '',
    ynoSpecialFuels: '',
    NavDeductions: '',
    NavDeductionsComplete: '0',
    NavDeductionsDescription: '',
    code: '7009',
  }
}

export const mapOtherDeductionsData = (data: {}, isDone: boolean) => {
  const completeData = data
  completeData['NavDeductionsComplete'] = isDone ? '1' : '0'
  completeData['NavDeductionsDescription'] = 'Education General Title'
  completeData['code'] = 7009
  return completeData
}
