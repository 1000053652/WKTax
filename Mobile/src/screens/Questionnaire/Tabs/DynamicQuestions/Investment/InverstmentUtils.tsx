export const getInverstmentAnswerData = (answerData: any) => [
  answerData.NavInvestments,
  answerData.ynoRecIntDiv,
  answerData.ynoDebts,
  answerData.ynoNewPartnership,
  answerData.ynoSellFarm,
  answerData.ynoSellRE,
  answerData.ynoStockOptions,
  answerData.ynoPutCall,
  answerData.ynoSellSec,
  answerData.ynoSellBitCoin,
]
export const getInverstmentHeaderTitle = 'Investments'

export const questionnaireInverstmentData = () => {
  return {
    ynoDebts: '',
    ynoNewFarm: '',
    ynoNewRental: '',
    ynoNewPartnership: '',
    ynoSellRE: '',
    ynoStockOptions: '',
    ynoPutCall: '',
    ynoSellSec: '',
    ynoRecIntDiv: '',
    ynoSellFarm: '',
    ynoSellBitCoin: '',
    NavInvestments: '',
    NavInvestmentsComplete: '0',
    NavInvestmentsDescription: '',
    code: '7011',
  }
}

export const mapOtherInverstmentData = (data: {}, isDone: boolean) => {
  const completeData = data
  completeData['NavInvestmentsComplete'] = isDone ? '1' : '0'
  completeData['NavInvestmentsDescription'] = 'Education General Title'
  completeData['code'] = 7011
  return completeData
}
