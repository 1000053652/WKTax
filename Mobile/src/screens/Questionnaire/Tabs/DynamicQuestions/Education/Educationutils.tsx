export const getEducationAnswerData = (answerData: any) => [
  answerData.NavEducation,
  answerData.ynoStudentLoan,
  answerData.ynoIRAEducationExp,
  answerData.ynoCovEducationSavingsAcct,
  answerData.ynoEnrollSchool,
  answerData.ynoEducatorExpenses,
]

export const getEducationHeaderTitle = 'Education'

export const questionnaireEducationData = () => {
  return {
    NavEducation: '1',
    ynoStudentLoan: '',
    ynoIRAEducationExp: '',
    ynoCovEducationSavingsAcct: '',
    ynoEnrollSchool: '',
    ynoEducatorExpenses: '',
  }
}

export const mapOtherEducationData = (data: {}, isDone: boolean) => {
  const completeData = data
  completeData['NavEducationComplete'] = isDone ? '1' : '0'
  completeData['code'] = 7020
  completeData['NavEducationDescription'] = 'Education General Title'
  return completeData
}
