import {
  getDisplayDependent,
  getIndividualTiles,
  getDetailedDependent,
} from '../../../store/questionnaire'

import {
  getHomeIndividualTilesQuery,
  getDependentDisplayQuery,
  getDetailsDependentDisplayQuery,
  addDependentPageIntityQuery,
  addDependentPageIntityDetailsQuery,
  editDependentPageIntityQuery,
  finishLaterDoneQuery,
  deleteDependentquery,
  getNavDetailsQuery,
  addPageEntityQuery,
  editPageEntityQuery,
  addGridAPIQuery,
  getGridAPIQuery,
  getDRLListQuery,
  getDRLCategoriesQuery,
  getAttachmentListQuery,
  updateDRLItemStatusQuery,
  validateDocQuery,
  attachDocQuery,
  isfirstloginQuery,
  deletDRLAttachmentQuery,
  deletDRLUnCategorizedAttachmentQuery,
  getDRLAttachmentDownloadDetailsQuery,
  getDRLUnCategorizedAttachmentDownloadDetailsQuery,
  getQuestionnaireBusinessTileStatusQuery,
  getBusinessHomeDataQuery,
} from './query'
import {
  BusinessGeneralData,
  BusinessGeneralResponse,
  DRLAttachmentDownloadDetailsResponse,
  DRLAttachmentsResponse,
  DRLCategoriesResponse,
  DRLListResponse,
  DRLValidateDocResponse,
  IndividualTileResponse,
  getQuestionnaireBusinessTileStatusResponse,
} from './responseTypes'
import { DetailPageRequest, IndividualTileRequest } from './requestType'
import {
  DRLAttachDocRequest,
  DRLAttachmentDeleteRequest,
  DRLDownloadAttachmentRequest,
  DRLValidateDocRequest,
  BusinessHomeQuestionnaire,
} from './requestTypes'
import { api } from '../../api'

export type CountryCodeResponse = {
  abbreviation: string
  code: number
  country: string
}

//******************************************************************** Get Home Individual Tiles API

