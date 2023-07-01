import { useEffect, useState } from 'react'
import {
  useLazyAddPageEntityQueryQuery,
  useLazyEditPageEntityQueryQuery,
  useLazyGetNavDetailsQueryQuery,
} from '../../../../../src/services/modules/questionnaire'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { BusinessGeneralData } from '../../../../../src/services/modules/questionnaire/responseTypes'
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
    const data: BusinessGeneralData = {
      txtBusinessName: formdata.txtBusinessName,
      txtProfession: formdata.txtProfession,
      cmbTSJ: formdata.cmbTSJ,
      cmbStatus: formdata.cmbStatus,
      cmbState: formdata.cmbState,
      txtAddress: formdata.txtAddress,
      txtCity: formdata.txtCity,
      txtZIP: formdata.txtZIP,
      curHealthIns: formdata.curHealthIns,
      txtMoreInfo: formdata.txtMoreInfo,
      txtFrgnPostalInfo: formdata.txtFrgnPostalInfo,
      yno1099: yno1099,
      chkAttachDoc: chkAttachDoc ? '1' : '0',
      idnEmployer: formdata.idnEmployer,
      datDispose: formdata.datDispose,
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
      txtBusinessName: '',
      cmbStatus: '',
      txtProfession: '',
      cmbTSJ: '',
      idnEmployer: '',
      txtAddress: '',
      txtCity: '',
      cmbState: '',
      txtZIP: '',
      datDispose: '',
      yno1099: '',
      curHealthIns: '',
      chkAttachDoc: '',
      txtMoreInfo: '',
      txtFrgnPostalInfo: '',
    },
  })

  const getGeneralDetails = () => {
    const request: DetailPageRequest<null> = {
      entityPageID: pageId,
      pagecode: PageCode.BusinessDetail,
      entityId: detailId,
      modelJson: { data: null, grids: null },
    }
    getDetails(request)
      .unwrap()
      .then(details => {
        const generalData: BusinessGeneralData = JSON.parse(details.payload)
          ?.miDataModel?.data
        generalData.curHealthIns = formatCurrency(
          generalData.curHealthIns,
          true
        )
        setYNo1099(generalData.yno1099)
        setChkAttachDoc(generalData.chkAttachDoc == '1' ? true : false)
        reset(generalData)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const addGeneralDetails = (formData: BusinessGeneralData) => {
    const response: DetailPageRequest<BusinessGeneralData> = {
      entityPageID: pageId,
      pagecode: PageCode.BusinessList,
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
    formData: BusinessGeneralData
  ) => {
    formData.code = PageCode.BusinessDetail
    formData.entityid = entityId
    formData.isDirty = 'true'
    const request: DetailPageRequest<BusinessGeneralData> = {
      entityPageID: pageId,
      pagecode: PageCode.BusinessDetail,
      entityId: entityId,
      modelJson: { data: formData, grids: null },
    }
    editDetails(request)
      .unwrap()
      .then(res => {
        if (detailId == null) {
          const id = JSON.parse(res.payload)?.selectedEntityId
          navigation.replace('BusinessEntityInfo', {
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
