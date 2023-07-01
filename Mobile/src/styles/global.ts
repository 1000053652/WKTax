import { Platform, StatusBar, StatusBarProps, StyleSheet } from 'react-native'
import {
  Colors,
  FontFamily,
  FontSize,
  FontWeight,
  horizontalScale,
  verticalScale,
} from '../theme/constants'

const colors = {
  error: '#c30000',
  errorLight: '#fce4e5',
  warning: '#bd4000',
  warningLight: '#fff2ee',
  success: '#297708',
  successLight: '#edf3e7',
  info: '#036eb5',
  infoLight: '#e4f7fd',
  disabled: '#DADEE0',
  brandGreen: '#77bc1f',
  brandBlue: '#57c1e8',
  linkBlue: '#0b82cd',
  linkBlueText: '#116cc2',
  white: '#ffffff',
  offWhite: '#f8f9fa',
  grayLight: '#dae0e3',
  grayMedium: '#97a0a6',
  grayDark: '#263238',
  gray: '#5c676e',
  grayBorder: '#c0c8cc',
  grayDarkText: '#4a545b',
  offBlack: '#263238',
  buttonDark: '#5d676e',
  orange: '#fd8c5b',
  ruby: '#cc0066',
  errorColor: '#E5202E',
}

const constants = {
  fontSmall: 12,
  fontMedium: 14,
  fontMediumLarge: 16,
  fontLarge: 18,
  fontXLarge: 22,
  fontXXLarge: 26,
  fontXXXLarge: 30,
  unit: 6,
  fullWidth: '100%',
  thinBorderWidth: 0.5,
  borderWidth: 1,
  formMinWidth: 300,
  buttonMinWidth: 320,
  labelFixedWidth: 150,
  inputColor: colors.gray,
  inputDisabledColor: colors.grayBorder,
}

const navigatorStyle = {
  // NOTE: Reference of available styling here: https://wix.github.io/react-native-navigation/#/styling-the-navigator
  navBarTextColor: colors.white, // change the text color of the title (remembered across pushes)
  navBarBackgroundColor: colors.offBlack, // change the background color of the nav bar (remembered across pushes)
  navBarButtonColor: colors.white, // Change color of nav bar buttons (eg. the back button) (remembered across pushes)
  screenBackgroundColor: colors.offWhite,
}
const glbCustomerHeaderOptions: StatusBarProps = { backgroundColor: 'white', barStyle: 'dark-content' }

const glbStyles = StyleSheet.create({
  textAlignLeft: {
    textAlign: 'left',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  error: {
    color: colors.error,
  },
  success: {
    color: colors.success,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  textCenter: {
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flexGrow: {
    flexGrow: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  pad: {
    padding: constants.unit * 3,
  },
  padH: {
    paddingLeft: constants.unit * 3,
    paddingRight: constants.unit * 3,
  },
  padV: {
    paddingBottom: constants.unit * 3,
    paddingTop: constants.unit * 3,
  },
  container: {
    backgroundColor: colors.offWhite,
  },
  cutout: {
    backgroundColor: colors.white,
  },
  marginBottom: {
    marginBottom: constants.unit * 3,
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: constants.fontLarge,
    marginBottom: constants.unit * 2,
    color: colors.grayDark,
  },
  subtitle: {
    fontWeight: '700',
    fontSize: constants.fontMediumLarge,
    marginBottom: constants.unit,
  },
  pageTitle: {
    color: colors.gray,
    fontSize: constants.fontXLarge,
    textAlign: 'center',
  },
  pageSubtitle: {
    color: colors.gray,
    fontSize: constants.fontLarge,
    textAlign: 'center',
  },
  label: {
    fontWeight: '700',
    fontSize: constants.fontMediumLarge,
    color: colors.grayMedium,
  },
  link: {
    color: colors.linkBlue,
    fontSize: constants.fontMediumLarge,
    fontWeight: '700',
  },
  bold: {
    fontWeight: '700',
  },
  constrainedWidthContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  constrainedWidth: {
    width: '50%',
    minWidth: constants.formMinWidth,
  },
  cutoutContainer: {
    backgroundColor: colors.white,
    paddingBottom: 4 * constants.unit,
    marginBottom: 3 * constants.unit,
  },
  cutoutSectionTitle: {
    fontSize: constants.fontMediumLarge,
    marginBottom: 3 * constants.unit,
  },
  fontMedium: {
    fontSize: constants.fontMedium,
  },
  fontMediumLarge: {
    fontSize: constants.fontMediumLarge,
  },
  divider: {
    borderBottomColor: colors.grayLight,
    borderBottomWidth: 0.5,
    marginHorizontal: constants.unit * 2,
    marginTop: constants.unit * 2,
    marginBottom: constants.unit * 5,
  },
  marginSmall: {
    marginBottom: constants.unit * 1,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // HEADER
  headerContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(15),
  },
  headerTitle: {
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.smallx,
    textAlign: 'center',
    fontWeight:'500'

  },
  headerSubTitle: {
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.tinyx,
    textAlign: 'center',
  },
  headerButtonText: {
    color: Colors.textAndBorderColor,
    fontSize: FontSize.small,
    fontWeight: FontWeight.normal,
  },
  headerBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBackArrowImage: {
    height: 25,
    width: 25,
  },
  headerLeftComponent: {
    flexDirection: 'row',
    width: horizontalScale(150),
    alignItems: 'center',
  },
  headerLeftComponentImage: {
    marginRight: horizontalScale(5),
    width: horizontalScale(20),
    height: verticalScale(20),
  },
  bottomSheetIndicator: {
    backgroundColor: Colors.lightGray,
    width: horizontalScale(58),
  },
  bottomSheetContainer: {
    borderRadius: 0,
  },
  successToast: {
    borderColor: 'green',
    borderLeftWidth: 4,
    borderLeftColor: 'green',
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '90%',
  },
  errorToast: {
    borderColor: colors.errorColor,
    borderLeftWidth: 4,
    borderLeftColor: colors.errorColor,
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '90%',
  },
  toatMessagesView: {
    width: '80%',
  },
  toatMessageIcon: {
    height: verticalScale(16),
    width: horizontalScale(17),
    marginRight: horizontalScale(17),
  },
  containerToastMessage: {
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),
  },
  toatMessageCloseButton: {
    height: verticalScale(44),
    width: horizontalScale(44),
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastMessageButtonImage: {
    height: verticalScale(16),
    width: horizontalScale(16),
  },
  text1ToastMessage: {
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.tiny,
    fontWeight: FontWeight.medium,
    lineHeight: verticalScale(18),
    textAlignVertical: 'top',
  },
  text2ToastMessage: {
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.tiny,
    fontWeight: FontWeight.normal,
    lineHeight: verticalScale(21),
    textAlignVertical: 'top',
  },
  safeAreaView: { 
    flex: 1,
    backgroundColor: "white"
  },
  safeAreaViewWithAndroidTopSpace: { 
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})

export { constants, colors, glbStyles, navigatorStyle, glbCustomerHeaderOptions }
