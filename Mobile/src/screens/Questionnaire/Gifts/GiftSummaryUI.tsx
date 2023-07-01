import React from 'react'
import { View, SafeAreaView, FlatList, Switch } from 'react-native'
import Text from '../../../theme/common/Text'
import styles from './styles'
import { glbCustomerHeaderOptions, glbStyles } from '.././../../../src/styles/global'
import { Header, Image } from 'react-native-elements'
import { useTranslation } from 'react-i18next'
import { aList } from './utils'
import YesNoButton from '../../../../src/theme/common/YesNoButton'
import { Colors, moderateScale } from '../../../../src/theme/constants'
import { TouchableOpacity } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { imageConstant } from '../../../theme/Images'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../Common/LoaderStyle'
import WKSwipeListView from "../../../theme/common/SwipeList/WKSwipeListView";

export type GiftSummaryUIType = {
  giftData: []
  forGivenData: []
  isRefresh: boolean
  disableAll: boolean
  isSitchEnabledGift: boolean
  isSitchEnabledForgiven: boolean
  dtToggleSwitch: () => void
  dtToggleSwitchForgiven: () => void
  YesNoCallback: () => void
  onPressAddGift: () => void
  onPressAddForgiven: () => void
  navigateToScreen: (arg0: any) => void
  navigateToScreenForgiven: (arg0: any) => void
  deleteGift: (arg0: any, arg1: boolean) => void
  submitGiftDetails: (arg0: string) => void
  isFetching: boolean
}

