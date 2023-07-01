import React, { PropsWithChildren } from 'react'
import { Text } from 'react-native'
import styles from './styles'
interface TextProps {
  children?: string
  disable?: boolean
  stylesContainerText?: {}
  onPress?: () => void
  testID: string
  ellipsize?: 'head' | 'middle' | 'tail' | 'clip' | undefined
  numberOfLines?: number | undefined
}

const TextComponent = ({
  children,
  onPress,
  disable,
  stylesContainerText,
  testID,
  ellipsize,
  numberOfLines,
}: PropsWithChildren<TextProps>) => {
  const onButtonPress = () => onPress && onPress()
  return (
    <Text
      testID={'text_' + testID ?? children}
      style={[styles.text, stylesContainerText]}
      onPress={onButtonPress}
      accessibilityState={{ disabled: disable }}
      ellipsizeMode={ellipsize}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  )
}

TextComponent.defaultProps = {
  disable: true,
}
export default TextComponent

// import React, { PropsWithChildren } from 'react'
// import { Text as ReactText, StyleSheet } from 'react-native'
// import pickBy from 'lodash/pickBy'
// import identity from 'lodash/identity'
// import {
//   Colors,
//   FontSize,
//   FontWeight,
//   LineHeight,
//   FontFace,
//   TextAlignment,
//   TextRole,
//   FontFamily
// } from '../../constants'

// interface TextProps {
//   numberOfLines?: number
//   role?: TextRole
//   color?: Color
//   onPress?: () => void
//   size?: FontSize
//   weight?: FontWeight
//   textAlign?: TextAlignment
//   accessibilityLabel?: string
//   accessibilityHint?: string
//   stylesContainerText?: {}
// }

// const Text = ({
//   numberOfLines = 0,
//   role = TextRole.body,
//   children,
//   color,
//   onPress,
//   size,
//   weight,
//   textAlign = TextAlignment.auto,
//   accessibilityLabel,
//   accessibilityHint,
//   stylesContainerText,
//   testID = 'test_id_text',
// }: PropsWithChildren<TextProps>) => {
//   const customStyle = {
//     color,
//     fontSize: size,
//     //fontWeight: weight,
//     lineHeight: getLineHeight(size),
//     textAlign,
//     fontFamily: FontFamily.FiraSansRegular,
//   }

//   const cleanedStyle = pickBy(customStyle, identity)
//   const style = {
//     ...getTextStyle(role),
//     ...cleanedStyle,
//     ...stylesContainerText,
//   } // merge( getTextStyle(role), customStyle) doesn't work, e.g. color params not overiten

//   return (
//     <ReactText
//       testID={testID}
//       style={style}
//       numberOfLines={numberOfLines}
//       accessibilityLabel={accessibilityLabel}
//       accessibilityHint={accessibilityHint}
//       onPress={onPress}
//     >
//       {children}
//     </ReactText>
//   )
// }

// function getLineHeight(size?: FontSize) {
//   switch (size) {
//     case FontSize.caption1:
//       return LineHeight.caption1
//     case FontSize.caption2:
//       return LineHeight.caption2
//     case FontSize.footnote:
//       return LineHeight.footnote
//     case FontSize.subhead:
//       return LineHeight.subhead
//     case FontSize.callout:
//       return LineHeight.callout
//     case FontSize.body:
//       return LineHeight.body
//     case FontSize.headline:
//       return LineHeight.headline
//     case FontSize.headline1:
//       return LineHeight.headline
//     case FontSize.title3:
//       return LineHeight.title3
//     case FontSize.title2:
//       return LineHeight.title2
//     case FontSize.title1:
//       return LineHeight.title1
//     default:
//       return undefined
//   }
// }

// function getTextStyle(role: TextRole) {
//   switch (role) {
//     case TextRole.caption1:
//       return styles.caption1
//     case TextRole.caption2:
//       return styles.caption2
//     case TextRole.footnote:
//       return styles.footnote
//     case TextRole.subhead:
//       return styles.subhead
//     case TextRole.callout:
//       return styles.callout
//     case TextRole.body:
//       return styles.body
//     case TextRole.headline:
//       return styles.headline
//     case TextRole.headline1:
//       return styles.headline1
//     case TextRole.title3:
//       return styles.title3
//     case TextRole.title2:
//       return styles.title2
//     case TextRole.title1:
//       return styles.title1
//   }
// }

// const baseFont = {
//   fontFamily: FontFamily.FiraSansRegular,
//   //color: Color.grayDark,
//   //fontWeight: FontWeight.normal,
// }

// const styles = StyleSheet.create({
//   title1: {
//     ...baseFont,
//     fontSize: FontSize.title1,
//     lineHeight: LineHeight.title1,
//   },
//   title2: {
//     ...baseFont,
//     fontSize: FontSize.title2,
//     lineHeight: LineHeight.title2,
//   },
//   title3: {
//     ...baseFont,
//     fontSize: FontSize.title3,
//     lineHeight: LineHeight.title3,
//   },
//   headline1: {
//     ...baseFont,
//     fontSize: FontSize.headline1,
//     lineHeight: LineHeight.headline,
//   },
//   headline: {
//     ...baseFont,
//     //fontWeight: FontWeight.extraBold,
//     fontSize: FontSize.headline,
//     lineHeight: LineHeight.headline,
//   },
//   body: {
//     ...baseFont,
//     fontSize: FontSize.body,
//     lineHeight: LineHeight.body,
//   },
//   callout: {
//     ...baseFont,
//     fontSize: FontSize.callout,
//     lineHeight: LineHeight.callout,
//   },
//   subhead: {
//     ...baseFont,
//     fontSize: FontSize.subhead,
//     lineHeight: LineHeight.subhead,
//   },
//   footnote: {
//     ...baseFont,
//     fontSize: FontSize.footnote,
//     lineHeight: LineHeight.footnote,
//   },
//   caption1: {
//     ...baseFont,
//     fontSize: FontSize.caption1,
//     lineHeight: LineHeight.caption1,
//   },
//   caption2: {
//     ...baseFont,
//     fontSize: FontSize.caption2,
//     lineHeight: LineHeight.caption2,
//   },
// })

// export default Text
