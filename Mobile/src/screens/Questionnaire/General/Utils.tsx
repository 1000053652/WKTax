export const ownerTypeDropdownData = [
  { value: '', label: '' },
  { value: 'Taxpayer', label: 'T' },
  { value: 'Spouse', label: 'S' },
  { value: 'Joint', label: 'J' },
]
export const financialRecordsDropdownData = [
  { value: '', label: '' },
  { value: 'No current activity', label: '1' },
  { value: 'Firm has on file', label: '2' },
  { value: 'I am including it here', label: '3' },
]
export const rentalOwnerShipDetails = [
  {
    questionTitle: 'questionnaire:OWNERSHIP_PERCENTAGE',
    answer1Key: 'pctBusiness',
    answer2Key: 'pctProBusiness',
    type: 'percentage',
    maxValue: 99,
  },
  {
    questionTitle: 'questionnaire:DAYS_PROPERTY_OWN',
    answer1Key: 'numDaysOwned',
    answer2Key: 'numProDaysOwned',
    type: 'days',
    maxValue: 364,
  },
]
export const rentalVacationHomeQuestionDetails = [
  {
    questionTitle: 'questionnaire:DAYS_RENTED_MARKET_VALUE',
    answer1Key: 'numRentFMV',
    answer2Key: 'numProRentFMV',
    type: 'days',
    maxValue: 364,
  },
  {
    questionTitle: 'questionnaire:DAYS_USED_PERSONALLY',
    answer1Key: 'numPropPersonal',
    answer2Key: 'numProPropPersonal',
    type: 'days',
    maxValue: 364,
  },
  {
    questionTitle: 'questionnaire:QUALIFIED_MOR_INTEREST',
    answer1Key: 'curMortInt',
    answer2Key: 'curProMortInt',
    type: 'currency',
  },
  {
    questionTitle: 'questionnaire:VACATION_ESTATE_TAXES',
    answer1Key: 'curRETaxes',
    answer2Key: 'curProRETaxes',
    type: 'currency',
  },
]

export const dateFormat = 'MM/DD/YYYY'
