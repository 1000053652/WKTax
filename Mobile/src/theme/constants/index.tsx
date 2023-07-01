/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { CountryCodeType } from '../../../src/screens/Questionnaire/General/types'
import { states } from '../../../src/services/constants/ConstantsData'

export const horizontalScale = (size: number) => size
export const verticalScale = (size: number) => size
export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor
export const factorScale = (size: number, factor = 0.5) => size * factor

/**
 * Colors
 */
export const Colors = {
  // Example.tsx colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  black: '#000000',
  text: '#212529',
  primary: '#E14032',
  success: '#28a745',
  error: '#dc3545',
  errorLight: '#fce4e5',
  serviceListBackgroundColor: '#F2F2F2',
  homeHeadingBackColor: '#A6D1EA',
  textDullColor: '#353535',
  borderDullColor: '#B6B6B6',
  testColorBlue: '#007AC3',
  testColordarkBlue: '#003D61',
  warningTextColor: '#353535',
  blueShade1: '#005B92',
  grayDark: '#263238',
  grayLight: '#dae0e3',
  grayMedium: '#97a0a6',
  gray: '#5c676e',
  blueText: '#005B92',
  grayBorder: '#c0c8cc',
  grayDarkText: '#4a545b',
  grayTint1: '#757575',
  lineColorGray: '#BFBFBF',
  textColor: '#474747',
  textColorRed: '#E5202E',
  backgroundFooterColor: '#F6F6F6',
  swipeBackgroundTextColor: '#FF3B30',
  errorColor: '#E5202E',
  borderColor: '#DADADA',
  backgroundUploadHome: '#A3A3A3',
  buttonColor: '#0b82cd',
  backgroundSelected: '#E9F4F9',
  statusColor: '#85BC20',
  serviceListStatusColorBrown: '#AF6B00',
  serviceListStatusColorGreen: '#AF6B00',
  yesBackground: '#E9F4F9',
  yesNoBackColor: '#E9F4F9',
  textAndBorderColor: '#007AC3',
  blueShadeColor: '#003D61',
  systemBlue: '#007AFF',
  greenShade: '#009881',
  lightBlueShade: '#A0C4E6',
  lightGray: '#EDEDED',
  deleteRow: '#FF3B30',
  darkGray: '#D9D9D9',
  blueOne: '#81b0ff',
  grayOne: '#f4f3f4',
  grayish: '#767577',
  switchIosColor: '#3e3e3e',
  drlActiveDot: '#979797',
  drlInactiveDot: '#474747',
  greenShade1: '#648D18',
  green:'#00FF00'
}
export enum Color {
  adcDarkGreen = '#297708',
  adcLightGreen = '#77bc1f',
  adcLightBlue = '#57c1e8',
  adcLightPurple = '#a639bc',
  navyBlue = '#345771',
  aquaBlue = '#377a93',
  black = '#000102',
  grayDark = '#263238',
  gray = '#5c676e',
  white = '#fff',
  darkCobalt = '#28397f',
  success = '#297708',
  caution = '#bd4000',
  alert = '#f15c2c',
  error = '#c30000',
  info = '#036eb5',
  blue = '#036eb5',
  blueHover = '#024F83',
  adcDarkGreen60 = 'rgba(41, 119, 8, .6)',
  adcLightGreen60 = 'rgba(119, 188, 31, .6)',
  adcLightBlue60 = 'rgba(87, 193, 232, .6)',
  black60 = 'rgba(0, 1, 2, 0.6)',
  navyBlue60 = 'rgba(52, 87, 113, .6)',
  aquaBlue60 = 'rgba(55, 122, 147, .6)',
  info60 = 'rgba(3, 110, 181, .6)',
  grayDark60 = 'rgba(38, 50, 56, .6)',

  offWhite = '#f8f9fa',
  offWhiteDark = '#f0f2f4',
  grayExtraLight = '#e9ecee',
  grayLight = '#dae0e3',
  grayMediumLight = '#c0c8cc',
  error30 = 'rgba(195, 0, 0, .3)',

  cloudBlue = '#f5faff',
  sunYellow = '#fed000',
  nearBlack = '#333',
  purple = '#6a277a',
  grayMedium = '#97a0a6',
  graySemantic = '#d3d3d3',
  yellow = '#f2c94c',

  successLight = '#edf3e7',
  cautionLight = '#fff2ee',
  errorLight = '#fce4e5',
  infoLight = '#e4f7fd',
  infoExtraLight = '#f0fbfe',
  iosColor = '#3e3e3e',
}
export const NavigationColors = {
  primary: Colors.primary,
}
// Per Figma designs, mobile will be on a 8-point system
export enum BorderRadius {
  small4 = 2,
  small3 = 4,
  small2 = 6,
  small1 = 8,
  medium4 = 10,
  medium3 = 12,
  medium2 = 14,
  medium1 = 16,
  large4 = 18,
  large3 = 20,
  large2 = 22,
  large1 = 24,
}

