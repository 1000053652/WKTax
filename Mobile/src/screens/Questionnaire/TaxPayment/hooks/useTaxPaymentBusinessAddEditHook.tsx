import {
  useLazyPostTaxPaymentBusinessItemQuery,
  useLazyPutTaxPaymentBusinessItemQuery,
} from '../../../../../src/services/modules/taxPaymentBusiness'
import {
  ServerData,
  TaxPaymentBusinessItemDetails,
} from '../../../../../src/store/questionnaire/taxpayment/types'
import { useEffect, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { TaxPaymentType } from '../utils'
import { formatCurrency } from '../../../../../src/theme/common/TextInput/utils'

export default function (navigation, route) {
  const [isFetching, setIsFetching] = useState(false)
  const isForEdit = route?.params?.isForEdit
  const entityIDOfEdit = route?.params?.entityID
  const taxPaymentType = route?.params?.taxPaymentType
  const [isSelectedPayWithExt, setSelectionayWithExt] = useState(false)
  const [refreshPage, setRefreshPage] = useState(false)
  const [isSelectedOverPayment, setSelectionOverPayment] = useState(false)
  const [postTaxPaymentBusinessItem] = useLazyPostTaxPaymentBusinessItemQuery()
  const [putTaxPaymentBusinessItem] = useLazyPutTaxPaymentBusinessItemQuery()
  const federalEntities: Array<TaxPaymentBusinessItemDetails> = useSelector(
    state => state?.taxpayment?.federalEntities
  )
  const stateEntities: Array<TaxPaymentBusinessItemDetails> = useSelector(
    state => state?.taxpayment?.stateEntities
  )
  const cityEntities: Array<TaxPaymentBusinessItemDetails> = useSelector(
    state => state?.taxpayment?.cityEntities
  )
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
    const requestF = {
      groupName: 'Federal',
      stateCode: '',
      districtName: '',
      paymentAmount: formdata.curPaymentAmount,
      paymentDate: formdata.datFedPaymentDate,
      overpayment: isSelectedOverPayment ? '1' : '0',
      extension: isSelectedPayWithExt ? '1' : '0',
    }

    const requestS = {
      groupName: 'State',
      stateCode: formdata.txtState,
      districtName: '',
      paymentAmount: formdata.curStatePaymentAmount,
      paymentDate: formdata.datStatePaymentDate,
      overpayment: isSelectedOverPayment ? '1' : '0',
      extension: isSelectedPayWithExt ? '1' : '0',
    }

    console.log("\nformData",formdata)
    
    const requestC = {
      groupName: 'City/County/School',
      stateCode: '',
      districtName: formdata.txtState,
      paymentAmount: formdata.curCityPaymentAmount,
      paymentDate: formdata.datCityPaymentDate,
      overpayment: isSelectedOverPayment ? '1' : '0',
      extension: isSelectedPayWithExt ? '1' : '0',
    }
    setIsFetching(true)
    postTaxPaymentBusinessItem(
      taxPaymentType == TaxPaymentType.Federal
        ? requestF
        : taxPaymentType == TaxPaymentType.State
        ? requestS
        : requestC
    )
      .unwrap()
      .then(res => {
        setIsFetching(false)
        navigation.goBack()
      })
      .catch(error => {
        setIsFetching(false)
        console.error('error', JSON.stringify(error))
      })
  }

  const editTaxPayment = (
    entityID: string,
    formdata: Record<string, string>
  ) => {
    const requestNew: TaxPaymentBusinessItemDetails = {
      paymentId: entityID,
      groupName: null,
      makePayments: null,
      stateCode: ' ',
      stateName: ' ',
      districtName: '',
      paymentAmount: '',
      paymentDate: '',
      paymentType: null,
      overpayment: isSelectedOverPayment ? '1' : '0',
      extension: isSelectedPayWithExt ? '1' : '0',
    }
    console.log("\nformData",formdata)

    if (taxPaymentType == TaxPaymentType.Federal) {
      requestNew.groupName = 'Federal'
      requestNew.paymentAmount= formdata.curPaymentAmount
      requestNew.paymentDate= formdata.datFedPaymentDate
    } else if (taxPaymentType == TaxPaymentType.State) {
      requestNew.groupName = 'State'
      requestNew.stateCode = formdata.txtState 
      requestNew.stateName = ' '
      requestNew.paymentAmount= formdata.curStatePaymentAmount
      requestNew.paymentDate= formdata.datStatePaymentDate
    } else if (taxPaymentType == TaxPaymentType.City) {
      requestNew.groupName = 'City/County/School'
      requestNew.districtName = formdata.txtState
      requestNew.paymentAmount= formdata.curCityPaymentAmount
      requestNew.paymentDate= formdata.datCityPaymentDate
    }
    setIsFetching(true)
    putTaxPaymentBusinessItem(requestNew)
      .unwrap()
      .then(res => {
        setIsFetching(false)
        if (entityIDOfEdit == null) {
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
    switch (taxPaymentType) {
      case TaxPaymentType.Federal:
        const taxPaymentF = federalEntities?.filter(
          entities => entities.paymentId === entityIDOfEdit
        )

        const dataToEditF: ServerData = {
          datFedPaymentDate:
            taxPaymentF[0].paymentDate == null
              ? ''
              : taxPaymentF[0].paymentDate,
          curPaymentAmount:
            taxPaymentF[0].paymentAmount == null
              ? '0'
              : formatCurrency(taxPaymentF[0].paymentAmount,true),
          chkOverPayment:
            taxPaymentF[0].overpayment == null
              ? ''
              : taxPaymentF[0].overpayment,
          chkPayExt:
            taxPaymentF[0].extension == null ? '' : taxPaymentF[0].extension,
        }
       
            
        reset(dataToEditF)
        if (dataToEditF?.chkOverPayment == '1') {
          checkboxListener(1)
        } else if (dataToEditF?.chkPayExt == '1') {
          checkboxListener(2)
        }
        setRefreshPage(true)
        break
      case TaxPaymentType.State:
        const taxPaymentS = stateEntities?.filter(
          entities => entities.paymentId === entityIDOfEdit
        )

        const dataToEditS: ServerData = {
          txtState:
            taxPaymentS[0].stateCode == null ? '' : taxPaymentS[0].stateCode,
          datStatePaymentDate:
            taxPaymentS[0].paymentDate == null
              ? ''
              : taxPaymentS[0].paymentDate,
          curStatePaymentAmount:
            taxPaymentS[0].paymentAmount == null
              ? '0'
              : formatCurrency(taxPaymentS[0].paymentAmount,true),
          chkStateOverPayment:
            taxPaymentS[0].overpayment == null
              ? ''
              : taxPaymentS[0].overpayment,
          chkStatePayExt:
            taxPaymentS[0].extension == null ? '' : taxPaymentS[0].extension,
        }

        reset(dataToEditS)
        if (dataToEditS?.chkStateOverPayment == '1') {
          checkboxListener(1)
        } else if (dataToEditS?.chkStatePayExt == '1') {
          checkboxListener(2)
        }

        setRefreshPage(true)
        break
      case TaxPaymentType.City:
        const taxPaymentC = cityEntities?.filter(
          entities => entities.paymentId === entityIDOfEdit
        )
        const dataToEditC: ServerData = {
          txtState:
            taxPaymentC[0].districtName == null
              ? ''
              : taxPaymentC[0].districtName,
          datCityPaymentDate:
            taxPaymentC[0].paymentDate == null
              ? ''
              : taxPaymentC[0].paymentDate,
          curCityPaymentAmount:
            taxPaymentC[0].paymentAmount == null
              ? '0'
              : formatCurrency(taxPaymentC[0].paymentAmount,true),
          chkCityOverPayment:
            taxPaymentC[0].overpayment == null
              ? ''
              : taxPaymentC[0].overpayment,
          chkCityPayExt:
            taxPaymentC[0].extension == null ? '' : taxPaymentC[0].extension,
        }

        reset(dataToEditC)
        if (dataToEditC?.chkCityOverPayment == '1') {
          checkboxListener(1)
        } else if (dataToEditC?.chkCityPayExt == '1') {
          checkboxListener(2)
        }
        setRefreshPage(true)
        break

      default:
        break
    }
  }

   

  return {
    taxPaymentType,
    errors,
    control,
    handleSubmit,
    isForEdit,
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
