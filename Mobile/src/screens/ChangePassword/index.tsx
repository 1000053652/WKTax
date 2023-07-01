import React, { useState } from 'react'
import { SafeAreaView, View, Alert } from 'react-native'
import Button from '../../theme/common/Button'
import Input from '../../theme/common/Input'
import Text from '../../theme/common/Text'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import EyeOn from '../../Assets/EyeOn.png'
import EyeOff from '../../Assets/EyeOff.png'
import { useForm, Controller } from 'react-hook-form'
import { useLazyChangePasswordDataAPIQuery } from '../../../src/services/modules/profile'
import { useLazyLogoutAPIQuery } from '../../../src/services/modules/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLogin, setSessionData } from '../../../src/store/auth/login'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import UserErrorValidation from '../../services/errorHandling/UserErrorValidation'
import { errorMessageToast } from '../Error/utils'
import { glbStyles } from '../../../src/styles/global'

const ChangePassword = ({ navigation }) => {
  const { t } = useTranslation()
  const profileData = useSelector(state => state?.profile?.profileData)
  const [changePasswordDataAPI, { data, isError, error }] =
    useLazyChangePasswordDataAPIQuery()
  const [logoutAPI, { isSuccess }] = useLazyLogoutAPIQuery()
  const dispatch = useDispatch()
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(true)
  const [showPassword, setShowPassword] = useState(true)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(true)

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  })

  if (isSuccess) {
    dispatch(setIsLogin(false))
    dispatch(setSessionData(false))
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  }

  const onPressIconCurrent = () => {
    setShowPasswordCurrent(!showPasswordCurrent)
  }

  const onPressIcon = () => {
    setShowPassword(!showPassword)
  }

  const onPressIconConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm)
  }

  const cancelClick = () => {
    navigation.goBack()
  }

  const logout = () => {
    logoutAPI()
  }

  const onSubmit = data => {
    if (data.password != data.confirmPassword) {
      alert(t('common:PASSWORD_NOT_MATCHED'))
    } else {
      const payloadData = {
        currentPassword: data.currentPassword,
        newPassword: data?.password,
      }

      const allPayload = {
        payloadData: payloadData,
        indentity: profileData?.id,
      }

      changePasswordDataAPI(allPayload)
        .unwrap()
        .then(res => {
          Alert.alert(
            t('changePassword:CHANGE_PASSWORD'),
            t('changePassword:YOU_HAVECHANGED'),
            [
              {
                text: t('homeModule:LOG_IN'),
                onPress: () => logout(),
                style: 'default',
              },
            ]
          )
        })
        .catch(err => {
          UserErrorValidation(err?.data[0]?.code)
          errorMessageToast(err)
        })
    }
  }
  return (
    <SafeAreaView style={glbStyles.safeAreaViewWithAndroidTopSpace}>
      <KeyboardAwareScrollView>
        <View style={styles.headerViewStyle}>
          <View style={styles.headerViewStyleRow}>
            <Button
              title={t('common:CANCEL')}
              onPress={cancelClick}
              stylesContainer={styles.buttonCancelSaveStyle}
              stylesContainerText={styles.buttonCancelSaveTextStyle}
              testID="changePassword_cancel"
            />
          </View>
          <Text
            children={t('menu:CHANGE_PASSWORD')}
            stylesContainerText={styles.profileHeadingStyle}
            testID="income_schedule_c"
            numberOfLines={1}
          />
          <View style={styles.headerViewStyleRow}>
            <Button
              title={t('common:SAVE')}
              onPress={handleSubmit(onSubmit)}
              stylesContainer={styles.buttonCancelSaveStyleRight}
              stylesContainerText={styles.buttonCancelSaveTextStyleRight}
              testID="changePassword_save"
            />
          </View>
        </View>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              {...register('currentPassword', {
                required: t('changePassword:PLEASE_ENTER_CURRENT_PASSWORD'),
              })}
              label={t('changePassword:CURRENT_PASSWORD')}
              placeholder=""
              error={errors?.currentPassword?.message}
              showError={errors?.currentPassword?.type}
              value={value}
              onChangeText={onChange}
              iconClick={false}
              icon={showPasswordCurrent ? EyeOn : EyeOff}
              iconStyles={styles.iconStyles}
              inputBoxStyles={styles.inputBox}
              labelStyles={styles.labelStyle}
              testID="change_current_password"
              onPressIcon={onPressIconCurrent}
              secureTextEntry={showPasswordCurrent}
            />
          )}
          name="currentPassword"
        />
        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...register('password', {
                  required: t('changePassword:PLEASE_ENTER_PASSWORD'),
                  maxLength: {
                    value: 128,
                    message: t('changePassword:PLEASE_ENTER_LESS_THAN'),
                  },
                  minLength: {
                    value: 9,
                    message: t('changePassword:PLEASE_ENTER_MORE_THAN_9'),
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: 'invalid',
                  },
                })}
                label={t('changePassword:PASSWORD')}
                placeholder=""
                error={errors?.password?.message}
                showError={errors?.password?.type}
                value={value}
                onChangeText={onChange}
                iconClick={false}
                icon={showPassword ? EyeOn : EyeOff}
                iconStyles={styles.iconStyles}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
                testID="change__password"
                onPressIcon={onPressIcon}
                secureTextEntry={showPassword}
              />
            )}
            name="password"
          />
        </View>
        <Text
          stylesContainerText={styles.textPasswordValidationStyle}
          children={t('changePassword:MUSR_BE_BETWEEN')}
          testID="profile_special_characters1"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              {...register('confirmPassword', {
                required: t('changePassword:PLEASE_ENTER_CONFIRM_PASSWORD'),
                maxLength: {
                  value: 128,
                  message: t('changePassword:PLEASE_ENTER_LESS_THAN'),
                },
                minLength: {
                  value: 9,
                  message: t('changePassword:PLEASE_ENTER_MORE_THAN_9'),
                },
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message: 'invalid',
                },
              })}
              label={t('changePassword:CONFIRM_PASSWORD')}
              placeholder=""
              error={errors?.confirmPassword?.message}
              showError={errors?.confirmPassword?.type}
              value={value}
              onChangeText={onChange}
              iconClick={false}
              icon={showPasswordConfirm ? EyeOn : EyeOff}
              iconStyles={styles.iconStyles}
              inputBoxStyles={styles.inputBox}
              labelStyles={styles.labelStyle}
              testID="change_confirm_password"
              onPressIcon={onPressIconConfirm}
              secureTextEntry={showPasswordConfirm}
            />
          )}
          name="confirmPassword"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default ChangePassword
