import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { YesNoButtonProps, YesNoResult } from './types'
import ListItem from '../ListItem'
import { Colors, FontFamily, moderateScale } from '../../constants'
import { Divider } from 'react-native-paper'
import { convertStringToNumber } from '../../../screens/FilingDetails/utils'
import { useTranslation } from 'react-i18next'
import Text from '../Text/index'

const YesNoButton = (props: YesNoButtonProps) => {
  const [isynobuttonStatus, setYnobuttonStatus] = useState(props.defaultValue)
  const { t } = useTranslation()
  const colorChangeForYes = (index: number) => {
    if (isynobuttonStatus == YesNoResult.YES) {
      return Colors.yesBackground
    } else {
      return null
    }
  }

  const textColorChangeForYes = () => {
    if (isynobuttonStatus == YesNoResult.YES) {
      return Colors.testColorBlue
    } else {
      return Colors.black
    }
  }
  const colorChangeForNO = (index: number) => {
    if (isynobuttonStatus == YesNoResult.NO) {
      return Colors.yesBackground
    } else {
      return null
    }
  }
  const bordercolorChangeForYes = () => {
    if (isynobuttonStatus === YesNoResult.YES) {
      return Colors.testColorBlue
    } else {
      return Colors.borderColor
    }
  }
  const textColorChangeForNO = (index: number) => {
    if (isynobuttonStatus == YesNoResult.NO) {
      return Colors.testColorBlue
    } else {
      return Colors.black
    }
  }
  const bordercolorChangeForNO = () => {
    if (isynobuttonStatus === YesNoResult.NO) {
      return Colors.testColorBlue
    } else {
      return Colors.borderColor
    }
  }
  const pressquestionaries = (buttonType: boolean, index: number) => {
    if (!props.disable) {
      const state = buttonType ? 1 : 0
      if (
        isynobuttonStatus?.length > 0 &&
        state === convertStringToNumber(isynobuttonStatus as string)
      ) {
        setYnobuttonStatus('')
        props.callback(YesNoResult.NONE, props)
        return
      }
      if (buttonType) {
        setYnobuttonStatus('1')
        props.callback(YesNoResult.YES, props)
      } else {
        setYnobuttonStatus('0')
        props.callback(YesNoResult.NO, props)
      }
    }
  }

  return (
    <View style={styles.subContainer}>
      <ListItem
        leftSlot={
          <View
            style={
              props.leftStyle == undefined ? styles.leftView : props.leftStyle
            }
          >
            <Text stylesContainerText={styles.leftText} testID={''}>
              {props.title}
            </Text>
          </View>
        }
        title=""
        rightSlot={
          <View>
            <Text
              stylesContainerText={
                props.titleAbove != undefined
                  ? styles.titleTxt
                  : { height: '0%' }
              }
              testID={''}
            >
              {props.titleAbove}
            </Text>
            <View style={styles.rightViewContainer}>
              <TouchableOpacity
                testID="Yes"
                style={[
                  styles.yesButton,

                  {
                    backgroundColor: colorChangeForYes(props.index as number),
                    borderWidth: 1.5,

                    borderColor: bordercolorChangeForYes(),
                  },
                ]}
                onPress={() => pressquestionaries(true, props.index as number)}
              >
                <Text
                  testID="Yes"
                  stylesContainerText={{
                    color: textColorChangeForYes(),
                  }}
                >
                  {t('common:YES')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.yesButton,
                  {
                    backgroundColor: colorChangeForNO(),
                    borderWidth: 1.5,
                    borderColor: bordercolorChangeForNO(),
                  },
                ]}
                onPress={() => pressquestionaries(false, props.index as number)}
              >
                <Text
                  testID="No"
                  stylesContainerText={{
                    color: textColorChangeForNO(props.index as number),
                  }}
                >
                  {t('common:NO')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
      <Divider />
    </View>
  )
}

export default YesNoButton

export const styles = StyleSheet.create({
  homeSafeAreaView: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  subContainer: {
    marginRight: 20,
  },
  leftView: {
    fontSize: 16,
    width: '85%',
  },
  rightViewContainer: {
    marginLeft: -60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  yesButton: {
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  leftText: {
    fontSize: moderateScale(14),
    color: Colors.textDullColor,
    fontWeight: '400',
    width: '85%',
  },
  titleTxt: {
    marginLeft: -60,
    fontSize: moderateScale(12),
    fontStyle: 'normal',
    marginBottom: moderateScale(3),
    fontFamily: FontFamily.FiraSansRegular,
    fontWeight: '500',
    color: Colors.grayTint1,
  },
})
