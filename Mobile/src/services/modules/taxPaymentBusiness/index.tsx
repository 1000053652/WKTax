import {
  TaxPaymentHomeStatus,
  TaxPaymentBusinessItemDetails,
  TaxPaymentBusinessItemsList,
  TaxPayerBusinessHomeData,
} from '../../../../src/store/questionnaire/taxpayment/types'
import {
  deleteBusinessList,
  getBusinessHomeDataQuery,
  getTaxPaymentBusinessitemListQuery,
  postTaxPaymentBusinessItemQuery,
  putTaxPaymentBusinessItemQuery,
  submitTaxPaymentBusinessHome,
  updateBusinessHomeQuery,
} from './query'
import { api } from '../../api'

export const getHomeIndividualTilesAPI = api.injectEndpoints({
  endpoints: builder => ({
    getTaxPaymentHomeData: builder.query<TaxPaymentBusinessItemDetails, string>(
      {
        query: () => getBusinessHomeDataQuery(),
      }
    ),
    updateTaxPaymentHomeData: builder.query<
      string,
      TaxPaymentBusinessItemDetails
    >({
      query: queryParam => updateBusinessHomeQuery(queryParam),
    }),

    getTaxPaymentBusinessItemList: builder.query<
      TaxPaymentBusinessItemsList,
      string
    >({
      query: () => getTaxPaymentBusinessitemListQuery(),
    }),

    submitTaxPaymentEntities: builder.query<
      TaxPaymentHomeStatus,
      TaxPayerBusinessHomeData
    >({
      query: queryParam => submitTaxPaymentBusinessHome(queryParam),
    }),

    deleteBusinessEntityItem: builder.query<TaxPaymentHomeStatus, string>({
      query: queryParam => deleteBusinessList(queryParam),
    }),

    postTaxPaymentBusinessItem: builder.query<
      TaxPaymentBusinessItemDetails,
      TaxPaymentBusinessItemDetails
    >({
      query: queryParam => postTaxPaymentBusinessItemQuery(queryParam),
    }),

    putTaxPaymentBusinessItem: builder.query<
      TaxPaymentBusinessItemDetails,
      TaxPaymentBusinessItemDetails
    >({
      query: queryParam => putTaxPaymentBusinessItemQuery(queryParam),
    }),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetTaxPaymentHomeDataQuery,
  useLazySubmitTaxPaymentEntitiesQuery,
  useLazyDeleteBusinessEntityItemQuery,
  useLazyGetTaxPaymentBusinessItemListQuery,
  useLazyUpdateTaxPaymentHomeDataQuery,
  useLazyPostTaxPaymentBusinessItemQuery,
  useLazyPutTaxPaymentBusinessItemQuery,
} = getHomeIndividualTilesAPI
