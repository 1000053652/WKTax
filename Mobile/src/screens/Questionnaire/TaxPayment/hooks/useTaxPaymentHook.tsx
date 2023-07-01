import { useFocusEffect } from '@react-navigation/native'
import { PageCode } from '../../../../../src/services/constants/PageCode'
import {
  useLazyDeleteCityEntityListQuery,
  useLazyDeleteFederalEntityListQuery,
  useLazyDeleteStateEntityListQuery,
  useLazyGetTaxPaymentHomeDataQuery,
  useLazyUpdateTaxPaymentEntitiesQuery,
} from '../../../../../src/services/modules/taxPayment'
import { BusinessEntityHelper } from '../../../../../src/store/business/types'
import {
  getBusinessEntities,
  getBusinessRoyalHomeData,
  getBusinessYNO,
  getFarmEntities,
  getRentalEntities,
} from '../../../../../src/store/questionnaire/taxpayment'
import {
  BusinessEntities,
  BusinessHomeData,
  PageListItems,
} from '../../../../../src/store/questionnaire/taxpayment/types'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../../../../src/theme/common/YesNoButton/types'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { TaxPaymentType } from '../utils'

export default function (navigation) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [getTaxPaymentHomeData] = useLazyGetTaxPaymentHomeDataQuery()
  const [updateTaxPaymentEntities] = useLazyUpdateTaxPaymentEntitiesQuery()
  const [deleteFederalEntityList] = useLazyDeleteFederalEntityListQuery()
  const [deleteStateEntityList] = useLazyDeleteStateEntityListQuery()
  const [deleteCityEntityList] = useLazyDeleteCityEntityListQuery()
  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )
  const [isFetching, setIsFetching] = useState(false)
  const [isRefersh, setIsRefersh] = useState(false)
  const taxPaymentHomeResponsData: BusinessHomeData = useSelector(
    state => state?.taxpayment?.taxPaymentHomeData
  )

  const [taxPaymentYNo, setTaxPaymentYNo] = useState('')
  const federalData: PageListItems = useSelector(
    state => state?.taxpayment?.federalEntities
  )

  const stateData: PageListItems = useSelector(
    state => state?.taxpayment?.stateEntities
  )
  const cityData: PageListItems = useSelector(
    state => state?.taxpayment?.cityEntities
  )

  const federalEntities: Array<BusinessEntities> = useSelector(
    state => state?.taxpayment?.federalEntities?.Entities
  )
  const stateEntities: Array<BusinessEntities> = useSelector(
    state => state?.taxpayment?.stateEntities?.Entities
  )
  const cityEntities: Array<BusinessEntities> = useSelector(
    state => state?.taxpayment?.cityEntities?.Entities
  )

  useFocusEffect(
    React.useCallback(() => {
      setIsFetching(true)
      callBusinessEntitiesAPI(PageCode.FederalPayments)
    }, [])
  )

  useEffect(() => {
    callRefersh()
  }, [])

  const callRefersh = () => {
    setIsFetching(true)
    getTaxPaymentHomeData(PageCode.TaxPayments)
      .unwrap()
      .then(resp => {
        dispatch(
          getBusinessRoyalHomeData(JSON.parse(resp?.payload)?.miDataModel?.data)
        )
        setTaxPaymentYNo(
          JSON.parse(resp?.payload)?.miDataModel?.data.NavTaxpayment
        )
        callBusinessEntitiesAPI(PageCode.FederalPayments)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const callBusinessEntitiesAPI = (pageCode: string) => {
    getTaxPaymentHomeData(pageCode)
      .unwrap()
      .then(resp => {
        switch (pageCode) {
          case PageCode.FederalPayments:
            dispatch(
              getBusinessEntities(
                JSON.parse(resp?.payload)?.navHelper?.pageListItems[0]
              )
            )
            callBusinessEntitiesAPI(PageCode.StatePayments)
            break
          case PageCode.StatePayments:
            dispatch(
              getRentalEntities(
                JSON.parse(resp?.payload)?.navHelper?.pageListItems[0]
              )
            )
            callBusinessEntitiesAPI(PageCode.CityPayments)
            break
          case PageCode.CityPayments:
            dispatch(
              getFarmEntities(
                JSON.parse(resp?.payload)?.navHelper?.pageListItems[0]
              )
            )
            setIsFetching(false)
            setIsRefersh(true)
            break
          default:
            break
        }
      })
      .catch(err => {
        setIsFetching(false)
        setIsRefersh(true)
      })
  }

  const submitBusiness = (
    businessDone: string,
    allowBack: boolean,
    taxPaymentYNo: string
  ) => {
    const newItem: BusinessHomeData = {
      ...taxPaymentHomeResponsData,
      NavTaxpaymentComplete: businessDone,
      NavTaxpayment: taxPaymentYNo,
    }
    updateTaxPaymentEntities(newItem)
      .unwrap()
      .then(resp => {
        if (allowBack) {
          navigation.goBack()
        }
      })
  }
  const confirmationDeleteBusiness = (str: string) => {
    Alert.alert(
      t('businessRental:CONFIRMATION_TITLE'),
      t('businessRental:CONFIRMATION_TEXT'),
      [
        {
          text: t('common:NO'),
          onPress: () => {
            setIsRefersh(false)
            setTaxPaymentYNo(YesNoResult.YES)
            setIsFetching(false)
            setIsRefersh(true)
          },
          style: 'cancel',
        },
        {
          text: t('common:YES'),
          onPress: () => {
            setTaxPaymentYNo(str)
            setIsFetching(true)
            federalData?.Entities?.forEach(entity => {
              onRowDeleting(
                federalData?.EntityHelper?.entityPageID == undefined
                  ? ''
                  : federalData?.EntityHelper?.entityPageID,
                entity?.entityID,
                TaxPaymentType.Federal,
                true
              )
            })
            stateData?.Entities?.forEach(entity => {
              onRowDeleting(
                stateData?.EntityHelper?.entityPageID == undefined
                  ? ''
                  : stateData?.EntityHelper?.entityPageID,
                entity?.entityID,
                TaxPaymentType.State,
                true
              )
            })
            cityData?.Entities?.forEach((entity, index) => {
              onRowDeleting(
                cityData?.EntityHelper?.entityPageID == undefined
                  ? ''
                  : cityData?.EntityHelper?.entityPageID,
                entity?.entityID,
                TaxPaymentType.City,
                true
              )
            })
            setIsFetching(false)
            setIsRefersh(true)
            submitBusiness('0', false, str)
          },
          style: 'default',
        },
      ]
    )
  }

  const onRowDeleting = (
    entityPageID: string | '',
    entityID: string,
    deleteApiFor: string,
    itIsFromLoop: boolean
  ) => {
    const deletingParam = {
      entityPageID: entityPageID,
      entityID: entityID,
    } as BusinessEntityHelper
    switch (deleteApiFor) {
      case TaxPaymentType.Federal:
        deleteFederalEntityList(deletingParam)
          .unwrap()
          .then(res => {})
          .catch(error => {
            setIsRefersh(true)
          })
        break
      case TaxPaymentType.State:
        deleteStateEntityList(deletingParam)
          .unwrap()
          .then(res => {})
          .catch(error => {
            setIsRefersh(true)
          })
        break
      case TaxPaymentType.City:
        deleteCityEntityList(deletingParam)
          .unwrap()
          .then(res => {})
          .catch(error => {
            setIsRefersh(true)
          })
        break
      default:
        break
    }
    callBusinessEntitiesAPI(PageCode.FederalPayments)
  }

  const YesNoCallback = (state: YesNoResult) => {
    if (YesNoResult.NO === state || YesNoResult.NONE === state) {
      setTaxPaymentYNo(YesNoResult.NO)
      confirmationDeleteBusiness(state)
    } else {
      setTaxPaymentYNo(state)
    }
  }

  const callAddEdit = (
    entityPageID: string | '',
    entityID: string,
    taxPaymentType: string,
    isForEdit: boolean
  ) => {
    if (isForEdit) {
      navigation.navigate('TaxPaymentAddEdit', {
        entityPageID: entityPageID,
        entityID: entityID,
        taxPaymentType: taxPaymentType,
        isForEdit: isForEdit,
      })
    } else {
      navigation.navigate('TaxPaymentAddEdit', {
        entityPageID: entityPageID,
        taxPaymentType: taxPaymentType,
        isForEdit: isForEdit,
      })
    }
  }

  return {
    isFetching,
    isRefersh,
    YesNoCallback,
    taxPaymentYNo,
    singleServiceListData,
    federalEntities,
    onRowDeleting,
    federalData,
    callAddEdit,
    stateEntities,
    stateData,
    cityEntities,
    cityData,
    submitBusiness,
  }
}
