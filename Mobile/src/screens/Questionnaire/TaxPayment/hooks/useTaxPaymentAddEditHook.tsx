import { states } from '../../../../../src/services/constants/ConstantsData'
import { PageCode } from '../../../../../src/services/constants/PageCode'
import {
  useLazyAddPageEntityQueryQuery,
  useLazyEditPageEntityQueryQuery,
} from '../../../../../src/services/modules/questionnaire'
import { DetailPageRequest } from '../../../../../src/services/modules/questionnaire/requestType'
import {
  useLazyGetCityItemDetailsQuery,
  useLazyGetFederalItemDetailsQuery,
  useLazyGetStateItemDetailsQuery,
} from '../../../../../src/services/modules/taxPayment'
import { ServerData } from '../../../../../src/store/questionnaire/taxpayment/types'
import { useEffect, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { TaxPaymentType } from '../utils'
import { formatCurrency, removeDollarAndComma } from '../../../../../src/theme/common/TextInput/utils'

export default function (navigation, route) {
  const [isFetching, setIsFetching] = useState(false)
  const [isRefersh, setIsRefersh] = useState(false)
  const [errorForDate, setErrorForDate] = useState('')
  const [getFederalItemDetails] = useLazyGetFederalItemDetailsQuery()
  const [getStateItemDetails] = useLazyGetStateItemDetailsQuery()
  const [getCityItemDetails] = useLazyGetCityItemDetailsQuery()
  const isForEdit = route?.params?.isForEdit
  const entityIDOfEdit = route?.params?.entityID
  const taxPaymentType = route?.params?.taxPaymentType
  const entityPageID = route?.params?.entityPageID
  const [isSelectedPayWithExt, setSelectionayWithExt] = useState(false)
  const [refreshPage, setRefreshPage] = useState(false)
  const [isSelectedOverPayment, setSelectionOverPayment] = useState(false)
  const [addDetails, { isFetching: isFetchingAdd }] =
    useLazyAddPageEntityQueryQuery()
  const [editDetails, { isFetching: isFetchingEdit }] =
    useLazyEditPageEntityQueryQuery()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      datFedPaymentDate: '',
      curPaymentAmount: '',
      chkOverPayment: '',
      chkPayExt: '',
      txtState: '',
      datStatePaymentDate: '',
      curStatePaymentAmount: '',
      chkStateOverPayment: '',
      chkStatePayExt: '',
      datCityPaymentDate: '',
      curCityPaymentAmount: '',
      chkCityOverPayment: '',
      chkCityPayExt: '',
    },
  })

  const backClick = () => {
    navigation.goBack()
  }
  const onError: SubmitErrorHandler<Record<string, string>> = errors => {
    console.error('in error', errors)
  }
  const saveDetails: SubmitHandler<Record<string, string>> = async formdata => {
    if (isForEdit) {
      editTaxPayment(entityIDOfEdit, formdata)
    } else {
      addTaxPaymentDetails(formdata)
    }
  }

  useEffect(() => {
    if (isForEdit) {
      getTaxPaymentData()
    }
  }, [])

  const addTaxPaymentDetails = (formdata: Record<string, string>) => {
    const request: DetailPageRequest<ServerData> = {
      entityPageID: entityPageID,
      pagecode:
        taxPaymentType === TaxPaymentType.Federal
          ? PageCode.FederalPayments
          : taxPaymentType === TaxPaymentType.State
          ? PageCode.StatePayments
          : taxPaymentType === TaxPaymentType.City
          ? PageCode.CityPayments
          : PageCode.FederalPayments,
      entityId: '0',
      modelJson: { data: null, grids: null },
    }
    setIsFetching(true)
    addDetails(request)
      .unwrap()
      .then(res => {
        const payload = JSON.parse(res.payload)
        const entityID = payload?.selectedEntityId
        editTaxPayment(entityID, formdata)
      })
      .catch(error => {
        setIsFetching(false)
      })
  }

  const editTaxPayment = (
    entityID: string,
    formdata: Record<string, string>
  ) => {
    setIsFetching(true)
    switch (taxPaymentType) {
      case TaxPaymentType.Federal:
        editTaxPaymentDetails(entityID, formdata)
        break
      case TaxPaymentType.State:
        editTaxPaymentStateDetails(entityID, formdata)
        break
      case TaxPaymentType.City:
        editTaxPaymentCityDetails(entityID, formdata)
        break
      default:
        setIsFetching(false)
        break
    }
  }

  const editTaxPaymentDetails = (
    entityId: string,
    formdata: Record<string, string>
  ) => {
    const finalData = {
      datFedPaymentDate: formdata.datFedPaymentDate,
      curPaymentAmount: removeDollarAndComma(formdata.curPaymentAmount),
      code: PageCode.FederalPaymentsDetails,
      chkOverPayment: isSelectedOverPayment ? '1' : '0',
      chkPayExt: isSelectedPayWithExt ? '1' : '0',
      entityid: entityId,
      isDirty: 'true',
    }
    const request: DetailPageRequest<string> = {
      entityPageID: entityPageID,
      pagecode: PageCode.FederalPaymentsDetails,
      entityId: entityId,
      modelJson: { data: finalData, grids: null },
    }
    editDetailsAPI(request)
  }

  const editTaxPaymentStateDetails = (
    entityId: string,
    formdata: Record<string, string>
  ) => {
    const finalData = {
      datStatePaymentDate: formdata.datStatePaymentDate,
      curStatePaymentAmount: removeDollarAndComma(formdata.curStatePaymentAmount),
      txtState: formdata.txtState,
      code: PageCode.StatePaymentsDetails,
      chkStateOverPayment: isSelectedOverPayment ? '1' : '0',
      chkStatePayExt: isSelectedPayWithExt ? '1' : '0',
      entityid: entityId,
      isDirty: 'true',
    }
    const request: DetailPageRequest<string> = {
      entityPageID: entityPageID,
      pagecode: PageCode.StatePaymentsDetails,
      entityId: entityId,
      modelJson: { data: finalData, grids: null },
    }
    editDetailsAPI(request)
  }
  const editTaxPaymentCityDetails = (
    entityId: string,
    formdata: Record<string, string>
  ) => {
    const finalData = {
      datCityPaymentDate: formdata.datCityPaymentDate,
      curCityPaymentAmount: removeDollarAndComma(formdata.curCityPaymentAmount),
      txtState: formdata.txtState,
      code: PageCode.CityPaymentsDetails,
      chkCityOverPayment: isSelectedOverPayment ? '1' : '0',
      chkCityPayExt: isSelectedPayWithExt ? '1' : '0',
      entityid: entityId,
      isDirty: 'true',
    }
    const request: DetailPageRequest<string> = {
      entityPageID: entityPageID,
      pagecode: PageCode.CityPaymentsDetails,
      entityId: entityId,
      modelJson: { data: finalData, grids: null },
    }
    editDetailsAPI(request)
  }

  const editDetailsAPI = (request: DetailPageRequest<string>) => {
    editDetails(request)
      .unwrap()
      .then(res => {
        setIsFetching(false)
        if (entityIDOfEdit == null) {
          const id = JSON.parse(res.payload)?.selectedEntityId
          navigation.goBack()
        } else {
          navigation.goBack()
        }
      })
      .catch(error => {
        setIsFetching(false)
      })
  }

  const checkboxListener = (index: number) => {
    if (index == 1) {
      setSelectionOverPayment(true)
      setSelectionayWithExt(false)
    } else {
      setSelectionayWithExt(true)
      setSelectionOverPayment(false)
    }
  }

  const getTaxPaymentData = () => {
    setIsFetching(true)
    switch (taxPaymentType) {
      case TaxPaymentType.Federal:
        getFederalItemDetails(entityIDOfEdit)
          .unwrap()
          .then(res => {
            const finalData = JSON.parse(res?.payload)?.miDataModel?.data
            finalData.curPaymentAmount = formatCurrency(finalData.curPaymentAmount,true);
            
            reset(finalData)
            if (
              JSON.parse(res?.payload)?.miDataModel?.data?.chkOverPayment == '1'
            ) {
              checkboxListener(1)
            } else if (
              JSON.parse(res?.payload)?.miDataModel?.data?.chkPayExt == '1'
            ) {
              checkboxListener(2)
            }
            setRefreshPage(true)
            setIsFetching(false)
          })
          .catch(error => {
            setIsRefersh(true)
            setIsFetching(false)
          })
        break
      case TaxPaymentType.State:
        getStateItemDetails(entityIDOfEdit)
          .unwrap()
          .then(res => {
            const finalData = JSON.parse(res?.payload)?.miDataModel?.data
            finalData.curStatePaymentAmount = formatCurrency(finalData.curStatePaymentAmount,true);



            reset(finalData)
            if (
              JSON.parse(res?.payload)?.miDataModel?.data
                ?.chkStateOverPayment == '1'
            ) {
              checkboxListener(1)
            } else if (
              JSON.parse(res?.payload)?.miDataModel?.data?.chkStatePayExt == '1'
            ) {
              checkboxListener(2)
            }

            setRefreshPage(true)
            setIsFetching(false)
          })
          .catch(error => {
            setIsRefersh(true)
            setIsFetching(false)
          })
        break
      case TaxPaymentType.City:
        getCityItemDetails(entityIDOfEdit)
          .unwrap()
          .then(res => {
            const  finalData = JSON.parse(res?.payload)?.miDataModel?.data
            finalData.curCityPaymentAmount = formatCurrency(finalData.curCityPaymentAmount,true);



            reset(finalData)
            if (
              JSON.parse(res?.payload)?.miDataModel?.data?.chkCityOverPayment ==
              '1'
            ) {
              checkboxListener(1)
            } else if (
              JSON.parse(res?.payload)?.miDataModel?.data?.chkCityPayExt == '1'
            ) {
              checkboxListener(2)
            }
            setRefreshPage(true)
            setIsFetching(false)
          })
          .catch(error => {
            setIsRefersh(true)
            setIsFetching(false)
          })
        break

      default:
        setIsFetching(false)
        break
    }
  }


  return {
    taxPaymentType,
    errors,
    control,
    handleSubmit,
    isForEdit,
    errorForDate,
    setErrorForDate,
    checkboxListener,
    isSelectedOverPayment,
    isSelectedPayWithExt,
    isFetching,
    backClick,
    saveDetails,
    onError,
    refreshPage,
  }
}