export enum Thickness {
  small2 = 1,
  small1 = 2,
  medium2 = 3,
  medium1 = 4,
  large2 = 5,
  large1 = 6,
  xLarge2 = 7,
  xLarge1 = 8,
}

// Padding, Margin, Gap, or Relative Position
export enum Spacing {
  small4 = 1,
  small3 = 2,
  small2 = 4,
  small1 = 8,
  medium2 = 12,
  medium1 = 16,
  large2 = 20,
  large1 = 24,
  xLarge2 = 28,
  xLarge1 = 32,
  xxLarge2 = 36,
  xxLarge1 = 40,
  xxLarge3 = 48,
}

// Width, Height, Length
export enum Dimension {
  xxxxSmall2 = 4,
  xxxxSmall1 = 8,
  xxxSmall2 = 12,
  xxxSmall1 = 16,
  xxSmall4 = 18,
  xxSmall3 = 20,
  xxSmall2 = 22,
  xxSmall1 = 24,
  xSmall2 = 28,
  xSmall1 = 32,
  small2 = 36,
  small1 = 40,
  medium2 = 44,
  medium1 = 48,
  large2 = 52,
  large1 = 56,
  xLarge2 = 60,
  xLarge1 = 64,
  xxLarge2 = 68,
  xxLarge1 = 72,
  xxxLarge2 = 76,
  xxxLarge1 = 80,
  xxxxLarge2 = 84,
  xxxxLarge1 = 88,
  xxxxxLarge3 = 100,
}

export enum IconSize {
  small1 = 8,
  medium4 = 10,
  medium3 = 12,
  medium2 = 14,
  medium1 = 16,
  large4 = 18,
  large3 = 20,
  large2 = 22,
  large1 = 24,
  xLarge4 = 26,
  xLarge3 = 28,
  xLarge2 = 30,
  xLarge1 = 32,
  xxLarge4 = 34,
  xxLarge3 = 36,
  xxLarge2 = 38,
  xxLarge1 = 40,
  xxxLarge4 = 42,
  xxxLarge3 = 44,
  xxxLarge2 = 46,
  xxxLarge1 = 48,
}

export enum IconPosition {
  Leading = 'leading',
  Trailing = 'trailing',
}
/**
 * FontSize
 */
export const FontSize = {
  tinyxx: moderateScale(10),
  tinyx: moderateScale(12),
  tiny: moderateScale(14),
  small: moderateScale(16),
  smallx: moderateScale(18),
  regular: moderateScale(20),
  regularx: moderateScale(22),
  large: moderateScale(40),
}

/**
 * Metrics Sizes
 */
const tiny = moderateScale(10)
const small = tiny * 2 // 20
const regular = tiny * 3 // 30
const large = regular * 2 // 60
const textInpWidth = 341

export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
  textInpWidth,
}

export const FontFamily = {
  FiraSansBlack: 'FiraSans-Black',
  FiraSansBlackItalic: 'FiraSans-BlackItalic',
  FiraSansBold: 'FiraSans-Bold',
  FiraSansBoldItalic: 'FiraSans-BoldItalic',
  FiraSansExtraBold: 'FiraSans-ExtraBold',
  FiraSansExtraBoldItalic: 'FiraSans-ExtraBoldItalic',
  FiraSansExtraLight: 'FiraSans-ExtraLight',
  FiraSansExtraLightItalic: 'FiraSans-ExtraLightItalic',
  FiraSansItalic: 'FiraSans-Italic',
  FiraSansLight: 'FiraSans-Light',
  FiraSansLightItalic: 'FiraSans-LightItalic',
  FiraSansMedium: 'FiraSans-Medium',
  FiraSansMediumItalic: 'FiraSans-MediumItalic',
  FiraSansRegular: 'FiraSans-Regular',
  FiraSansSemiBold: 'FiraSans-SemiBold',
  FiraSansSemiBoldItalic: 'FiraSans-SemiBoldItalic',
  FiraSansThin: 'FiraSans-Thin',
  FiraSansThinItalic: 'FiraSans-ThinItalic',
}
export enum FontFace {
  avenir = 'Avenir',
}

export enum FontWeight {
  thin = '100',
  extraLightUltraLight = '200',
  light = '300',
  normal = '400',
  medium = '500',
  // NOTE: Find out, is this supposed to be semiBold?
  demiBold = '600',
  bold = '700',
  extraBold = '800',
  heavy = '900',
}

