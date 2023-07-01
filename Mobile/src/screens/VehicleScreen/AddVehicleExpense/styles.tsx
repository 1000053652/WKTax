import { StyleSheet, Dimensions } from 'react-native'
import {
  Colors,
  FontFamily,
  FontSize,
  MetricsSizes,
  moderateScale,
  verticalScale,
} from '../../../theme/constants'

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    item: {
        backgroundColor: Colors.white,
        height: moderateScale(50),

    },

    horizontalLine2: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: Colors.lineColorGray,
        height: 1,
        marginTop: moderateScale(2),
    },
    horizontalLine:{
        margin:moderateScale(10),
        marginVertical: moderateScale(15)
    },
    headerStyle: {
        flexDirection: 'row',
        height: MetricsSizes.regular + 2,
        backgroundColor:Colors.white,

    },
    headerView:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    headerRowStyle: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    backArrowStyle: {
        width: moderateScale(18),
        height: moderateScale(18),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: moderateScale(10),
    },
    dependentItem: {
        fontSize: moderateScale(16),
        fontStyle: 'normal',
        marginLeft: moderateScale(16),
        marginVertical: moderateScale(8),
        fontFamily: FontFamily.FiraSansRegular,
        color: Colors.black,
        width: '30%',
    },
    assetsView:{
        marginTop:moderateScale(10),
        backgroundColor: Colors.white,
    },
    img: {
        width: moderateScale(10),
        height: moderateScale(15),
        right: moderateScale(5),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    equipmentView:{
        flexDirection:'row',
        marginTop:moderateScale(10),
    },

    priceView:{
        flexDirection:'row',
        marginTop:moderateScale(2),
        marginBottom:moderateScale(10),
    },
    equipmentText:{
        fontSize: moderateScale(16),
        fontStyle: 'normal',
        marginLeft: moderateScale(16),
        fontFamily: FontFamily.FiraSansRegular,
        color: Colors.black,
        width: '90%',
    },
    purchasesText:{
        fontSize: moderateScale(14),
        fontStyle: 'normal',
        marginLeft: moderateScale(16),
        fontFamily: FontFamily.FiraSansRegular,
        color: Colors.black,
        width: '50%',
    },
    addTo:{
        fontSize: moderateScale(16),
        fontStyle: 'normal',
        marginLeft: moderateScale(16),
        marginVertical: moderateScale(8),
        fontFamily: FontFamily.FiraSansRegular,
        color: Colors.testColorBlue,
        width: '30%',
    },
    headerTo:{
        fontSize: moderateScale(14),
        fontStyle: 'normal',
        marginLeft: moderateScale(4),
        fontFamily: FontFamily.FiraSansRegular,
        color: Colors.testColorBlue,
    },
    assetsText:{
        fontSize: moderateScale(14),
        fontStyle: 'normal',
        marginLeft: moderateScale(4),
        fontFamily: FontFamily.FiraSansRegular,
        color: Colors.black,
        width: '80%',
    },
    saveText:{
        fontSize: moderateScale(16),
        fontStyle: 'normal',
        fontFamily: FontFamily.FiraSansRegular,
        color: Colors.testColorBlue,
        alignItems:'flex-end',
        justifyContent:'flex-end'
    },
    stylesSwipeViewStyle: {
        fontSize: FontSize.tiny,
        height: moderateScale(40),
        backgroundColor: Colors.swipeBackgroundTextColor,
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: moderateScale(100),
        alignContent: 'center',
    },
    rowBack: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'flex-end',
        justifyContent: 'flex-end',
        paddingLeft: moderateScale(10),
    },
    stylesSwipeTextStyle: {
        color: '#ffffff',
    },
    swipeListViewStyle:{
        maxHeight: Dimensions.get('window').height- moderateScale(390)
    },
    mainViewStyle:{
        backgroundColor: Colors.white,
    },
    datePickerContrainer: {
        marginTop: verticalScale(1),
        marginBottom: verticalScale(1),
        width:'100%'
    },
    containerStyle:{
        width:'50%'
    },
    currentAmount:{width:'60%'},
    priorAmount:{width:'60%'},
    saveButton:{
        color:Colors.blueText,
        marginRight:16,
        fontSize:16,
        fontWeight:"400"
    },
    cancelButton:{
        color:Colors.blueText,
        marginLeft:16,
        fontSize:16,
        fontWeight:"400"
    },
})

export default styles
