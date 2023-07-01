import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import styles from './styles'
import Text from '../../../theme/common/Text'
import { SwipeListView } from 'react-native-swipe-list-view'
import { imageConstant } from '../../../theme/Images'
import { Colors } from '../../../theme/constants'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import loaderStyle from '../../Common/LoaderStyle'
import {
  useLazyFinishLaterDoneAPIQuery,
  useLazyGetDetailedDependentDisplayDataQuery,
  useLazyDeleteDependentAPICallQuery,
  useLazyGetDependentDisplayDataQuery,
} from '../../../services/modules/questionnaire'
import { getDetailedDependent } from '../../../store/questionnaire'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { PageCode } from '../../../services/constants/PageCode'
import { Divider } from 'react-native-paper'
import YesNoButton from '../../../../src/theme/common/YesNoButton'
import { useFocusEffect } from '@react-navigation/native'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../../../src/theme/common/YesNoButton/types'
import EmptyAreas from '../BusinessRental/EmptyAreas'
import { errorMessageToast } from '../../Error/utils'
import WKSwipeListView from '../../../theme/common/SwipeList/WKSwipeListView'
import { glbStyles } from '../../../../src/styles/global'

const DependentsScreen = (props: ApplicationScreenProps) => {
  let isDone = true

  const { navigation, route } = props
  const [connectionsData, setConnectionsData] = useState([])
  const [mainPayload, setMainPayload] = useState([])
  const [isRefreshSwipe, setIsRefreshSwipe] = useState(false)
  const dispatch = useDispatch()
  const [finishLaterDoneAPI] = useLazyFinishLaterDoneAPIQuery()
  const [isFetching, setFetching] = useState(false)
  const [getDetailedDependentDisplayData] =
    useLazyGetDetailedDependentDisplayDataQuery()

  const [deleteDependentAPICall] = useLazyDeleteDependentAPICallQuery()
  const [getDependentDisplayData] = useLazyGetDependentDisplayDataQuery()

  const displayDependent = useSelector(
    state => state?.questionnaire?.displayDependent
  )
  const { t } = useTranslation()

  const [isYesSelected, setYesSelected] = useState('')
  const [isYesSelectedPay, setYesSelectedPay] = useState('')

  const [pageCode, setPageCode] = useState('')
  const [entityPageID, setEntityPageID] = useState('')

  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
  })

  useFocusEffect(
    useCallback(() => {
      getDependentDisplayData()
    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      setFetching(true)
      if (
        JSON.parse(displayDependent?.payload)?.miDataModel?.data
          ?.ynoPayChildCare === 'Y'
      ) {
        setYesSelectedPay('1')
      } else if (
        JSON.parse(displayDependent?.payload)?.miDataModel?.data
          ?.ynoPayChildCare === 'N'
      ) {
        setYesSelectedPay('0')
      }

      if (
        JSON.parse(displayDependent?.payload)?.miDataModel?.data
          ?.ynoDepsTurn18 === 'Y'
      ) {
        setYesSelected('1')
      } else if (
        JSON.parse(displayDependent?.payload)?.miDataModel?.data
          ?.ynoDepsTurn18 === 'N'
      ) {
        setYesSelected('0')
      }

      setConnectionsData(
        JSON.parse(displayDependent?.payload).navHelper?.pageListItems[0]
          ?.Entities
      )

      setPageCode(
        JSON.parse(displayDependent?.payload).navHelper?.pageListItems[0]
          ?.EntityHelper?.pageCode
      )
      setEntityPageID(
        JSON.parse(displayDependent?.payload).navHelper?.pageListItems[0]
          ?.EntityHelper?.entityPageID
      )

      setMainPayload(JSON.parse(displayDependent?.payload)?.miDataModel?.data)
      setFetching(false)
    }, [displayDependent])
  )

  const navigateToScreen = item => {
    setFetching(true)

    const endPoitns = `code=${pageCode}&entityId=${item?.entityID}`
    getDetailedDependentDisplayData(endPoitns)
      .unwrap()
      .then(payload => {
        setFetching(false)
        navigation.push('AddViewDepenedents', {
          item: item,
          entityPageID: entityPageID,
          isAdd: false,
        })
      })
      .catch(error => {
        setFetching(false)
        errorMessageToast(error)
      })
  }
  const renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            navigateToScreen(item)
          }}
        >
          <Text
            stylesContainerText={styles.dependentItem}
            children={
              item?.fieldValue == null
                ? item?.processedFieldValue
                : item?.fieldValue
            }
            testID="dependent_list_item"
          />
          <Text
            stylesContainerText={styles.dependentItemDetails2}
            children={t('dependent:ANSWER_DEPENDENT_QUESTIONNAIRE')}
            testID="dependent_list_item"
          />
          <Image style={styles.img} source={imageConstant.rightArrow} />
        </TouchableOpacity>
        <View style={styles.horizontalLine2} />
      </View>
    )
  }


  const getModelJson = () => {
    return {
      data: {
        txtFirstName: mainPayload.txtFirstName,
        txtMiddleInitial: mainPayload.txtMiddleInitial,
        txtLastName: mainPayload.txtLastName,
        ynoPayChildCare:
          isYesSelectedPay == '1' ? 'Y' : isYesSelectedPay == '0' ? 'N' : '',
        ynoDepsTurn18:
          isYesSelected == '1' ? 'Y' : isYesSelected == '0' ? 'N' : '',
        ynoCheck: 0,
      },
      grids: null,
    }
  }
  const submitProfile: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    const data1 = {
      data: {
        txtFirstName: mainPayload.txtFirstName,
        txtMiddleInitial: mainPayload.txtMiddleInitial,
        txtLastName: mainPayload.txtLastName,
        ynoPayChildCare:
          isYesSelectedPay == '1' ? 'Y' : isYesSelectedPay == '0' ? 'N' : '',
        ynoDepsTurn18:
          isYesSelected == '1' ? 'Y' : isYesSelected == '0' ? 'N' : '',
        ynoCheck: isDone ? '1' : '0',
        code: PageCode.Dependents,
      },
      grids: null,
    }

    finishLaterDoneAPI(data1)
      .unwrap()
      .then(response => {
        getDependentDisplayData()
        navigation.goBack()
      })
      .catch(error => {
        errorMessageToast(error)
      })
  }

  const deleteDependentAPI = (entityID: string) => {
    const endPoint =
      '/0/' + PageCode.Dependents + '/0/' + entityID + '/' + entityPageID

    const postData = {
      endPoint: endPoint,
      data: {},
      headers: JSON.stringify(getModelJson()),
    }
    deleteDependentAPICall(postData)
      .unwrap()
      .then(response => {
        setFetching(false)
        getDependentDisplayData()
      })
      .catch(error => {
        setFetching(false)
        errorMessageToast(error)
      })
  }
  const deleteDependent = (entityID: string) => {
    setIsRefreshSwipe(true)

    Alert.alert(t('common:DELETE'), t('questionnaire:DELETE_DEPENDENT'), [
      {
        text: t('common:CANCEL'),
        onPress: () => {
          setIsRefreshSwipe(false)
        },
        style: 'cancel',
      },
      {
        text: t('common:OK'),
        onPress: () => deleteDependentAPI(entityID),
        style: 'default',
      },
    ])
  }

  const YesNoCallbackPay = (state: YesNoResult, data: YesNoButtonProps) => {
    const ynoseletedValue = state === '1' ? 'Y' : state === '0' ? 'N' : ''
    if (ynoseletedValue == 'Y') {
      setYesSelectedPay('1')
    } else if (ynoseletedValue == 'N') {
      setYesSelectedPay('0')
    } else {
      setYesSelectedPay('')
    }
  }

  const YesNoCallback = (state: YesNoResult, data: YesNoButtonProps) => {
    const ynoseletedValue = state === '1' ? 'Y' : state === '0' ? 'N' : ''
    if (ynoseletedValue == 'Y') {
      setYesSelected('1')
    } else if (ynoseletedValue == 'N') {
      setYesSelected('0')
    } else {
      setYesSelected('')
    }
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <ScrollView>
        <EmptyAreas />
        <View style={styles.container}>
          <Spinner
            visible={isFetching}
            textContent={t('common:LOADING')}
            size={'large'}
            textStyle={loaderStyle.spinnerTextStyle}
          />

          <View>
            {connectionsData.length > 0 ? (
              <WKSwipeListView
                refreshPage={isRefreshSwipe}
                listData={connectionsData}
                keyExtractor={item => item?.entityID}
                renderItem={renderItem}
                renderHiddenItem={(data, rowMap) => (
                  <View style={styles.rowBack}>
                    <View />
                    {!data?.item?.isProforma && (
                      <TouchableOpacity
                        style={styles.stylesSwipeViewStyle}
                        onPress={() => deleteDependent(data?.item?.entityID)}
                      >
                        <Text
                          children={t('common:DELETE')}
                          stylesContainerText={styles.stylesSwipeTextStyle}
                          testID="dependent_list_item"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                leftOpenValue={0}
                rightOpenValue={-100}
              />
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setFetching(true)
              dispatch(getDetailedDependent('')),
                setTimeout(() => {
                  setFetching(false)
                  navigation.navigate('AddViewDepenedents', {
                    entityPageID: entityPageID,
                    isAdd: true,
                  })
                }, 2000)
            }}
          >
            <Text
              stylesContainerText={styles.dependentItem2}
              children={t('dependent:ADD_DEPENDENT')}
              testID="add_dependent"
            />

            <Image style={styles.img} source={imageConstant.rightArrow} />
          </TouchableOpacity>
          <EmptyAreas />
          {connectionsData.length > 0 ? (
            <View>
              {!isFetching && (
                <View>
                  <YesNoButton
                    callback={YesNoCallbackPay}
                    apiKey={'text_id_did_you_pay'}
                    title={t('dependent:DID_YOU_PAY')}
                    defaultValue={isYesSelectedPay}
                  />

                  <YesNoButton
                    callback={YesNoCallback}
                    apiKey={'text_id_did_any_of_your_dependent'}
                    title={t('dependent:DID_ANY_OF_YOUR_DEPENDENT')}
                    defaultValue={isYesSelected}
                  />
                </View>
              )}

              <View style={styles.horizontalLine2} />
            </View>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.finishLaterButtonContainer,
            {
              backgroundColor: Colors.white,
            },
          ]}
          onPress={handleSubmit(d => {
            ;(isDone = false), submitProfile(d)
          })}
        >
          <Text
            stylesContainerText={{
              color: Colors.black,
            }}
            testID="Finish_Later"
          >
            {t('common:FINISH_LATER')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.doneButtonContainer,
            {
              backgroundColor: Colors.testColorBlue,
            },
          ]}
          onPress={handleSubmit(d => {
            isDone = true
            submitProfile(d)
          })}
        >
          <Text
            stylesContainerText={{
              color: Colors.white,
            }}
            testID="Done"
          >
            {t('common:DONE')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
export default DependentsScreen
