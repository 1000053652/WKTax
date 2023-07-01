import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { t } from 'i18next'
const ErrorCard = () => {
  return (
    <View style={styles.errorContainer}>
      <View></View>
      <View style={styles.textContainer}>
        <Text style={styles.errorHead}></Text>
        <Text style={styles.subText}>{t('common:OFFLINE_MSG')}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  rootView: {
    flex: 1,
    flexDirection: 'column',
  },
  errorContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    justifyContent: 'center',
  },
  rootContainer: { justifyContent: 'flex-start', padding: 10 },
  img: { height: 120, width: 120 },
  textContainer: {
    alignItems: 'center',
  },
  title: { marginBottom: 10, fontSize: 20, fontWeight: 'bold' },
  errorHead: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 50,
    textAlign: 'center',
  },

  iOSBackdrop: {
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: '#232f34',
    opacity: 0.32,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
export default ErrorCard
