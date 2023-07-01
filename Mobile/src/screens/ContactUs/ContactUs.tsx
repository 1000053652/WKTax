import React, { useState } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native'

import styles from './styles'
import LocationImage from '../../Assets/LocationImage.png'
import CallImage from '../../Assets/CallImage.png'
import ContactModal from '../../theme/common/Modal'
import { useSelector } from 'react-redux'
import { imageConstant } from '../../theme/Images'
import { glbStyles } from '../../../src/styles/global'

const ContactUsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalDesc, setModalDesc] = useState('')
  const [checkClickItem, setCheckClickItem] = useState('')

  const clientUserFirmDetailsData = useSelector(
    state => state?.home?.clientUserFirmDetailsData
  )
  const logo = useSelector(state => state?.profile?.logo)
  //Open App with Address
  const openMap = async address => {
    const destination = encodeURIComponent(`${address}`)
    const provider = Platform.OS === 'ios' ? 'apple' : 'google'
    const link = `http://maps.${provider}.com/?daddr=${destination}`

    try {
      const supported = await Linking.canOpenURL(link)
      if (supported) Linking.openURL(link)
    } catch (error) {
      console.error(error)
    }
  }
  //Open App with LatLong
  const openMapWitLatLng = async (latitude, longitude) => {
    const scheme = `${Platform.OS === 'ios' ? 'maps' : 'geo'}:0,0?q=`
    const link = Platform.select({
      ios: `${scheme}@${latitude},${longitude}`,
      android: `${scheme}${latitude},${longitude})`,
    })
    try {
      const supported = await Linking.canOpenURL(link)
      if (supported) Linking.openURL(link)
    } catch (error) {
      console.error(error)
    }
  }

  const openActionItem = () => {
    if (checkClickItem == 'call') {
      Linking.openURL(`tel:${modalDesc}`)
    } else if (checkClickItem == 'email') {
      Linking.openURL(`mailto:${modalDesc}`)
    } else if (checkClickItem == 'location') {
      const url = Platform.select({
        ios: `maps:0,0?q=${modalDesc}`,
        android: `geo:0,0?q=${modalDesc}`,
      })

      if (Platform.OS == 'ios') {
        openMap(modalDesc)
      } else {
        Linking.openURL(url)
      }
    }
  }
  const getLink = () => {
    if (clientUserFirmDetailsData?.phone?.phoneNumber) {
      return true
    }
    return false
  }
  const getPhoneNumber = () => {
    if (clientUserFirmDetailsData?.phone?.phoneNumber) {
      return true
    }
    return false
  }
  const getAddress = () => {
    if (
      clientUserFirmDetailsData?.address?.line1 &&
      clientUserFirmDetailsData?.address?.line2 &&
      clientUserFirmDetailsData?.address?.line3 &&
      clientUserFirmDetailsData?.address?.city &&
      clientUserFirmDetailsData?.address?.state &&
      clientUserFirmDetailsData?.address?.postalCode
    ) {
      return true
    }
    return false
  }
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <ScrollView>
        <View style={styles.headingLabelView}>
          <Text style={styles.headingLabel}>Your Professional Team</Text>
          <View>
            {logo ? (
              <Image
                style={styles.contactLogoImageStyle}
                source={{ uri: logo }}
                resizeMode="contain"
              />
            ) : null}
          </View>
        </View>
        <Text style={styles.nameStyle}>{clientUserFirmDetailsData?.name}</Text>
        <View style={styles.mainRowItemView}>
          <View
            style={[styles.horizontalLine, { height: getAddress() ? 1 : 0 }]}
          />
          {getAddress() && (
            <TouchableOpacity
              style={styles.rowItemStyle}
              onPress={() => {
                setModalTitle('Get Directions')
                setCheckClickItem('location')
                setModalVisible(true)
                setModalDesc(
                  clientUserFirmDetailsData?.address?.line1 +
                    clientUserFirmDetailsData?.address?.line2 +
                    ' ' +
                    clientUserFirmDetailsData?.address?.line3 +
                    ' ' +
                    clientUserFirmDetailsData?.address?.city +
                    ', ' +
                    clientUserFirmDetailsData?.address?.state +
                    ' ' +
                    clientUserFirmDetailsData?.address?.postalCode
                )
              }}
            >
              <Image
                style={styles.rowItemImage}
                source={LocationImage}
                resizeMode="contain"
              />
              <Text style={styles.rowItemText}>
                {clientUserFirmDetailsData?.address?.line1}{' '}
                {clientUserFirmDetailsData?.address?.line2}{' '}
                {clientUserFirmDetailsData?.address?.line3}
                {'\n'}
                {clientUserFirmDetailsData?.address?.city}
                {clientUserFirmDetailsData?.address?.line1 && (
                  <View>
                    <Text>, </Text>
                  </View>
                )}
                {clientUserFirmDetailsData?.address?.state}{' '}
                {clientUserFirmDetailsData?.address?.postalCode}
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={[
              styles.horizontalLine,
              { height: getPhoneNumber() ? 1 : 0 },
            ]}
          />
          {getPhoneNumber() && (
            <TouchableOpacity
              style={styles.rowItemStyle}
              onPress={() => {
                setModalTitle('Open Phone')
                setModalDesc(clientUserFirmDetailsData?.phone?.phoneNumber)
                setModalVisible(true)
                setCheckClickItem('call')
              }}
            >
              <Image
                style={styles.rowItemImage}
                source={CallImage}
                resizeMode="contain"
              />
              <Text style={styles.rowItemText}>
                {clientUserFirmDetailsData?.phone?.phoneNumber}
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={[styles.horizontalLine, { height: getLink() ? 1 : 0 }]}
          />
          {getLink() && (
            <TouchableOpacity
              style={styles.rowItemStyle}
              onPress={() => {
                Linking.openURL(clientUserFirmDetailsData?.webPageUrl)
              }}
            >
              <Image
                style={styles.rowItemImage}
                source={imageConstant.url_linkIcon}
                resizeMode="contain"
              />
              <Text style={styles.rowItemText}>
                {clientUserFirmDetailsData?.webPageUrl}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <ContactModal
          onPress={() => setModalVisible(false)}
          onPressText={openActionItem}
          title={modalTitle}
          description={modalDesc}
          buttonText="Cancel"
        />
      </Modal>
    </SafeAreaView>
  )
}
export default ContactUsScreen
