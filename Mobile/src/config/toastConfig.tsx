import React from 'react'
import { ToastConfig } from 'react-native-toast-message'
import { glbStyles } from '../styles/global'
import { TouchableOpacity, View } from 'react-native'
import Text from '../theme/common/Text'
import { Image } from 'react-native-elements'
import { imageConstant } from '../theme/Images'

export const toastConfig: ToastConfig = {
  toastSuccess: ({ text1, text2, props, onPress }) => (
    <View style={glbStyles.successToast}>
      <Image
        source={imageConstant.toastSuccess}
        style={glbStyles.toatMessageIcon}
        resizeMode={'contain'}
      />
      <View style={glbStyles.toatMessagesView}>
        {text1 && (
          <Text
            testID="toast_text1"
            children={text1}
            stylesContainerText={glbStyles.text1ToastMessage}
          />
        )}
        {text2 && (
          <Text
            testID="toast_text2"
            children={text2}
            stylesContainerText={glbStyles.text2ToastMessage}
          />
        )}
      </View>
      <TouchableOpacity
        style={glbStyles.toatMessageCloseButton}
        onPress={onPress}
      >
        <Image
          source={imageConstant.filledCloseGray}
          style={glbStyles.toastMessageButtonImage}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  ),
  toastError: ({ text1, text2, props, onPress }) => (
    <View style={glbStyles.errorToast}>
      <Image
        source={imageConstant.toastError}
        style={glbStyles.toatMessageIcon}
        resizeMode={'contain'}
      />
      <View style={glbStyles.toatMessagesView}>
        {text1 && (
          <Text
            testID="toast_text1"
            children={text1}
            stylesContainerText={glbStyles.text1ToastMessage}
          />
        )}
        {text2 && (
          <Text
            testID="toast_text2"
            children={text2}
            stylesContainerText={glbStyles.text2ToastMessage}
          />
        )}
      </View>
      <TouchableOpacity
        style={glbStyles.toatMessageCloseButton}
        onPress={onPress}
      >
        <Image
          source={imageConstant.filledCloseGray}
          style={glbStyles.toastMessageButtonImage}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  ),
}
