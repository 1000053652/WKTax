import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import styles from './styles'
import Text from '../../../../src/theme/common/Text'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import useAboutYouBusiness from './hooks/useAboutYouBusiness'
import { imageConstant } from '../../../../src/theme/Images'
import { useForm } from 'react-hook-form'
import { Colors } from '../../../../src/theme/constants'
import { glbStyles } from '../../../../src/styles/global'

const AboutYouBusiness = ({ navigation }: ApplicationScreenProps) => {
  const { t } = useTranslation()
  const isDone = ''
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  const {
    isFetching,
    aboutYouBusinessEntity,
    aboutYouAddressEntity,
    aboutYouPrimaryContactEntity,
    aboutYouUpdateNodeEntity,
    submitFinishDoneAboutBusiness,
  } = useAboutYouBusiness({ navigation })

  const empltyView = () => {
    return (
      <View>
        <View style={styles.horizontalLine} />
        <View style={styles.empltyView} />
        <View style={styles.horizontalLine} />
      </View>
    )
  }

  const businessUIView = () => {
    return (
      <TouchableOpacity
        style={styles.subContainer}
        onPress={() =>
          navigation.navigate('ViewUpdateBusiness', {
            aboutYouBusinessEntity: aboutYouBusinessEntity,
          })
        }
      >
        <View style={styles.titleItem}>
          <Text
            stylesContainerText={styles.titleStyle}
            children={t('questionnaireBusiness:BUSINESS')}
            testID="about.lable.title.buniness"
          />
          <Image style={styles.img} source={imageConstant.leftArow} />
        </View>
        <View style={styles.multiRowItem}>
          <View style={styles.multiItemOne}>
            <Text
              stylesContainerText={styles.fieldStyle}
              children={t('questionnaireBusiness:BUSINESS_NAME')}
              testID="about.lable.address"
            />
            <Text
              stylesContainerText={styles.valueStyle}
              children={aboutYouBusinessEntity?.name}
              testID="about.value.address"
            />
            <Text
              stylesContainerText={styles.valueStyle}
              children={aboutYouBusinessEntity?.nameContinued}
              testID="about.value.address"
            />
            <Text
              stylesContainerText={styles.fieldStyle}
              children={t('questionnaireBusiness:YEAR_END')}
              testID="about.lable.city"
            />
            <Text
              stylesContainerText={styles.valueStyle}
              children={aboutYouBusinessEntity?.yearEnd}
              testID="about.value.city"
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const addressUIView = () => {
    return (
      <TouchableOpacity
        style={styles.subContainer}
        onPress={() =>
          navigation.navigate('ViewUpdateAddress', {
            aboutYouAddressEntity: aboutYouAddressEntity,
          })
        }
      >
        <View style={styles.titleItem}>
          <Text
            stylesContainerText={styles.titleStyle}
            children={t('questionnaireBusiness:ADDRESS')}
            testID="about.lable.title.buniness"
          />
          <Image style={styles.img} source={imageConstant.leftArow} />
        </View>
        <View style={styles.multiRowItem}>
          <View style={styles.multiItemOne}>
            <Text
              stylesContainerText={styles.fieldStyle}
              children={t('questionnaireBusiness:STREET_ADDRESS')}
              testID="about.lable.address"
            />
            <Text
              stylesContainerText={styles.valueStyle}
              children={aboutYouAddressEntity?.street}
              testID="about.value.address"
            />
            <Text
              stylesContainerText={styles.fieldStyle}
              children={t('questionnaireBusiness:CITY')}
              testID="about.lable.city"
            />
            <Text
              stylesContainerText={styles.valueStyle}
              children={aboutYouAddressEntity?.city}
              testID="about.value.city"
            />

            <Text
              stylesContainerText={styles.fieldStyle}
              children={t('questionnaireBusiness:STATE')}
              testID="about.lable.city"
            />
            <Text
              stylesContainerText={styles.valueStyle}
              children={aboutYouAddressEntity?.state}
              testID="about.value.city"
            />
            <Text
              stylesContainerText={styles.fieldStyle}
              children={t('questionnaireBusiness:ZIP_POSTAL')}
              testID="about.lable.city"
            />
            <Text
              stylesContainerText={styles.valueStyle}
              children={aboutYouAddressEntity?.zipCode}
              testID="about.value.city"
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  const PrimaryContactUIView = () => {
    return (
      <TouchableOpacity
        style={styles.subContainer}
        onPress={() =>
          navigation.navigate('ViewUpdatePrimaryContact', {
            aboutYouPrimaryContactEntity: aboutYouPrimaryContactEntity,
          })
        }
      >
        <View style={styles.titleItem}>
          <Text
            stylesContainerText={styles.titleStyle}
            children={t('questionnaireBusiness:PRIMARY_CONTACT')}
            testID="about.lable.title.taxpayer"
          />
          <Image style={styles.img} source={imageConstant.leftArow} />
        </View>

        <View>
          <Text
            stylesContainerText={styles.fieldStyle}
            children={t('questionnaireBusiness:FIRSTNAME')}
            testID="about.lable.name"
          />
          <Text
            stylesContainerText={styles.valueStyle}
            children={aboutYouPrimaryContactEntity?.firstName}
            testID="about.value.name"
          />
          <Text
            stylesContainerText={styles.fieldStyle}
            children={t('questionnaireBusiness:LASTNAME')}
            testID="about.lable.name"
          />
          <Text
            stylesContainerText={styles.valueStyle}
            children={aboutYouPrimaryContactEntity?.lastName}
            testID="about.value.name"
          />
          <Text
            stylesContainerText={styles.fieldStyle}
            children={t('questionnaireBusiness:EMAIL')}
            testID="about.lable.email"
          />
          <Text
            stylesContainerText={styles.valueStyleBlue}
            children={aboutYouPrimaryContactEntity?.email}
            testID="about.value.email"
          />

          <Text
            stylesContainerText={styles.fieldStyle}
            children={t('questionnaireBusiness:BUSINESS_PHONE')}
            testID="about.lable.dphone"
          />
          <Text
            stylesContainerText={styles.valueStyleBlue}
            children={aboutYouPrimaryContactEntity?.phone}
            testID="about.value.dphone"
          />

          <Text
            stylesContainerText={styles.fieldStyle}
            children={t('questionnaireBusiness:MOBILE_PHONE')}
            testID="about.lable.occupation"
          />
          <Text
            stylesContainerText={styles.valueStyleBlue}
            children={aboutYouPrimaryContactEntity?.mobile}
            testID="about.value.occupation"
          />
        </View>
      </TouchableOpacity>
    )
  }

  const annualUIView = () => {
    return (
      <TouchableOpacity
        style={styles.subContainerAnnual}
        onPress={() =>
          navigation.navigate('ViewUpdateAnnual', {
            aboutYouUpdateNodeEntity: aboutYouUpdateNodeEntity,
          })
        }
      >
        <View style={styles.titleItem}>
          <Text
            stylesContainerText={styles.titleStyle}
            children={t('questionnaireBusiness:ANNUAL_UPDATE')}
            testID="about.lable.title.taxpayer"
          />
          <Image style={styles.img} source={imageConstant.leftArow} />
        </View>

        <Text
          stylesContainerText={
            aboutYouUpdateNodeEntity?.notes == ''
              ? styles.fieldStyleAnnualUpdateGray
              : styles.fieldStyleAnnualUpdate
          }
          children={
            aboutYouUpdateNodeEntity?.notes == ''
              ? t('questionnaireBusiness:HOW_DID_YOUR_YEAR_GO')
              : aboutYouUpdateNodeEntity?.notes
          }
          testID="about.value.occupation"
        />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <ScrollView>
        <Spinner
          visible={isFetching}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />
        {empltyView()}
        {businessUIView()}
        {empltyView()}
        {addressUIView()}
        {empltyView()}
        {PrimaryContactUIView()}
        {empltyView()}
        {annualUIView()}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.finishLaterButtonContainer,
            {
              backgroundColor: Colors.white,
            },
          ]}
          onPress={() => {
            submitFinishDoneAboutBusiness(false)
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
            submitFinishDoneAboutBusiness(true)
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

export default AboutYouBusiness
