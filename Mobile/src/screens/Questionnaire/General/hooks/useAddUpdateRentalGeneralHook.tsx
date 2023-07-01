import { useEffect, useState } from 'react'
import {
  useLazyAddPageEntityQueryQuery,
  useLazyEditPageEntityQueryQuery,
  useLazyGetNavDetailsQueryQuery,
} from '../../../../../src/services/modules/questionnaire'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { RentalRoyaltyData } from '../../../../../src/services/modules/questionnaire/responseTypes'
import { DetailPageRequest } from '../../../../../src/services/modules/questionnaire/requestType'
import { PageCode } from '../../../../../src/services/constants/PageCode'
import { useSelector } from 'react-redux'
import { formatCurrency } from '../../../../../src/theme/common/TextInput/utils'

export default function (detailId, pageId, navigation) {
  const [getDetails, { isFetching: isFetchingDetails }] =
    useLazyGetNavDetailsQueryQuery()
  const [editDetails, { isFetching: isFetchingEdit }] =
    useLazyEditPageEntityQueryQuery()
  const [addDetails, { isFetching: isFetchingAdd }] =
    useLazyAddPageEntityQueryQuery()
  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )
  const [yno1099, setYNo1099] = useState<string>('')
  const [chkAttachDoc, setChkAttachDoc] = useState(false)
  const attachToggleSwitch = () => {
    setChkAttachDoc(previousState => !previousState)
  }
  const onError: SubmitErrorHandler<Record<string, string>> = errors => {}
  const saveDetails: SubmitHandler<Record<string, string>> = async formdata => {
    const data: RentalRoyaltyData = {
      txtPropAddr: formdata.txtPropAddr,
      datSold: formdata.datSold,
      txtPropCity: formdata.txtPropCity,
      txtPropState: formdata.txtPropState,
      txtPropZip: formdata.txtPropZip,
      txtFrgnInfo: formdata.txtFrgnInfo,
      cmbStatus: formdata.cmbStatus,
      cmbTSJ: formdata.cmbTSJ,
      txtPropType: formdata.txtPropType,
      yno1099: yno1099 == null ? '' : yno1099,
      pctBusiness: formdata.pctBusiness,
      pctProBusiness: formdata.pctProBusiness,
      txtNotes: formdata.txtNotes,
      chkAttach: chkAttachDoc ? '1' : '0',
      numDaysOwned: formdata.numDaysOwned,
      numProDaysOwned: formdata.numProDaysOwned,
      numRentFMV: formdata.numRentFMV,
      numProRentFMV: formdata.numProRentFMV,
      numPropPersonal: formdata.numPropPersonal,
      numProPropPersonal: formdata.numProPropPersonal,
      curMortInt: formdata.curMortInt,
      curProMortInt: formdata.curProMortInt,
      curRETaxes: formdata.curRETaxes,
      curProRETaxes: formdata.curProRETaxes,
    }
    if (detailId == null) {
      addGeneralDetails(data)
    } else {
      editGeneralDetails(detailId, data)
    }
  }
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      txtPropAddr: '',
      datSold: '',
      txtPropCity: '',
      txtPropState: '',
      txtPropZip: '',
      txtFrgnInfo: '',
      cmbStatus: '',
      cmbTSJ: '',
      txtPropType: '',
      yno1099: '',
      pctBusiness: '',
      pctProBusiness: '',
      txtNotes: '',
      chkAttach: '',
      numDaysOwned: '',
      numProDaysOwned: '',
      numRentFMV: '',
      numProRentFMV: '',
      numPropPersonal: '',
      numProPropPersonal: '',
      curMortInt: '',
      curProMortInt: '',
      curRETaxes: '',
      curProRETaxes: '',
    },
  })

  const getGeneralDetails = () => {
    const request: DetailPageRequest<null> = {
      entityPageID: pageId,
      pagecode: PageCode.BusinessRentalDetail,
      entityId: detailId,
      modelJson: { data: null, grids: null },
    }
    getDetails(request)
      .unwrap()
      .then(details => {
        const rentalData: RentalRoyaltyData = JSON.parse(details.payload)
          ?.miDataModel?.data
        setYNo1099(rentalData.yno1099)
        rentalData.curMortInt = formatCurrency(rentalData.curMortInt, true)
        rentalData.curProMortInt = formatCurrency(
          rentalData.curProMortInt,
          true
        )
        rentalData.curRETaxes = formatCurrency(rentalData.curRETaxes, true)
        rentalData.curProRETaxes = formatCurrency(
          rentalData.curProRETaxes,
          true
        )
        setChkAttachDoc(rentalData.chkAttach == '1' ? true : false)
        reset(rentalData)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const addGeneralDetails = (formData: RentalRoyaltyData) => {
    const response: DetailPageRequest<RentalRoyaltyData> = {
      entityPageID: pageId,
      pagecode: PageCode.BusinessRentals,
      entityId: '0',
      modelJson: { data: null, grids: null },
    }
    addDetails(response)
      .unwrap()
      .then(res => {
        const payload = JSON.parse(res.payload)
        const entityID = payload?.selectedEntityId
        editGeneralDetails(entityID, formData)
      })
      .catch(error => {})
  }
  const editGeneralDetails = (
    entityId: string,
    formData: RentalRoyaltyData
  ) => {
    formData.code = PageCode.BusinessRentalDetail
    formData.entityid = entityId
    formData.isDirty = 'true'
    const request: DetailPageRequest<RentalRoyaltyData> = {
      entityPageID: pageId,
      pagecode: PageCode.BusinessRentalDetail,
      entityId: entityId,
      modelJson: { data: formData, grids: null },
    }
    editDetails(request)
      .unwrap()
      .then(res => {
        if (detailId == null) {
          const id = JSON.parse(res.payload)?.selectedEntityId
          navigation.replace('RentalEntityInfo', {
            entityID: id,
            entityPageID: pageId,
          })
        } else {
          navigation.goBack()
        }
      })
      .catch(error => {})
  }
  useEffect(() => {
    if (detailId != null) {
      getGeneralDetails()
    }
  }, [])
  const cancelClick = () => {
    navigation.goBack()
  }
  return {
    control,
    handleSubmit,
    onError,
    errors,
    saveDetails,
    attachToggleSwitch,
    isFetchingDetails,
    isFetchingEdit,
    isFetchingAdd,
    chkAttachDoc,
    yno1099,
    cancelClick,
    singleServiceListData,
    setYNo1099,
  }
}
