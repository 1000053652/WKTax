import {
  getQuestionnaireBusinessTileStatusQuery,
  getBusinessHomeDataQuery,
  updateQuestionnaireBussinessQuery,
} from './query'
import {
  getQuestionnaireBusinessTileStatusResponse,
  IndividualTileResponse,
} from './responseTypes'
import { BusinessHomeQuestionnaire } from './requestTypes'
import { api } from '../../api'
import { getBankIsDoneQuery } from '../ElectronicFundsScreen/query'
import { getTileStatus } from '../../../../src/store/questionnaire'

export type CountryCodeResponse = {
  abbreviation: string
  code: number
  country: string
}

//******************************************************************** Get Home Individual Tiles API

export const getHomeIndividualTilesAPI = api.injectEndpoints({
  endpoints: builder => ({
    getQuestionnaireBusinessTileStatus: builder.query<
      getQuestionnaireBusinessTileStatusResponse,
      void
    >({
      query: () => getQuestionnaireBusinessTileStatusQuery(),
    }),

    getQuestionnaireData: builder.query<BusinessHomeQuestionnaire, object>({
      query: endpoint => getBusinessHomeDataQuery(endpoint),
    }),

    updaetFinishandDone: builder.query<IndividualTileResponse, string>({
      query: data => getBankIsDoneQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getTileStatus(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),

    updateQuestionnaireBussiness: builder.query<IndividualTileResponse, string>(
      {
        query: data => updateQuestionnaireBussinessQuery(data),
      }
    ),
  }),

  overrideExisting: true,
})

export const {
  useLazyGetQuestionnaireBusinessTileStatusQuery,
  useLazyGetQuestionnaireDataQuery,
  useLazyUpdaetFinishandDoneQuery,
  useLazyUpdateQuestionnaireBussinessQuery,
} = getHomeIndividualTilesAPI
