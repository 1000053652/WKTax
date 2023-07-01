import React, { useEffect, useState, PropsWithChildren } from 'react'
import { Alert, SafeAreaView, ScrollView, View } from 'react-native'
import { ApplicationScreenProps } from '../../../@types/navigation'
import Button from '../../theme/common/Button'
import Input from '../../theme/common/Input'
import Text from '../../theme/common/Text'
import { Dropdown } from 'react-native-element-dropdown'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { checkProfileSave } from '../../store/profile'

import {
  useLazyGetProfileDataAPIQuery,
  useLazyPutProfileDataAPIQuery,
} from '../../../src/services/modules/profile'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { setIsLogin, setSessionData } from '../../..//src/store/auth/login'
import { errorMessageToast } from '../Error/utils'
import { glbStyles } from '../../../src/styles/global'
const ProfileScreen = ({ navigation }: ApplicationScreenProps) => {
  const [countryCode1, setCountryCode1] = useState('')
  const [countryCode2, setCountryCode2] = useState('')

  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const [isFocus, setIsFocus] = useState(false)
  const [getProfileDataAPI] = useLazyGetProfileDataAPIQuery()
  const [putProfileDataAPI, { data }] = useLazyPutProfileDataAPIQuery()

  const selectOne = [{ abr: 'Select', label: 'Select', value: 'Select' }]

  const countryData = useSelector(state => state?.profile?.countryData)
  const profileData = useSelector(state => state?.profile?.profileData)
  const [secondDropDownRequired, setSecondDropDownRequired] = useState(false)

  const loginAgain = () => {
    dispatch(checkProfileSave('ProfileNotSaved'))
    dispatch(setIsLogin(false))
    dispatch(setSessionData(false))
  }

  useEffect(() => {
    getProfileDataAPI()
  }, [data])

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      firstName: profileData?.firstName,
      middleName: profileData?.middleName,
      lastName: profileData?.lastName,
      userID: profileData?.userName,
      email: profileData?.email,
      phone1: profileData?.phoneNumber?.number,
      phone2: profileData?.secondaryPhoneNumber?.number,
      ext1: profileData?.phoneNumber?.extension,
      ext2: profileData?.secondaryPhoneNumber?.extension,
    },
  })

  useFocusEffect(
    React.useCallback(() => {
      getProfileDataAPI()
      setCountryCode1({
        abr: profileData?.phoneNumber?.countryISO2Code,
        label:
          profileData?.phoneNumber?.countryCode +
          ' ' +
          profileData?.phoneNumber?.countryISO2Code,
        value: profileData?.phoneNumber?.countryCode,
      })

      setCountryCode2({
        abr: profileData?.secondaryPhoneNumber?.countryISO2Code,
        label:
          profileData?.secondaryPhoneNumber?.countryCode +
          ' ' +
          profileData?.secondaryPhoneNumber?.countryISO2Code,
        value: profileData?.secondaryPhoneNumber?.countryCode,
      })
    }, [])
  )

  const cancelClick = () => {
    navigation.goBack()
  }

  const onSubmit = data => {
    if (data?.email == data?.userID) {
      alert(t('homeModule:EMAIL_AND_USER_ID_CANNT'))
    } else {
      const payloadData = {
        userName: data?.userID,
        email: data?.email,
        firstName: data?.firstName,
        middleName: data?.middleName,
        lastName: data?.lastName,
        phoneNumber: {
          countryCode: countryCode1.value,
          number: data?.phone1,
          extension: data?.ext1,
          countryiso2code: countryCode1.abr,
        },
        secondaryPhoneNumber: {
          countryCode:
            countryCode2?.value == 'Select' ? '' : countryCode2?.value,
          number: data?.phone2,
          extension: data?.ext2,
          countryiso2code:
            countryCode2?.abr == 'Select' ? '' : countryCode2?.abr,
        },
      }

      const allPayload = {
        payloadData: payloadData,
        indentity: profileData?.id,
      }
      putProfileDataAPI(allPayload)
        .unwrap()
        .then(res => {
          if (profileData?.userName != data.userID) {
            Alert.alert(
              t('homeModule:CHANGE_USER_PROFILE'),
              t('homeModule:YOU_HAVE_CHANGED_YOUR_USER_ID'),
              [
                {
                  text: t('homeModule:LOG_IN'),
                  onPress: () => loginAgain(),
                  style: 'default',
                },
              ]
            )
          } else {
            dispatch(checkProfileSave('ProfileNotSaved'))
            navigation.navigate('Main')
          }
        })
        .catch(error => {
          errorMessageToast(error)
        })
    }
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaViewWithAndroidTopSpace}>
      <View style={styles.headerViewStyle}>
        <View style={styles.headerViewStyleRow}>
          <Button
            title={t('common:CANCEL')}
            onPress={cancelClick}
            stylesContainer={styles.buttonCancelSaveStyle}
            stylesContainerText={styles.buttonCancelSaveTextStyle}
            testID="profile_cancel"
          />
        </View>
        <Text
            children={t('menu:USER_PROFILE')}
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
            testID="profile_save"
          />
        </View>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.horizontalLine} />
        <View style={styles.emptyView} />
        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...register('firstName', {
                  required: t('homeModule:PLEASE_ENTER_FIRST'),
                })}
                label={t('homeModule:FIRST_NAME')}
                placeholder=""
                error={errors?.firstName?.message}
                showError={errors?.firstName?.type}
                value={value}
                //onBlur={onBlur}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
                testID="profile_first_name"
              />
            )}
            name="firstName"
          />
        </View>
        <View style={styles.inputBoxView}>
          <View style={styles.viewMiddleNameStyle}>
            <Text
              stylesContainerText={styles.textMiddleNameStyle}
              children={t('homeModule:MIDDLE_NAME')}
              testID="profile_middle_name"
            />

            <Text
              stylesContainerText={styles.textMiddleNameStyle2}
              children="Optional"
              testID="profile_middle_optional"
            />
          </View>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="profile_middle_name"
                {...register('middleName')}
                label=""
                placeholder=""
                error={errors?.middleName?.message}
                showError={errors?.middleName?.type}
                value={value}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="middleName"
          />
        </View>
        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="profile_last_name"
                {...register('lastName', {
                  required: t('homeModule:PLEASE_ENTER_LAST'),
                })}
                label={t('homeModule:LAST_NAME')}
                placeholder=""
                error={errors?.lastName?.message}
                showError={errors?.lastName?.type}
                value={value}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="lastName"
          />
        </View>
        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="profile_userID"
                {...register('userID', {
                  required: t('homeModule:PLEASE_ENTER_USER_ID'),
                  maxLength: {
                    value: 50,
                    message: t('homeModule:PLEASE_ENTER_LESS_THAN_'),
                  },
                  minLength: {
                    value: 7,
                    message: t('homeModule:PLEASE_ENTER_MORE_THAN_'),
                  },
                  pattern: {
                    value: /^[ A-Za-z0-9~!@#$-_+;$]/i,
                    message: 'invalid',
                  },
                })}
                label={t('homeModule:USER_ID')}
                placeholder=""
                error={errors?.userID?.message}
                showError={errors?.userID?.type}
                value={value}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="userID"
          />

          <Text
            stylesContainerText={styles.tetUserIDStyle}
            children={t('homeModule:MUST_BE_BETWEEN_7_50')}
            testID="profile_special_characters1"
          />
          <Text
            stylesContainerText={styles.tetUserIDStyle}
            children={t('homeModule:CAN_ONLY_CONTAIN_ALPHANUMERIC')}
            testID="profile_special_characters2"
          />
          <Text
            stylesContainerText={styles.tetUserIDStyle}
            children={t('homeModule:CAN_NOT_BE_AN_EMAIL')}
            testID="profile_special_characters3"
          />
        </View>
        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="profile_email"
                {...register('email', {
                  required: t('homeModule:PLEASE_ENTER_EMAIL'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter valid email address',
                  },
                })}
                label={t('homeModule:EMAIL')}
                placeholder=""
                error={errors?.email?.message}
                showError={errors?.email?.type}
                value={value}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="email"
          />
        </View>
        <View style={styles.inputBoxView}>
          <Text
            stylesContainerText={styles.textPhoneStyle}
            children={t('homeModule:PHONE')}
            testID="profile_phone1"
          />
          <View style={styles.viewPhoneStyle}>
            <View style={styles.dropdownViewStyle}>
              <Dropdown
                dropdownPosition="top"
                style={[styles.dropdown, isFocus && { borderColor: '' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.selectedTextStyle}
                data={countryData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                textField="text"
                placeholder={
                  profileData?.phoneNumber?.countryCode == ''
                    ? t('common:SELECT')
                    : profileData?.phoneNumber?.countryCode +
                      ' ' +
                      profileData?.phoneNumber?.countryISO2Code
                }
                value={countryCode1}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setCountryCode1(item)
                  setIsFocus(false)
                }}
              />
            </View>
            <View style={styles.phoneInputStyle}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    testID="profile_phone1"
                    {...register('phone1', {
                      required: t('homeModule:PHONE_NUMBER_IS_REQUIRE'),
                      pattern: {
                        value: /^[0-9]*$/,
                        message: t(
                          'homeModule:PHONE_NUMBER_ONLY_CAN_CONTAINS_NUMBER'
                        ),
                      },
                      validate: {
                        require: value => {
                          if (value != '' && countryCode1.value == '')
                            return t('homeModule:COUNTRY_CODE_IS_REQUIRED')
                        },
                      },
                    })}
                    label=""
                    placeholder={t('homeModule:PHONE')}
                    error={errors?.phone1?.message}
                    showError={errors?.phone1?.type}
                    value={value}
                    onChangeText={onChange}
                    iconClick={false}
                    inputBoxStyles={styles.inputBox1}
                    labelStyles={styles.labelStyle}
                    keyboardType="number-pad"
                    maxLength={15}
                  />
                )}
                name="phone1"
              />
            </View>
            <View style={styles.phoneInputExtStyle}>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    testID="profile_ext1"
                    {...register('ext1')}
                    label=""
                    placeholder={t('homeModule:EXT')}
                    error={errors?.ext1?.message}
                    showError={errors?.ext1?.type}
                    value={value}
                    onChangeText={onChange}
                    iconClick={false}
                    inputBoxStyles={styles.inputBoxPhoneRight}
                    labelStyles={styles.labelStyle}
                    keyboardType="number-pad"
                  />
                )}
                name="ext1"
              />
            </View>
          </View>
        </View>
        <View style={styles.emptyView} />
        <View style={styles.inputBoxView}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              stylesContainerText={styles.textPhoneStyle}
              children={t('homeModule:PHONE_2')}
              testID="profile_phone2"
            />
            <Text
              stylesContainerText={styles.textMiddleNameStyle2}
              children="Optional"
              testID="profile_phone2_optional"
            />
          </View>
          <View style={styles.viewPhoneStyle}>
            <View style={styles.dropdownViewStyle}>
              <Dropdown
                dropdownPosition="top"
                style={[styles.dropdown, isFocus && { borderColor: '' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.selectedTextStyle}
                data={[...selectOne, ...countryData]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  profileData?.secondaryPhoneNumber?.countryCode == ''
                    ? t('common:SELECT')
                    : profileData?.secondaryPhoneNumber?.countryCode +
                      ' ' +
                      profileData?.secondaryPhoneNumber?.countryISO2Code
                }
                value={countryCode2}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  if (item?.abr == 'Select') {
                    setSecondDropDownRequired(false)
                  } else {
                    setSecondDropDownRequired(true)
                  }

                  setIsFocus(false)
                  setCountryCode2(item)
                }}
              />
            </View>

            <View style={styles.phoneInputStyle}>
              <Controller
                control={control}
                rules={{
                  required: secondDropDownRequired,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    testID="profile_phone2"
                    control={control}
                    {...register('phone2', {
                      required: secondDropDownRequired
                        ? t('homeModule:SECONDARY_PHONE_REQUIRES_BOTH_COUNTRY')
                        : '',
                      pattern: {
                        value: /^[0-9]*$/,
                        message: t(
                          'homeModule:PHONE_NUMBER_ONLY_CAN_CONTAINS_NUMBER'
                        ),
                      },
                      validate: {
                        require: value => {
                          if (
                            value != '' &&
                            (countryCode2.value == 'Select' ||
                              countryCode2.value == '')
                          )
                            return t(
                              'homeModule:SECONDARY_PHONE_REQUIRES_BOTH_COUNTRY'
                            )
                        },
                      },
                    })}
                    label=""
                    placeholder={t('homeModule:PHONE')}
                    error={errors?.phone2?.message}
                    showError={errors?.phone2?.type}
                    value={value}
                    onChangeText={onChange}
                    iconClick={false}
                    inputBoxStyles={styles.inputBox1}
                    labelStyles={styles.labelStyle}
                    keyboardType="number-pad"
                    maxLength={15}
                  />
                )}
                name="phone2"
              />
            </View>

            <View style={styles.phoneInputExtStyle}>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    testID="profile_ext2"
                    {...register('ext2')}
                    label=""
                    placeholder={t('homeModule:EXT')}
                    error={errors?.ext2?.message}
                    showError={errors?.ext2?.type}
                    value={value}
                    onChangeText={onChange}
                    iconClick={false}
                    inputBoxStyles={styles.inputBoxPhoneRight}
                    labelStyles={styles.labelStyle}
                    keyboardType="number-pad"
                    maxLength={15}
                  />
                )}
                name="ext2"
              />
            </View>
          </View>
        </View>
        <View style={styles.emptyView25} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default ProfileScreen
