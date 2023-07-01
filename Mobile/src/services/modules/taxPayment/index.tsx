import {
  TaxPaymentEntityHelper,
  BusinessHomeData,
  TaxPaymentHomeStatus,
  BusinessItemDetails,
} from '../../../../src/store/questionnaire/taxpayment/types'
import { PageCode } from '../../constants/PageCode'
import {
  deleteBusinessList,
  getBusinessHomeDataQuery,
  itemDetailsQuery,
  updateBusinessHomeDataQuery,
} from './query'
import { api } from '../../api'

export const getHomeIndividualTilesAPI = api.injectEndpoints({
  endpoints: builder => ({
    getTaxPaymentHomeData: builder.query<TaxPaymentHomeStatus, string>({
      query: pageCode => getBusinessHomeDataQuery(pageCode),
    }),
    getFederalItemDetails: builder.query<BusinessItemDetails, string>({
      query: businessItem =>
        itemDetailsQuery(PageCode.FederalPaymentsDetails, businessItem),
    }),
    getStateItemDetails: builder.query<BusinessItemDetails, string>({
      query: businessItem =>
        itemDetailsQuery(PageCode.StatePaymentsDetails, businessItem),
    }),
    getCityItemDetails: builder.query<BusinessItemDetails, string>({
      query: businessItem =>
        itemDetailsQuery(PageCode.CityPaymentsDetails, businessItem),
    }),
    updateTaxPaymentEntities: builder.query<
      TaxPaymentHomeStatus,
      BusinessHomeData
    >({
      query: queryParam => updateBusinessHomeDataQuery(queryParam),
    }),
    deleteFederalEntityList: builder.query<
      TaxPaymentHomeStatus,
      TaxPaymentEntityHelper
    >({
      query: queryParam =>
        deleteBusinessList(PageCode.FederalPaymentsDetails, queryParam),
    }),
    deleteStateEntityList: builder.query<
      TaxPaymentHomeStatus,
      TaxPaymentEntityHelper
    >({
      query: queryParam =>
        deleteBusinessList(PageCode.StatePaymentsDetails, queryParam),
    }),
    deleteCityEntityList: builder.query<
      TaxPaymentHomeStatus,
      TaxPaymentEntityHelper
    >({
      query: queryParam =>
        deleteBusinessList(PageCode.CityPaymentsDetails, queryParam),
    }),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetTaxPaymentHomeDataQuery,
  useLazyUpdateTaxPaymentEntitiesQuery,
  useLazyDeleteFederalEntityListQuery,
  useLazyDeleteStateEntityListQuery,
  useLazyDeleteCityEntityListQuery,
  useLazyGetFederalItemDetailsQuery,
  useLazyGetStateItemDetailsQuery,
  useLazyGetCityItemDetailsQuery,
} = getHomeIndividualTilesAPI
