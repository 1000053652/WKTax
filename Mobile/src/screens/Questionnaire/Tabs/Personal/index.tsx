import React, { useEffect } from 'react'
import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import ListItem from '../../../../theme/common/ListItem'
import Text from '../../../../theme/common/Text'
import { imageConstant } from '../../../../theme/Images'
import { Divider } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { Colors } from '../../../../../src/theme/constants'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import { useLazyGetHomeIndividualTilesDataQuery } from '../../../../../src/services/modules/questionnaire'
import { getIndividualTiles } from '../../../../store/questionnaire'
const Personal = ({ navigation }) => {
  const dispatch = useDispatch()
  const [getHomeIndividualTilesData] = useLazyGetHomeIndividualTilesDataQuery()

  const getIndividualData = useSelector(
    state => state?.questionnaire?.getIndividualData
  )
  const { t } = useTranslation()

  const checkStatus = getIndividualData
    ? JSON.parse(getIndividualData?.payload)?.miDataModel?.data
    : null

  const isfirstloginData: boolean = useSelector(
    state => state?.questionnaire?.isfirstlogin
  )

  useFocusEffect(
    React.useCallback(() => {
      getHomeIndividualTilesData()
        .unwrap()
        .then(res => {
          dispatch(getIndividualTiles(res))
        })
        .catch(err => {})
    }, [])
  )

  type listType = {
    title: string
    status: string
    type: number
  }
  const listData: listType[] = [
    {
      title: t('questionnaire:ABOUT_YOU'),
      status:
        checkStatus?.ynoCheckAboutYou == 1 ? t('questionnaire:COMPLETED') : '',
      type: 1,
    },
    {
      title: t('questionnaire:DEPENDENTS'),
      status:
        checkStatus?.ynoCheckDependents == 1
          ? t('questionnaire:COMPLETED')
          : '',
      type: 2,
    },
    {
      title: t('questionnaire:FILLING_DETAILS'),
      status:
        checkStatus?.ynoCheckDirDep == 1 ? t('questionnaire:COMPLETED') : '',
      type: 3,
    },
    {
      title: t('questionnaire:TAXABLE_EVENT'),
      status: checkStatus?.ynoCheck == 1 ? t('questionnaire:COMPLETED') : '',
      type: 4,
    },
  ]

  useEffect(() => {
    if (isfirstloginData) {
      navigation.navigate('AboutYou')
    }
  }, [isfirstloginData])

  const rowClick = (item: listType) => {
    switch (item.type) {
      case 1:
        navigation.navigate('AboutYou')
        break
      case 2:
        navigation.push('DependentsScreen')
        break
      case 3:
        navigation.navigate('FillingDetailsScreen')
        break
      case 4:
        navigation.navigate('TaxableScreen')
        break
    }
  }

  const renderItem = data => {
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor:
              data?.item?.status === t('questionnaire:COMPLETED')
                ? Colors.backgroundFooterColor
                : Colors.white,
          },
        ]}
        onPress={() => rowClick(data.item)}
      >
        <ListItem
          title=""
          leftSlot={
            <View style={styles.leftView}>
              <Text
                stylesContainerText={styles.leftText}
                children={data?.item?.title}
                testID="personal_item"
              />
            </View>
          }
          rightSlot={
            <View style={styles.rightViewContainer}>
              {data?.item?.status === t('questionnaire:COMPLETED') && (
                <Text
                  stylesContainerText={styles.completedText}
                  children={data?.item?.status}
                  testID="personal_item"
                />
              )}
              <Image
                style={styles.arrowImage}
                source={imageConstant.rightArrow}
              />
            </View>
          }
        />
        <Divider />
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList data={listData} renderItem={renderItem} />
    </View>
  )
}

export default Personal
