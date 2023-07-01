import React from 'react'
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Image,
  ScrollView,
} from 'react-native'
import Text from '../../../theme/common/Text'
import { SwipeListView } from 'react-native-swipe-list-view'
import styles from './styles'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import { Divider } from 'react-native-paper'
import YesNoButton from '../../../theme/common/YesNoButton'
import { Colors } from '../../../../src/theme/constants'
import { YesNoResult } from '../../../theme/common/YesNoButton/types'
import { useTranslation } from 'react-i18next'
import WKSwipeListView from '../../../theme/common/SwipeList/WKSwipeListView'
import { glbStyles } from '../../../../src/styles/global'

const AssetsBusinessScreen = ({
  isAsstesData,
  YesNoCallback,
  displayData,
  isSitchEnabledForgiven,
  dtToggleSwitchForgiven,
  dataModel,
  toggleBottomButton,
  isSelected,
  props,
  imageConstant,
  deleteDependent,
  fetching,
}) => {
  const { t } = useTranslation()
  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => {
              const dataValue = {
                pageCode: props?.route?.params?.code,
                gridCode: props?.route?.params?.gridCode,
                entityid: props?.route?.params?.entityID,
              }
              props.navigation.navigate('AddViewAssetsBusiness', {
                item,
                dataValue,
              })
            }}
          >
            <TouchableOpacity style={styles.equipmentView}>
              <Text
                stylesContainerText={styles.equipmentText}
                children={item.description}
                testID="dependent_list_item"
              />
              <Image style={styles.img} source={imageConstant.rightArrow} />
            </TouchableOpacity>

            <View style={styles.equipmentView}>
              <Text
                stylesContainerText={styles.purchasesText}
                children={t('task:PURCHASESDATE')}
                testID="dependent_list_item"
              />
              <Text
                stylesContainerText={styles.purchasesText}
                children={t('task:COST1')}
                testID="dependent_list_item"
              />
            </View>
            <View style={styles.priceView}>
              <Text
                stylesContainerText={styles.purchasesText}
                children={item?.purchaseDate}
                testID="dependent_list_item"
              />
              <Text
                stylesContainerText={styles.purchasesText}
                children={item?.purchaseCost}
                testID="dependent_list_item"
              />
            </View>
            <View style={styles.equipmentView}>
              <Text
                stylesContainerText={styles.purchasesText}
                children={t('task:SALEDATE')}
                testID="dependent_list_item"
              />
              <Text
                stylesContainerText={styles.purchasesText}
                children={t('task:PRICE')}
                testID="dependent_list_item"
              />
            </View>
            <View style={styles.priceView}>
              <Text
                stylesContainerText={styles.purchasesText}
                children={item?.saleDate}
                testID="dependent_list_item"
              />
              <Text
                stylesContainerText={styles.purchasesText}
                children={item?.saleCost}
                testID="dependent_list_item"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine2} />
      </View>
    )
  }
  const addAssetButtonView = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          const dataValue = {
            pageCode: props?.route?.params?.code,
            gridCode: props?.route?.params?.gridCode,
            entityid: props?.route?.params?.entityID,
          }
          props.navigation.navigate('AddViewAssetsBusiness', { dataValue })
        }}
      >
        <Text
          stylesContainerText={styles.addTo}
          children={t('AssetsBusiness:ADD')}
          testID="dependent_list_item"
        />
      </TouchableOpacity>
    )
  }

  const renderHiddenItem = data => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.stylesSwipeViewStyle}
          onPress={() => deleteDependent(data?.item.assetId)}
        >
          <Text
            children={t('common:DELETE')}
            stylesContainerText={styles.stylesSwipeTextStyle}
            testID="dependent_list_item"
          />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <ScrollView style={styles.mainScrollView}>
        <View >
          <Spinner
            visible={isAsstesData}
            textContent={t('common:LOADING')}
            size={'large'}
            textStyle={loaderStyle.spinnerTextStyle}
          />
          <Divider />

          <Text
            stylesContainerText={styles.dependentTitleItem}
            children={t('AssetsBusiness:IN2022')}
            testID="dependent_list_item"
          />
          <View style={styles.yesNoBack}>
            {!fetching && (
              <YesNoButton
                callback={YesNoCallback}
                apiKey="foreignAccount"
                title={t('AssetsBusiness:ACQUIRE')}
                defaultValue={
                  displayData?.assets === 'Y'
                    ? YesNoResult.YES
                    : displayData?.assets === 'N'
                    ? YesNoResult.NO
                    : YesNoResult.NONE
                }
              />
            )}
          </View>
          <View style={styles.switchView}>
            <Text
              stylesContainerText={styles.uploaderText}
              children={t('AssetsBusiness:UPLOAD')}
              testID="dependent_list_item"
            />
            <Switch
              trackColor={{ false: Colors.grayish, true: Colors.blueOne }}
              thumbColor={
                isSitchEnabledForgiven ? Colors.white : Colors.grayOne
              }
              ios_backgroundColor={Colors.white}
              onValueChange={dtToggleSwitchForgiven}
              value={isSitchEnabledForgiven}
            />
          </View>
          <View style={styles.assetsView}>
            <View style={styles.swipeListViewStyle}>
              <Text
                stylesContainerText={styles.dependentItem}
                children={t('task:ASSETS')}
                testID="dependent_list_item"
              />
              <View style={styles.horizontalLine2} />
              <SwipeListView
                data={dataModel}
                recalculateHiddenLayout={true}
                renderItem={renderItem}
                refreshing={isAsstesData}
                keyExtractor={item => item?.id}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={0}
                rightOpenValue={-100}
              />
              {addAssetButtonView()}
              <View style={styles.horizontalLine2} />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.finishLaterButtonContainer,
            {
              backgroundColor: isSelected ? Colors.white : Colors.testColorBlue,
            },
          ]}
          onPress={() => {
            toggleBottomButton(false)
          }}
        >
          <Text
            stylesContainerText={{
              color: isSelected ? Colors.black : Colors.white,
            }}
            children={'Finish Later'}
            testID="dependent_list_item"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.doneButtonContainer,
            {
              backgroundColor: isSelected ? Colors.testColorBlue : Colors.white,
            },
          ]}
          onPress={() => {
            toggleBottomButton(true)
          }}
        >
          <Text
            stylesContainerText={{
              color: isSelected ? Colors.white : Colors.black,
            }}
            children={t('common:DONE')}
            testID="dependent_list_item"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
export default AssetsBusinessScreen