export const getHomeIndividualTilesAPI = api.injectEndpoints({
  endpoints: builder => ({
    getHomeIndividualTilesData: builder.query<IndividualTileResponse, string>({
      query: () => getHomeIndividualTilesQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          dispatch(getIndividualTiles(data))
        } catch (err) {}
      },
    }),

    getDependentDisplayData: builder.query<IndividualTileResponse, void>({
      query: () => getDependentDisplayQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          dispatch(getDisplayDependent(data))
        } catch (err) {}
      },
    }),

    getDetailedDependentDisplayData: builder.query<
      IndividualTileResponse,
      string
    >({
      query: fullURL => getDetailsDependentDisplayQuery(fullURL),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getDetailedDependent(data))
        } catch (err) {}
      },
    }),

    addDependentPageIntity: builder.query<IndividualTileResponse, string>({
      query: fullURL => addDependentPageIntityQuery(fullURL),
    }),

    addDetailsDependentPageIntity: builder.query<
      IndividualTileResponse,
      string
    >({
      query: fullURL => addDependentPageIntityDetailsQuery(fullURL),
    }),

    editDependentPageIntityAPI: builder.query<IndividualTileResponse, string>({
      query: payload => editDependentPageIntityQuery(payload),
    }),

    finishLaterDoneAPI: builder.query<IndividualTileResponse, string>({
      query: payload => finishLaterDoneQuery(payload),
    }),

    deleteDependentAPICall: builder.query<IndividualTileResponse, string>({
      query: payload => deleteDependentquery(payload),
    }),
    getNavDetailsQuery: builder.query<
      BusinessGeneralResponse,
      DetailPageRequest<null>
    >({
      query: request => getNavDetailsQuery(request),
    }),
    addPageEntityQuery: builder.query<
      BusinessGeneralResponse,
      DetailPageRequest<unknown>
    >({
      query: request => addPageEntityQuery(request),
    }),
    editPageEntityQuery: builder.query<
      BusinessGeneralResponse,
      DetailPageRequest<unknown>
    >({
      query: request => editPageEntityQuery(request),
    }),

    addGridAPICall: builder.query<IndividualTileResponse, string>({
      query: payload => addGridAPIQuery(payload),
    }),
    getGridAPICall: builder.query<
      IndividualTileResponse,
      IndividualTileRequest
    >({
      query: payload => getGridAPIQuery(payload),
    }),
    isfirstloginQuery: builder.query<boolean, string>({
      query: () => isfirstloginQuery(),
    }),
    getDRLCategoriesList: builder.query<[DRLCategoriesResponse], void>({
      query: () => getDRLCategoriesQuery(),
    }),
    getDRLRequestList: builder.query<[DRLListResponse], void>({
      query: () => getDRLListQuery(),
    }),
    getDRLAttachmentList: builder.query<[DRLAttachmentsResponse], number>({
      query: id => getAttachmentListQuery(id),
    }),
    updateDRLItemStatus: builder.query<DRLListResponse, DRLListResponse>({
      query: request => updateDRLItemStatusQuery(request),
    }),
    validateDocument: builder.query<
      DRLValidateDocResponse,
      DRLValidateDocRequest
    >({
      query: request => validateDocQuery(request),
    }),
    attachDocument: builder.query<DRLListResponse, DRLAttachDocRequest>({
      query: request => attachDocQuery(request),
    }),
    deletDRLAttachment: builder.query<string, DRLAttachmentDeleteRequest>({
      query: request => deletDRLAttachmentQuery(request),
    }),
    deletDRLUnCategorizedAttachment: builder.query<string, number>({
      query: request => deletDRLUnCategorizedAttachmentQuery(request),
    }),
    getDRLAttachmentDownloadDetails: builder.query<
      DRLAttachmentDownloadDetailsResponse,
      DRLDownloadAttachmentRequest
    >({
      query: request => getDRLAttachmentDownloadDetailsQuery(request),
    }),
    getDRLUnCategorizedAttachmentDownloadDetails: builder.query<
      DRLAttachmentDownloadDetailsResponse,
      DRLDownloadAttachmentRequest
    >({
      query: request =>
        getDRLUnCategorizedAttachmentDownloadDetailsQuery(request),
    }),

    getQuestionnaireBusinessTileStatus: builder.query<
      getQuestionnaireBusinessTileStatusResponse,
      void
    >({
      query: () => getQuestionnaireBusinessTileStatusQuery(),
    }),

    getQuestionnaireData: builder.query<BusinessHomeQuestionnaire, object>({
      query: endpoint => getBusinessHomeDataQuery(endpoint),
    }),
  }),

  overrideExisting: true,
})

export const {
  useLazyGetHomeIndividualTilesDataQuery,
  useLazyGetDependentDisplayDataQuery,
  useLazyGetDetailedDependentDisplayDataQuery,
  useLazyAddDependentPageIntityQuery,
  useLazyAddDetailsDependentPageIntityQuery,
  useLazyEditDependentPageIntityAPIQuery,
  useLazyFinishLaterDoneAPIQuery,
  useLazyDeleteDependentAPICallQuery,
  useLazyGetNavDetailsQueryQuery,
  useLazyAddPageEntityQueryQuery,
  useLazyEditPageEntityQueryQuery,
  useLazyGetGridAPICallQuery,
  useLazyAddGridAPICallQuery,
  useLazyIsfirstloginQueryQuery,
  useLazyGetDRLCategoriesListQuery,
  useLazyGetDRLRequestListQuery,
  useLazyGetDRLAttachmentListQuery,
  useLazyUpdateDRLItemStatusQuery,
  useLazyValidateDocumentQuery,
  useLazyAttachDocumentQuery,
  useLazyDeletDRLAttachmentQuery,
  useLazyDeletDRLUnCategorizedAttachmentQuery,
  useLazyGetDRLAttachmentDownloadDetailsQuery,
  useLazyGetDRLUnCategorizedAttachmentDownloadDetailsQuery,
  useLazyGetQuestionnaireBusinessTileStatusQuery,
  useLazyGetQuestionnaireDataQuery,
} = getHomeIndividualTilesAPI
