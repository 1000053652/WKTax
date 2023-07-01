import React, { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { imageConstant } from '../../../../src/theme/Images'
import {
  useLazyGetHomeAssetQuery,
  useLazyGetHomeGeneralAssetQuery,
} from '../../../services/modules/AssetsBusiness'
import { useFocusEffect } from '@react-navigation/native'
import { ApplicationScreenProps } from 'Mobile/@types/navigation'
import { YesNoResult } from '../../../theme/common/YesNoButton/types'
import { BusinessTiles } from '../../../services/constants/BusinessTiles'
import { useLazyGetHomeBankDoneQuery } from '../../../services/modules/ElectronicFundsScreen'
import AssetsBusinessScreen from './AssetsBusinessScreen'
const AssetsBusiness = (props: ApplicationScreenProps) => {
  const [getHomeAsset] = useLazyGetHomeAssetQuery()
  const [getHomeGeneralAsset] = useLazyGetHomeGeneralAssetQuery()
  const [isAsstesData, setAsstesData] = useState(false)
  const [fetching, setFetching] = useState(true)
  const { t } = useTranslation()
  const dataModel = useSelector(state => state?.businessAssets?.getAssetsData)


  const [autoFillData, setAutoFillData] = useState('')
  const checkbox = autoFillData?.attached
  const [isSitchEnabledForgiven, setSwitchEnabledForgiven] = useState(false)

  useEffect(() => {
    setSwitchEnabledForgiven(checkbox !== '0' ? true : false)
  }, [checkbox])
  const [isSelected, setSelected] = useState(true)
  const [getHomeBankDone] = useLazyGetHomeBankDoneQuery()

  const deleteDependentAPI = (entityID: string) => {
    setAsstesData(true)
    const data = {
      method: 'DELETE',
      id: entityID,
      isDeleted: false,
      type: 'Asset',
    }
    getHomeAsset(data)
      .unwrap()
      .then(() => {
        fetchAssetsList()
        setAsstesData(false)
      })
      .catch(() => setAsstesData(false))
  }

  const fetchAssetsList = () => {
    setAsstesData(true)
    const data = {
      method: 'GET',
      isDeleted: false,
      id: '',
      type: 'Assets',
    }
    getHomeGeneralAsset(data)
    .unwrap()
    .then((response) => {
      setAutoFillData(response)
      setAsstesData(false)
      setFetching(false)
    })
    .catch(() => {
      setAsstesData(false),
      setFetching(false)
    })

    getHomeAsset(data)
      .unwrap()
      .then(response => {
        setAsstesData(false)
      })
      .catch(() => setAsstesData(false))

  }
  useFocusEffect(
    
    useCallback(() => {
      setAsstesData(true)
      setFetching(true)
      fetchAssetsList()
    }, [autoFillData])
  )
  useEffect(() => {
    fetchAssetsList()
  }, [])
  const YesNoCallback = (state: YesNoResult) => {
    const autoFillData1 = autoFillData
    const ynoseletedValue = state === '1' ? 'Y' : state === '0' ? 'N' : ''
    autoFillData1.assets = ynoseletedValue
  
    setAutoFillData(autoFillData1)

    const payload = {
      assetId: autoFillData1?.assetId,
      assets: autoFillData1?.assets,
      attached: autoFillData1?.attached,
      description: autoFillData1?.description,
      purchaseDate: autoFillData1?.purchaseDate,
      purchaseCost: autoFillData1?.purchaseCost,
      saleDate: autoFillData1?.saleDate,
      saleCost: autoFillData1?.saleCost,
      entityId: autoFillData1?.entityId,
      method: 'POST',
      isDeleted: true,
    }
    setAsstesData(true)
    getHomeGeneralAsset(payload)
      .unwrap()
      .then(() => {
        setAsstesData(false)
      })
      .catch(error => {
        setAsstesData(false)
        console.error('error', error)
      })
  }
  const dtToggleSwitchForgiven = () => {
    const autoFillData1 = autoFillData

    const ynoseletedValue =
      isSitchEnabledForgiven === true
        ? '0'
        : isSitchEnabledForgiven === false
        ? '1'
        : ''
    autoFillData1.attached = ynoseletedValue
    setAutoFillData(autoFillData1)
    const payload = {
      assetId: autoFillData1?.assetId,
      assets: autoFillData1?.assets,
      attached: autoFillData1?.attached,
      description: autoFillData1?.description,
      purchaseDate: autoFillData1?.purchaseDate,
      purchaseCost: autoFillData1?.purchaseCost,
      saleDate: autoFillData1?.saleDate,
      saleCost: autoFillData1?.saleCost,
      entityId: autoFillData1?.entityId,
      method: 'POST',
      isDeleted: true,
    }
    setAsstesData(true)
    getHomeGeneralAsset(payload)
      .unwrap()
      .then(response => {
        setAsstesData(false)
      })
      .catch(error => {
        setAsstesData(false)
        console.error('error', error)
      })
  }
  const toggleBottomButton = data => {
    const item1 = {
      tileId: BusinessTiles.Assets,
      complete: false,
      enabled: true,
    }
    const item2 = {
      tileId: BusinessTiles.Assets,
      complete: true,
      enabled: true,
    }
    const payloadData = data ? item2 : item1
    getHomeBankDone(payloadData)
      .unwrap()
      .then(() => {
        props.navigation.goBack()
      })
      .catch(error => {
        console.error('error', error)
      })
  }

  return (
    <>
      <AssetsBusinessScreen
        isAsstesData={isAsstesData}
        YesNoCallback={YesNoCallback}
        displayData={autoFillData}
        isSitchEnabledForgiven={isSitchEnabledForgiven}
        dtToggleSwitchForgiven={dtToggleSwitchForgiven}
        dataModel={dataModel}
        toggleBottomButton={toggleBottomButton}
        isSelected={isSelected}
        props={props}
        imageConstant={imageConstant}
        deleteDependent={entityID => deleteDependentAPI(entityID)}
        fetching={fetching}
      />
    </>
  )
}
export default AssetsBusiness
