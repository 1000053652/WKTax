import Text from '../../../theme/common/Text'
import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView, ScrollView, View } from 'react-native'
import styles from '../styles'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../Common/LoaderStyle'
import { useTranslation } from 'react-i18next'
import { Colors, FontFamily, moderateScale } from '../../../theme/constants'
import BusinessListing from './BusinessListing'
import {
  useLazyDeleteBusinessEntityListQuery,
  useLazyDeleteFarmEntityListQuery,
  useLazyDeleteRentalEntityListQuery,
  useLazyGetBusinessHomeDataQuery,
  useLazyUpdateBusinessEntitiesQuery,
} from '../../../../src/services/modules/business'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBusinessEntities,
  getBusinessRoyalHomeData,
  getRentalEntities,
  getFarmEntities,
  getBusinessYNO,
} from '../../../../src/store/business'
import {
  BusinessEntities,
  BusinessEntityHelper,
  BusinessHomeData,
  PageListItems,
} from '../../../../src/store/business/types'
import { PageCode } from '../../../../src/services/constants/PageCode'
import Button from '../../../../src/theme/common/Button'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import EmptyAreas from './EmptyAreas'
import { useFocusEffect } from '@react-navigation/native'
import { BusinessRentalFarmType } from './Utils'
import YesNoButton from '../../../../src/theme/common/YesNoButton'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../../../src/theme/common/YesNoButton/types'
import YNOSegmentedControl from '../../../../src/theme/common/YNOSegmentedControl'
import { errorMessageToast } from '../../Error/utils'