const GiftSummaryUI = ({
  giftData,
  forGivenData,
  isRefresh,
  disableAll,
  isSitchEnabledGift,
  isSitchEnabledForgiven,
  dtToggleSwitch,
  dtToggleSwitchForgiven,
  YesNoCallback,
  onPressAddGift,
  onPressAddForgiven,
  navigateToScreen,
  navigateToScreenForgiven,
  deleteGift,
  submitGiftDetails,
  isFetching,
}: GiftSummaryUIType) => {
  const { t } = useTranslation()

  const renderItemGift = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigateToScreen(item)}
        >
          <Text
            stylesContainerText={styles.giftItem}
            children={JSON.parse(item?.fieldValue)?.txtName}
            testID="dependent_list_item"
          />
          <Image style={styles.img} source={imageConstant.rightArrow} />
        </TouchableOpacity>
        <View style={styles.horizontalLine2} />
      </View>
    )
  }

  const renderItemForgiven = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigateToScreenForgiven(item)}
        >
          <Text
            stylesContainerText={styles.giftItem}
            children={JSON.parse(item?.fieldValue)?.txtName}
            testID="dependent_list_item"
          />
          <Image style={styles.img} source={imageConstant.rightArrow} />
        </TouchableOpacity>
        <View style={styles.horizontalLine2} />
      </View>
    )
  }

  const headerField = item => {
    return (
      <View style={styles.headerFieldView}>
        <Text
          stylesContainerText={styles.headerFieldFirst}
          children={item.title}
          testID={'gift_header'}
        />
      </View>
    )
  }

  const baseQestionItem = item => {
    return (
      <View
        pointerEvents={
          disableAll
            ? item.title ==
              t('questionnaireBusiness:DID_YOU_MAKE_ANY_SIGNIFICANT_GIFT')
              ? 'auto'
              : 'none'
            : 'auto'
        }
      >
        {isRefresh && (
          <YesNoButton
            callback={YesNoCallback}
            apiKey={item.answerKey}
            title={item.title}
            defaultValue={item?.status}
          />
        )}
      </View>
    )
  }

  const renderGiftItem = item => {
    return (
      <View
        pointerEvents={disableAll ? 'none' : 'auto'}
        style={styles.giftItemViewStylew}
      >
        <View style={{ backgroundColor: 'white' }}>
          <Text
            children={item.title}
            stylesContainerText={styles.headerField}
            testID={''}
          />
        </View>

        <View>
          <View style={styles.giftForgivenStyle}>
            <Switch
              trackColor={{ false: Colors.grayish, true: Colors.green }}
              thumbColor={isSitchEnabledGift ? Colors.white : Colors.grayOne}
              ios_backgroundColor={Colors.black}
              onValueChange={dtToggleSwitch}
              value={isSitchEnabledGift}
            />

            <Text
              children={item.switchText}
              stylesContainerText={styles.headerField}
              testID=""
            />
          </View>
        </View>

        <View style={{ margin: moderateScale(10) }}>
          <Text
            children={item.subtitle}
            stylesContainerText={styles.subTitleTextStyle}
            testID=""
          />
        </View>
        <View style={styles.horizontalLine2} />

        <WKSwipeListView
          listData={giftData}
          renderItem={renderItemGift}
          keyExtractor={item => item?.entityID}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <View />
              <TouchableOpacity
                style={styles.stylesSwipeViewStyle}
                onPress={() => deleteGift(data?.item.entityID, true)}
              >
                <Text
                  children={t('common:DELETE')}
                  stylesContainerText={styles.stylesSwipeTextStyle}
                  testID="dependent_list_item"
                />
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={0}
          rightOpenValue={-100}
        />

        <TouchableOpacity style={styles.item} onPress={onPressAddGift}>
          <Text
            stylesContainerText={styles.giftItemButton}
            children={t('questionnaireBusiness:ADD_GIFT')}
            testID="add_gift"
          />
        </TouchableOpacity>
      </View>
    )
  }

  const renderGiftItemForgiven = item => {
    return (
      <View
        pointerEvents={disableAll ? 'none' : 'auto'}
        style={styles.giftItemViewStylew}
      >
        <View>
          <Text
            children={item.title}
            stylesContainerText={styles.headerField}
            testID={''}
          />
        </View>

        <View>
          <View style={styles.giftForgivenStyle}>
            <Switch
              trackColor={{ false: Colors.grayish, true: Colors.green }}
              thumbColor={
                isSitchEnabledForgiven ? Colors.white : Colors.grayOne
              }
              ios_backgroundColor={Colors.black}
              onValueChange={dtToggleSwitchForgiven}
              value={isSitchEnabledForgiven}
            />

            <Text
              children={item.switchText}
              stylesContainerText={styles.headerField}
              testID=""
            />
          </View>
        </View>

        <View style={{ margin: moderateScale(10) }}>
          <Text
            children={item.subtitle}
            stylesContainerText={styles.subTitleTextStyle}
            testID=""
          />
        </View>
        <View style={styles.horizontalLine2} />

        <WKSwipeListView
            listData={forGivenData}
          renderItem={renderItemForgiven}
          keyExtractor={item => item?.entityID}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <View />
              <TouchableOpacity
                style={styles.stylesSwipeViewStyle}
                onPress={() => deleteGift(data?.item.entityID, false)}
              >
                <Text
                  children={t('common:DELETE')}
                  stylesContainerText={styles.stylesSwipeTextStyle}
                  testID="dependent_list_item"
                />
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={0}
          rightOpenValue={-100}
         />

        <TouchableOpacity style={styles.item} onPress={onPressAddForgiven}>
          <Text
            stylesContainerText={styles.giftItemButton}
            children={t('questionnaireBusiness:ADD_FORGIVEN_DEBT')}
            testID="add_forgiven_gift"
          />
        </TouchableOpacity>
      </View>
    )
  }

  const renderQuestions = ({ item }) => {
    switch (item.id) {
      case '0':
        return headerField(item)
        break

      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        return baseQestionItem(item)
        break

      case '10':
        return renderGiftItem(item)
        break

      case '11':
        return renderGiftItemForgiven(item)
        break
    }
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
  
      <Spinner
        visible={isFetching}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />

      <FlatList
        data={aList}
        keyExtractor={item => item.id}
        renderItem={renderQuestions}
        refreshing={isRefresh}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.finishLaterButtonContainer,
            {
              backgroundColor: Colors.white,
            },
          ]}
          onPress={() => {
            submitGiftDetails('0')
          }}
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
          onPress={() => {
            submitGiftDetails('1')
          }}
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

export default GiftSummaryUI
