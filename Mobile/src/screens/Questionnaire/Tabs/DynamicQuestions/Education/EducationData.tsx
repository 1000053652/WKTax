import { questionListType } from '../../utils'
import { t } from 'i18next'

export const education: questionListType[] = [
  {
    type: 'segment',
    title: t('dynamicquestions:NAVEDUCATION'),
    APIkey: 'NavEducation',
    id: 0,
    enable: false,
    value: '',
    isHeaderQuestion: false,
  },
  {
    headerTitle:
      t('dynamicquestions:IN') + ' ${YEAR} ' + t('dynamicquestions:DID_YOU'),
    type: 'segment',
    title: t('dynamicquestions:YNOSTUDENTLOAN'),
    APIkey: 'ynoStudentLoan',
    id: 1,
    enable: true,
    value: '',
    isHeaderQuestion: true,
  },
  {
    type: 'segment',
    title: t('dynamicquestions:YNOIRAEDUCATIONEXP'),
    APIkey: 'ynoIRAEducationExp',
    id: 2,
    enable: true,
    value: '',
    isHeaderQuestion: false,
  },
  {
    type: 'segment',
    title: t('dynamicquestions:YNOCOVEDUCATIONSAVINGSACCT'),
    APIkey: 'ynoCovEducationSavingsAcct',
    id: 3,
    enable: true,
    value: '',
    isHeaderQuestion: false,
  },
  {
    type: 'segment',
    title: t('dynamicquestions:YNOENROLLSCHOOL'),
    APIkey: 'ynoEnrollSchool',
    id: 4,
    enable: true,
    value: '',
    isHeaderQuestion: false,
  },
  {
    type: 'segment',
    title: t('dynamicquestions:YNOEDUCATOREXPENSES'),
    APIkey: 'ynoEducatorExpenses',
    id: 5,
    enable: true,
    value: '',
    isHeaderQuestion: false,
  },
]