const BusinessRentalHomeScreen = ({ navigation }: ApplicationScreenProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [getBusinessHomeData] = useLazyGetBusinessHomeDataQuery()
  const [updateBusinessEntities] = useLazyUpdateBusinessEntitiesQuery()
  const [deleteBusinessEntityList] = useLazyDeleteBusinessEntityListQuery()
  const [deleteRentalEntityList] = useLazyDeleteRentalEntityListQuery()
  const [deleteFarmEntityList] = useLazyDeleteFarmEntityListQuery()
  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )
  const [isFetching, setIsFetching] = useState(false)
  const [isRefersh, setIsRefersh] = useState(false)
  const businessHomeResponsData: BusinessHomeData = useSelector(
    state => state?.business?.businessHomeData
  )

  const businessYNo = useSelector(state => state?.business?.businessYNo)
  const businessData: PageListItems = useSelector(
    state => state?.business?.businessEntities
  )

  const rentalData: PageListItems = useSelector(
    state => state?.business?.rentalEntities
  )
  const farmData: PageListItems = useSelector(
    state => state?.business?.farmEntities
  )

  const businessEntities: Array<BusinessEntities> = useSelector(
    state => state?.business?.businessEntities?.Entities
  )
  const [entitieWithProformaB, setEntitieWithProformaB] = useState<
    Array<BusinessEntities>
  >([])
  const [entitieWithProformaR, setEntitieWithProformaR] = useState<
    Array<BusinessEntities>
  >([])
  const [entitieWithProformaF, setEntitieWithProformaF] = useState<
    Array<BusinessEntities>
  >([])
  const [dataHasProfoma, setDataHasProfoma] = useState(false)

  const rentalEntities: Array<BusinessEntities> = useSelector(
    state => state?.business?.rentalEntities?.Entities
  )
  const farmEntities: Array<BusinessEntities> = useSelector(
    state => state?.business?.farmEntities?.Entities
  )

  useFocusEffect(
    React.useCallback(() => {
      callBusinessEntitiesAPI(PageCode.BusinessList)
    }, [])
  )

  useEffect(() => {
    callRefersh(false)
  }, [])

  useEffect(() => {
    setDataHasProfoma(
      entitieWithProformaB?.length > 0 ||
        entitieWithProformaR?.length > 0 ||
        entitieWithProformaF?.length > 0
    )
  }, [entitieWithProformaB, entitieWithProformaR, entitieWithProformaF])

  const callRefersh = (itIsFromLoop: boolean) => {
    setIsFetching(true)
    getBusinessHomeData(PageCode.Business)
      .unwrap()
      .then(resp => {
        dispatch(
          getBusinessRoyalHomeData(JSON.parse(resp?.payload)?.miDataModel?.data)
        )
        if (!itIsFromLoop) {
          dispatch(
            getBusinessYNO(
              JSON.parse(resp?.payload)?.miDataModel?.data.NavBusiness
            )
          )
        }

        callBusinessEntitiesAPI(PageCode.BusinessList)
      })
      .catch(error => {
        console.error('Error', error)
        errorMessageToast(error)
      })
  }

  const callBusinessEntitiesAPI = (pageCode: string) => {
    getBusinessHomeData(pageCode)
      .unwrap()
      .then(resp => {
        switch (pageCode) {
          case PageCode.BusinessList:
            dispatch(
              getBusinessEntities(
                JSON.parse(resp?.payload)?.navHelper?.pageListItems[0]
              )
            )
            const entitiesB: Array<BusinessEntities> = JSON.parse(resp?.payload)
              ?.navHelper?.pageListItems[0]?.Entities
            setEntitieWithProformaB(
              entitiesB.filter(entitie => entitie.isProforma)
            )
            callBusinessEntitiesAPI(PageCode.BusinessRentals)
            break
          case PageCode.BusinessRentals:
            dispatch(
              getRentalEntities(
                JSON.parse(resp?.payload)?.navHelper?.pageListItems[0]
              )
            )
            const entitiesR: Array<BusinessEntities> = JSON.parse(resp?.payload)
              ?.navHelper?.pageListItems[0]?.Entities
            setEntitieWithProformaR(
              entitiesR.filter(entitie => entitie.isProforma)
            )
            callBusinessEntitiesAPI(PageCode.BusinessFarms)
            break

          case PageCode.BusinessFarms:
            dispatch(
              getFarmEntities(
                JSON.parse(resp?.payload)?.navHelper?.pageListItems[0]
              )
            )
            const entitiesF: Array<BusinessEntities> = JSON.parse(resp?.payload)
              ?.navHelper?.pageListItems[0]?.Entities
            setEntitieWithProformaF(
              entitiesF.filter(entitie => entitie.isProforma)
            )
            setIsFetching(false)
            break

          default:
            break
        }
        setIsRefersh(true)
      })
      .catch(error => {
        setIsFetching(false)
        setIsRefersh(true)
        console.error('Error', error)
        errorMessageToast(error)
      })
  }

  const submitBusiness = (
    businessDone: string,
    allowBack: boolean,
    businessYNo: string
  ) => {
    const businessParams = { ...businessHomeResponsData }
    businessParams.NavBusinessComplete = businessDone
    businessParams.NavBusiness = businessYNo
    updateBusinessEntities(businessParams)
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
            dispatch(getBusinessYNO(YesNoResult.YES))
            setIsFetching(false)
            setIsRefersh(true)
          },
          style: 'cancel',
        },
        {
          text: t('common:YES'),
          onPress: () => {
            setIsFetching(true)
            businessData?.Entities?.forEach(entity => {
              onRowDeleting(
                businessData?.EntityHelper?.entityPageID == undefined
                  ? ''
                  : businessData?.EntityHelper?.entityPageID,
                entity?.entityID,
                'B',
                true
              )
            })
            rentalData?.Entities?.forEach(entity => {
              onRowDeleting(
                rentalData?.EntityHelper?.entityPageID == undefined
                  ? ''
                  : rentalData?.EntityHelper?.entityPageID,
                entity?.entityID,
                'R',
                true
              )
            })
            farmData?.Entities?.forEach((entity, index) => {
              onRowDeleting(
                farmData?.EntityHelper?.entityPageID == undefined
                  ? ''
                  : farmData?.EntityHelper?.entityPageID,
                entity?.entityID,
                'F',
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
      case 'B':
        deleteBusinessEntityList(deletingParam)
          .unwrap()
          .then(res => {})
          .catch(error => {
            setIsRefersh(true)
            errorMessageToast(error)
          })
        break
      case 'R':
        deleteRentalEntityList(deletingParam)
          .unwrap()
          .then(res => {})
          .catch(error => {
            setIsRefersh(true)
            errorMessageToast(error)
          })
        break
      case 'F':
        deleteFarmEntityList(deletingParam)
          .unwrap()
          .then(res => {})
          .catch(error => {
            setIsRefersh(true)
            errorMessageToast(error)
          })
        break
      default:
        break
    }
    callRefersh(itIsFromLoop)
  }

  const YesNoCallback = (state: string) => {
    dispatch(getBusinessYNO(state))
    if (YesNoResult.NO === state || YesNoResult.NONE === state) {
      confirmationDeleteBusiness(state)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Spinner
        visible={isFetching}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <ScrollView>
        {EmptyAreas()}
        <YNOSegmentedControl
          value={businessYNo}
          yesValue={'1'}
          noValue={'0'}
          title={t('businessRental:DOWEHAVEBUSINESS')}
          onValueChange={(value: string) => {
            YesNoCallback(value)
          }}
          disabled={dataHasProfoma}
        />

        <View style={styles.horizontalLine} />

        <View style={styles.grayTextArea}>
          <Text
            stylesContainerText={styles.grayTitleText}
            testID="ss"
            children={
              'IN ' +
              `${singleServiceListData?.taxYear}` +
              t('businessRental:YEARLYQUESTION')
            }
          />
          <Text
            stylesContainerText={styles.grayText}
            testID="ss"
            children={t('businessRental:QUESTION_EXPLAIN')}
          />
        </View>
        <BusinessListing
          type={BusinessRentalFarmType.Business}
          listingData={businessEntities}
          deleteRow={entityID =>
            onRowDeleting(
              businessData?.EntityHelper?.entityPageID == undefined
                ? ''
                : businessData?.EntityHelper?.entityPageID,
              entityID,
              'B',
              false
            )
          }
          onClickRow={entityID =>
            navigation.navigate('BusinessEntityInfo', {
              entityID: entityID,
              entityPageID: businessData?.EntityHelper?.entityPageID,
            })
          }
          onAddClick={() => {
            if (businessYNo === '1') {
              navigation.navigate('AddUpdateBusinessGeneralDetails', {
                entityPageID: businessData?.EntityHelper?.entityPageID,
              })
            }
          }}
        />
        <BusinessListing
          type={BusinessRentalFarmType.Rental}
          listingData={rentalEntities}
          deleteRow={entityID =>
            onRowDeleting(
              rentalData?.EntityHelper?.entityPageID == undefined
                ? ''
                : rentalData?.EntityHelper?.entityPageID,
              entityID,
              'R',
              false
            )
          }
          onClickRow={entityID =>
            navigation.navigate('RentalEntityInfo', {
              entityID: entityID,
              entityPageID: rentalData?.EntityHelper?.entityPageID,
            })
          }
          onAddClick={() => {
            if (businessYNo === '1') {
              navigation.navigate('AddUpdateRentalGeneralDetails', {
                entityPageID: rentalData?.EntityHelper?.entityPageID,
              })
            }
          }}
        />
        <BusinessListing
          type={BusinessRentalFarmType.Farm}
          listingData={farmEntities}
          deleteRow={entityID =>
            onRowDeleting(
              farmData.EntityHelper?.entityPageID == undefined
                ? ''
                : farmData.EntityHelper?.entityPageID,
              entityID,
              'F',
              false
            )
          }
          onClickRow={entityID =>
            navigation.navigate('FarmEntityInfo', {
              entityID: entityID,
              entityPageID: farmData.EntityHelper?.entityPageID,
            })
          }
          onAddClick={() => {
            if (businessYNo === '1') {
              navigation.navigate('AddUpdateFarmGeneralDetails', {
                entityPageID: farmData?.EntityHelper?.entityPageID,
              })
            }
          }}
        />
      </ScrollView>

      <View style={styles.horizontalLine} />

      <View style={styles.buttonConatinerStyle}>
        <Button
          testID="aboutYou.btn.finishlater"
          disable={false}
          title={t('aboutYou:FINISHLATER')}
          onPress={() => {
            submitBusiness('0', true, businessYNo)
          }}
          stylesContainer={styles.buttonFinishContactStyle}
          stylesContainerText={{
            fontSize: moderateScale(14),
            justifyContent: 'center',
            textAlign: 'center',
            color: Colors.black,
            fontFamily: FontFamily.FiraSansRegular,
          }}
        />

        <Button
          testID="aboutYou.btn.done"
          disable={false}
          title={t('aboutYou:DONE')}
          onPress={() => {
            submitBusiness('1', true, businessYNo)
          }}
          stylesContainer={styles.buttonContactStyle}
          stylesContainerText={styles.buttonDoneContactStyle}
        />
      </View>
      <View style={styles.horizontalLine} />
    </SafeAreaView>
  )
}

export default BusinessRentalHomeScreen