// Typography from UI designs: https://www.figma.com/file/YGs1UMvaSWhKgPGidg63D6/Mobile-App-Components?node-id=1318%3A1848&t=95xnENtCei4j192J-0
export enum LineHeight {
  caption2 = 13,
  caption1 = 16,
  footnote = 18,
  subhead = 20,
  callout = 21,
  body = 22,
  headline = 22,
  title3 = 25,
  title2 = 28,
  title1 = 34,
}

export enum TextAlignment {
  auto = 'auto',
  left = 'left',
  right = 'right',
  center = 'center',
  justify = 'justify',
}

export enum TextRole {
  caption2 = 'caption2',
  caption1 = 'caption1',
  footnote = 'footnote',
  subhead = 'subhead',
  callout = 'callout',
  body = 'body',
  headline = 'headline',
  headline1 = 'headline1',
  title3 = 'title3',
  title2 = 'title2',
  title1 = 'title1',
}

export enum ButtonRole {
  primary = 'primary',
  secondary = 'secondary',
  default = 'default',
  floating = 'floating',
  navigation = 'navigation',
  toogle = 'toogle',
}

export enum BadgeRole {
  Default = 'Default',
  primary = 'primary',
  Info = 'info',
  Success = 'success',
  Caution = 'caution',
  Error = 'error',
}

export enum BadgeStyle {
  Filled = 'filled',
  Unfilled = 'unfilled',
  Light = 'light',
}

export enum BadgeSize {
  Medium = 'medium',
  Large = 'large',
}

export enum Orientation {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export enum LocationSuggestionType {
  address = 'address',
  city = 'city',
  state = 'state',
  county = 'county',
  text = 'text',
  zip = 'zip',
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
  FontFamily,
}

export const dateFormat = 'MM/DD/YYYY'
export const dateFormatPlaceHolder = 'mm/dd/yyyy'
export const defaultPhoneCode = '+1 US'

export const maxAmountLength = 10
export const validateAmount = (amount: number) => {
  return amount > 0 ? amount : ''
}

export const formatWithStar = value => {
  if (value && !value?.includes('***-**-') && value?.length == 9) {
    return '***-**-' + value?.substr(value?.length - 4)
  } else if (value?.includes('***-**-') && value?.length == 11) {
    return '***-**-' + value?.substr(value?.length - 4)
  } else if (value?.includes('***-**-') && value?.length == 10) {
    return ''
  } else {
    return value
  }
}

export const getYandN = (yAndNValue: string) => {
  let val = ''
  if (yAndNValue == '1') {
    val = 'Y'
  } else if (yAndNValue == '0') {
    val = 'N'
  } else {
    val = ''
  }
  return val
}

export const get1and0 = (yAndNValue: string) => {
  let val = ''
  if (yAndNValue == 'Y') {
    val = '1'
  } else if (yAndNValue == 'N') {
    val = '0'
  } else {
    val = ''
  }
  return val
}

export const getContryCodeLabel = (
  countryData: CountryCodeType[],
  TPWorkPH: string
) => {
  if (TPWorkPH.includes(')')) {
    const countryCodeEPq = TPWorkPH.split(')')
    if (countryCodeEPq.length > 1) {
      const countryCodeSelected = countryCodeEPq[0]
        .trim()
        .substring(1, countryCodeEPq[0].length)
      const countryCodefinal: CountryCodeType[] = countryData.filter(
        countryCode => countryCode.value === countryCodeSelected
      )
      if (countryCodefinal[0] !== undefined) {
        return countryCodefinal[0].label
      } else {
        return defaultPhoneCode
      }
    } else {
      return defaultPhoneCode
    }
  } else {
    return defaultPhoneCode
  }
}

export const getContryCodeData = (
  countryData: CountryCodeType[],
  TPWorkPH: string
): CountryCodeType | null => {
  if (TPWorkPH.includes(')')) {
    const countryCodeEPq = TPWorkPH.split(')')
    if (countryCodeEPq.length > 1) {
      const countryCodeSelected = countryCodeEPq[0]
        .trim()
        .substring(1, countryCodeEPq[0].length)
      const countryCodefinal: CountryCodeType[] = countryData.filter(
        countryCode => countryCode.value === countryCodeSelected
      )
      if (countryCodefinal[0] !== undefined) {
        return countryCodefinal[0]
      } else {
        return countryData[0]
      }
    } else {
      return countryData[0]
    }
  } else {
    return countryData[0]
  }
}

export const maxLengthOtherDescription = 76

export const numberOfLineInDescription = 1

export const getStateName = (key: string) => {
  if (key != '') {
    return states?.filter(state => state?.key == key)[0]?.value
  }
}
