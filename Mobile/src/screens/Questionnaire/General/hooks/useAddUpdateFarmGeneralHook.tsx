import { useEffect, useState } from 'react'
import {
  useLazyAddPageEntityQueryQuery,
  useLazyEditPageEntityQueryQuery,
  useLazyGetNavDetailsQueryQuery,
} from '../../../../../src/services/modules/questionnaire'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { FarmGeneralData } from '../../../../../src/services/modules/questionnaire/responseTypes'
import { DetailPageRequest } from '../../../../../src/services/modules/questionnaire/requestType'
import { PageCode } from '../../../../../src/services/constants/PageCode'
import { formatCurrency } from '../../../../../src/theme/common/TextInput/utils'

export default function (detailId, pageId, navigation) {
  const [getDetails, { isFetching: isFetchingDetails }] =
    useLazyGetNavDetailsQueryQuery()
  const [editDetails, { isFetching: isFetchingEdit }] =
    useLazyEditPageEntityQueryQuery()
  const [addDetails, { isFetching: isFetchingAdd }] =
    useLazyAddPageEntityQueryQuery()
  const [yno1099, setYNo1099] = useState<string>('')
  const [chkAttachDoc, setChkAttachDoc] = useState(false)
  const attachToggleSwitch = () => {
    setChkAttachDoc(previousState => !previousState)
  }
  const onError: SubmitErrorHandler<Record<string, string>> = errors => {}
  const saveDetails: SubmitHandler<Record<string, string>> = async formdata => {
    const request: FarmGeneralData = {
      txtCrop: formdata.txtCrop,
      cmbTSJ: formdata.cmbTSJ,
      idnEmpNumber: formdata.idnEmpNumber,
      cmbStatus: formdata.cmbStatus,
      datDispose: formdata.datDispose,
      yno1099: yno1099 == null ? '' : yno1099,
      curHealthIns: formdata.curHealthIns,
      txtNotes: formdata.txtNotes,
      chkAttach: chkAttachDoc ? '1' : '0',
    }
    if (detailId == null) {
      addGeneralDetails(request)
    } else {
      editGeneralDetails(detailId, request)
    }
  }
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      txtCrop: '',
      cmbTSJ: '',
      idnEmpNumber: '',
      cmbStatus: '',
      datDispose: '',
      yno1099: '',
      curHealthIns: '',
      txtNotes: '',
      chkAttach: '',
    },
  })

  const getGeneralDetails = () => {
    const request: DetailPageRequest<null> = {
      entityPageID: pageId,
      pagecode: PageCode.BusinessFarmDetail,
      entityId: detailId,
      modelJson: { data: null, grids: null },
    }
    getDetails(request)
      .unwrap()
      .then(details => {
        const farmData: FarmGeneralData = JSON.parse(details.payload)
          ?.miDataModel?.data
        setYNo1099(farmData.yno1099)
        setChkAttachDoc(farmData.chkAttach == '1' ? true : false)
        farmData.curHealthIns = formatCurrency(farmData.curHealthIns, true)
        reset(farmData)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const addGeneralDetails = (formData: FarmGeneralData) => {
    const request: DetailPageRequest<FarmGeneralData> = {
      entityPageID: pageId,
      pagecode: PageCode.BusinessFarms,
      entityId: '0',
      modelJson: { data: null, grids: null },
    }
    addDetails(request)
      .unwrap()
      .then(res => {
        const payload = JSON.parse(res.payload)
        const entityID = payload?.selectedEntityId
        editGeneralDetails(entityID, formData)
      })
      .catch(error => {})
  }
  const editGeneralDetails = (entityId: string, formData: FarmGeneralData) => {
    formData.code = PageCode.BusinessFarmDetail
    formData.entityid = entityId
    formData.isDirty = 'true'
    const request: DetailPageRequest<FarmGeneralData> = {
      entityPageID: pageId,
      pagecode: PageCode.BusinessFarmDetail,
      entityId: entityId,
      modelJson: { data: formData, grids: null },
    }
    editDetails(request)
      .unwrap()
      .then(res => {
        if (detailId == null) {
          const id = JSON.parse(res.payload)?.selectedEntityId
          navigation.replace('FarmEntityInfo', {
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
    setYNo1099,
    cancelClick,
  }
}
