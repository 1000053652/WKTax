import {
  useLazyDeleteBusinessEntityItemQuery,
  useLazyGetTaxPaymentBusinessItemListQuery,
  useLazyGetTaxPaymentHomeDataQuery,
  useLazySubmitTaxPaymentEntitiesQuery,
  useLazyUpdateTaxPaymentHomeDataQuery,
} from '../../../../services/modules/taxPaymentBusiness'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBusinessEntities,
  getRentalEntities,
  getFarmEntities,
  getBusinessYNO,
  getTaxPaymentBusinessHomeData,
} from '../../../../store/questionnaire/taxpayment'
import {
  TaxPayerBusinessHomeData,
  TaxPaymentBusinessItemDetails,
} from '../../../../store/questionnaire/taxpayment/types'
import { useFocusEffect } from '@react-navigation/native'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../../../theme/common/YesNoButton/types'
import { useEffect, useState } from 'react'
import React from 'react'
import { TaxPaymentType } from '../utils'

export default function (navigation) {
  const dispatch = useDispatch()
  const [getTaxPaymentHomeData] = useLazyGetTaxPaymentHomeDataQuery()
  const [updateTaxPaymentHomeData] = useLazyUpdateTaxPaymentHomeDataQuery()
  const [getTaxPaymentBusinessItemList] =
    useLazyGetTaxPaymentBusinessItemListQuery()
  const [submitTaxPaymentEntities] = useLazySubmitTaxPaymentEntitiesQuery()
  const [deleteBusinessList] = useLazyDeleteBusinessEntityItemQuery()
  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )
  const [isFetching, setIsFetching] = useState(false)
  const [isRefersh, setIsRefersh] = useState(false)
  const taxPaymentHomeResponsData: TaxPaymentBusinessItemDetails = useSelector(
    state => state?.taxpayment?.taxPaymentHomeData
  )

  const taxPaymentYNo = useSelector(state => state?.taxpayment?.taxPaymentNo)

  const federalEntities = useSelector(
    state => state?.taxpayment?.federalEntities
  )
  const stateEntities = useSelector(state => state?.taxpayment?.stateEntities)
  const cityEntities = useSelector(state => state?.taxpayment?.cityEntities)

  useFocusEffect(
    React.useCallback(() => {
      setIsFetching(true)
      callBusinessEntitiesAPI()
    }, [])
  )

  useEffect(() => {
    callRefersh()
  }, [])

  const callRefersh = () => {
    setIsFetching(true)
    getTaxPaymentHomeData('')
      .unwrap()
      .then(resp => {
        dispatch(getTaxPaymentBusinessHomeData(resp))
        dispatch(
          getBusinessYNO(
            resp?.makePayments == 'Y'
              ? YesNoResult.YES
              : resp?.makePayments == 'N'
              ? YesNoResult.NO
              : YesNoResult.NONE
          )
        )
        callBusinessEntitiesAPI()
      })
      .catch(err => {
        console.error(err)
      })
  }

  const callBusinessEntitiesAPI = () => {
    getTaxPaymentBusinessItemList('')
      .unwrap()
      .then(resp => {
        if (resp != undefined && resp?.length > 0) {
          const taxPaymentsFederalList: Array<TaxPaymentBusinessItemDetails> =
            resp?.filter(item => item.groupName == 'Federal')
          dispatch(getBusinessEntities(taxPaymentsFederalList))

          const taxPaymentsStateList: Array<TaxPaymentBusinessItemDetails> =
            resp?.filter(item => item.groupName == 'State')
          dispatch(getRentalEntities(taxPaymentsStateList))

          const taxPaymentsCityList: Array<TaxPaymentBusinessItemDetails> =
            resp?.filter(item => item.groupName == 'City/County/School')
          dispatch(getFarmEntities(taxPaymentsCityList))
        } else {
          dispatch(getBusinessEntities(null))
          dispatch(getRentalEntities(null))
          dispatch(getFarmEntities(null))
        }
        setIsRefersh(true)
        setIsFetching(false)
      })
      .catch(err => {
        setIsFetching(false)
        setIsRefersh(true)
      })
  }

  const submitBusiness = (businessDone: boolean, taxPaymentYNo: string) => {
    const businessSubmitQueryParam: TaxPayerBusinessHomeData = {
      tileId: '6',
      complete: businessDone,
      enabled: true,
    }
    submitTaxPaymentEntities(businessSubmitQueryParam)
      .unwrap()
      .then(resp => {
        navigation.goBack()
      })
  }

  const onRowDeleting = (paymentId: string, deleteApiFor: string) => {
    switch (deleteApiFor) {
      case TaxPaymentType.Federal:
        deleteBusinessList(paymentId)
          .unwrap()
          .then(res => {})
          .catch(error => {
            setIsRefersh(true)
          })
        break
      case TaxPaymentType.State:
        deleteBusinessList(paymentId)
          .unwrap()
          .then(res => {})
          .catch(error => {
            setIsRefersh(true)
          })
        break
      case TaxPaymentType.City:
        deleteBusinessList(paymentId)
          .unwrap()
          .then(res => {})
          .catch(error => {
            setIsRefersh(true)
          })
        break
      default:
        break
    }
    callRefersh()
  }

  const YesNoCallback = (state: YesNoResult, data1: YesNoButtonProps) => {
    dispatch(getBusinessYNO(state))
    taxPaymentHomeResponsData.makePayments =
      state == YesNoResult.YES ? 'Y' : state == YesNoResult.NO ? 'N' : ''
    updateTaxPaymentHomeData(taxPaymentHomeResponsData)
      .unwrap()
      .then(resp => {})
      .catch(err => {
        console.error(err)
      })
  }
  const callAddEdit = (
    entityID: string,
    taxPaymentType: string,
    isForEdit: boolean
  ) => {
    if (isForEdit) {
      navigation.navigate('TaxPaymentBusinessAddEdit', {
        entityID: entityID,
        taxPaymentType: taxPaymentType,
        isForEdit: isForEdit,
      })
    } else {
      navigation.navigate('TaxPaymentBusinessAddEdit', {
        taxPaymentType: taxPaymentType,
        isForEdit: isForEdit,
      })
    }
  }

  return {
    isFetching,
    singleServiceListData,
    isRefersh,
    YesNoCallback,
    taxPaymentYNo,
    federalEntities,
    onRowDeleting,
    callAddEdit,
    stateEntities,
    cityEntities,
    submitBusiness,
  }
}
