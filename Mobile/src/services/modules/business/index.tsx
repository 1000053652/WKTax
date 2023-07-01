import {
  BusinessEntityHelper,
  BusinessHomeData,
  BusinessHomeStatus,
  BusinessItemDetails,
} from '../../../../src/store/business/types'
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
    getBusinessHomeData: builder.query<BusinessHomeStatus, string>({
      query: pageCode => getBusinessHomeDataQuery(pageCode),
    }),
    getBusinessItemDetails: builder.query<BusinessItemDetails, string>({
      query: businessItem =>
        itemDetailsQuery(PageCode.BusinessList, businessItem),
    }),
    getRentalItemDetails: builder.query<BusinessItemDetails, string>({
      query: businessItem =>
        itemDetailsQuery(PageCode.BusinessRentalDetail, businessItem),
    }),
    getFarmItemDetails: builder.query<BusinessItemDetails, string>({
      query: businessItem =>
        itemDetailsQuery(PageCode.BusinessFarmDetail, businessItem),
    }),
    updateBusinessEntities: builder.query<BusinessHomeStatus, BusinessHomeData>(
      {
        query: queryParam => updateBusinessHomeDataQuery(queryParam),
      }
    ),
    deleteBusinessEntityList: builder.query<
      BusinessHomeStatus,
      BusinessEntityHelper
    >({
      query: queryParam =>
        deleteBusinessList(PageCode.BusinessList, queryParam),
    }),
    deleteRentalEntityList: builder.query<
      BusinessHomeStatus,
      BusinessEntityHelper
    >({
      query: queryParam =>
        deleteBusinessList(PageCode.BusinessRentals, queryParam),
    }),
    deleteFarmEntityList: builder.query<
      BusinessHomeStatus,
      BusinessEntityHelper
    >({
      query: queryParam =>
        deleteBusinessList(PageCode.BusinessFarms, queryParam),
    }),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetBusinessHomeDataQuery,
  useLazyUpdateBusinessEntitiesQuery,
  useLazyDeleteBusinessEntityListQuery,
  useLazyDeleteRentalEntityListQuery,
  useLazyDeleteFarmEntityListQuery,
  useLazyGetBusinessItemDetailsQuery,
  useLazyGetRentalItemDetailsQuery,
  useLazyGetFarmItemDetailsQuery,
} = getHomeIndividualTilesAPI
