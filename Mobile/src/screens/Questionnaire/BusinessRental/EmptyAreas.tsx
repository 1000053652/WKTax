import React from 'react'
import { View } from 'react-native'
import styles from '../styles'

const EmptyAreas = () => {
  return (
    <View>
      <View style={styles.horizontalLine} />
      <View style={styles.grayArea} />
      <View style={styles.horizontalLine} />
    </View>
  )
}

export default EmptyAreas
