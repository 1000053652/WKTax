import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ApplicationStackParamList } from 'Mobile/@types/navigation'
import {
  AboutYou,
  AddEditVehicle,
  AddFinancial,
  AddNewDocument,
  AddUpdateBusinessGeneralDetails,
  AddUpdateFarmGeneralDetails,
  AddUpdateRentalGeneralDetails,
  AddVehicleExpense,
  AddViewAssets,
  AddViewDepenedents,
  AddingAdditionalDocument,
  AddressEditScreen,
  AsstesScreen,
  AttachmentsMenu,
  BusinessEntityInfo,
  BusinessExpensesView,
  BusinessRentalHomeScreen,
  ChangePasswordScreen,
  ContactScreen,
  DRLQuickNotes,
  DependentsScreen,
  FarmEntityInfo,
  FarmExpensesView,
  FarmIncome,
  FillingDetails,
  HomeOfficeAddEdit,
  HomeOfficeListing,
  Income,
  PDFConversion,
  Personal,
  ProfileScreen,
  QuestionnaireScreen,
  RentalEntityInfo,
  RentalExpensesView,
  RentalIncome,
  ReplyWithAmount,
  ServiceRequestList,
  SpouseTaxPayerEditScreen,
  StatutoryBusiness,
  TasksScreen,
  TaxPayerEditScreen,
  VehiclesScreen,
  WebComponentScreen,
  QuestionnaireBusiness,
  BusinessInformation,
  AdditionalBusiness,
  AssetsBusiness,
  TaxPaymentBusiness,
  TaxPaymentBusinessAddEdit,
  HomeOfficeExpense,
  TaxPayment,
  ElectronicFundsScreen,
  Gifts,
  Taxable,
  TaxPaymentAddEdit,
  AddElectronicFunds,
  AboutYouBusiness,
  AddViewAssetsBusiness,
  AddGifts,
  AddForgivenGifts,
  MiscIncomeExpenses,
  Moving,
  DynamicQuestions,
  AdditionalInformation,
  Retirement,
  BusinessAdditionalInformation,
  ViewUpdateBusiness,
  ViewUpdateAddress,
  ViewUpdatePrimaryContact,
  ViewUpdateAnnual,
  Event,
  BusinessManualSign,
} from '../screens'

import MainNavigator from './BottomTabs/Main'
import { Platform } from 'react-native'
import { Colors, FontFamily } from '../theme/constants'
import { t } from 'i18next'
import AppDrawerNavigator from './Drawer'

const Stack = createStackNavigator<ApplicationStackParamList>()

export const AfterLoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="ServiceRequestList"
        component={ServiceRequestList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppDrawerNavigator"
        component={AppDrawerNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TasksScreen"
        component={TasksScreen}
        options={{
          title: 'Task',
          headerShown: false,
          headerTitle: 'Connect',
          headerBackTitle: ' ',
        }}
      />
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name="WebComponentScreen"
          component={WebComponentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ContactScreen"
          component={ContactScreen}
          options={{
            headerBackTitle: ' ',
            headerTitle: ' ',
            headerTintColor: Colors.testColorBlue,
          }}
        />
        <Stack.Screen
          name="QuestionnaireScreen"
          component={QuestionnaireScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BusinessRentalHomeScreen"
          component={BusinessRentalHomeScreen}
          options={{
            headerTitle: t('businessRental:BUSINESSSCREENTITLE'),
            headerTitleStyle: { color: Colors.black },
            headerLeft: () => null,
            headerTintColor: Colors.testColorBlue,
            headerBackTitleStyle: { color: Colors.testColorBlue },
          }}
        />
        <Stack.Screen
          name="BusinessEntityInfo"
          component={BusinessEntityInfo}
          options={{
            headerTitle: t('businessRental:BUSINESS_INFO_SCREEN_TITLE'),
            headerBackTitle: ' ',
            headerTitleStyle: { color: Colors.black },
            headerTintColor: Colors.testColorBlue,
            headerBackTitleStyle: { color: Colors.testColorBlue },
          }}
        />

        <Stack.Screen
          name="FarmEntityInfo"
          component={FarmEntityInfo}
          options={{
            headerTitle: t('businessRental:FARM_NFO_SCREEN_TITLE'),
            headerBackTitleVisible: false,
            headerBackTitle: ' ',
            headerTitleStyle: { color: Colors.black },
            headerTintColor: Colors.testColorBlue,
            headerBackTitleStyle: { color: Colors.testColorBlue },
          }}
        />
        <Stack.Screen
          name="RentalEntityInfo"
          component={RentalEntityInfo}
          options={{
            headerTitle: t('businessRental:RENTAL_NFO_SCREEN_TITLE'),
            headerBackTitle: ' ',
            headerTitleStyle: { color: Colors.black },
            headerTintColor: Colors.testColorBlue,
            headerBackTitleStyle: { color: Colors.testColorBlue },
          }}
        />
        <Stack.Screen
          name="HomeOfficeListing"
          component={HomeOfficeListing}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeOfficeAddEdit"
          component={HomeOfficeAddEdit}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeOfficeExpense"
          component={HomeOfficeExpense}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Gifts"
          component={Gifts}
          options={{
            headerShown: true,
            headerTitle: t('questionnaireBusiness:GIFTS'),
            headerBackTitle: ' ',
            headerLeft: () => null,
            headerTitleStyle: {
              fontFamily: FontFamily.FiraSansRegular,
            },
          }}
        />
        <Stack.Screen
          name="TaxPaymentAddEdit"
          component={TaxPaymentAddEdit}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TaxPayment"
          component={TaxPayment}
          options={{
            headerTitle: t('taxpayment:TITLE'),
            headerTitleStyle: { color: Colors.black },
            headerTintColor: Colors.testColorBlue,
            headerLeft: () => null,
          }}
        />
      </Stack.Group>
      <Stack.Screen
        name="PersonalScreen"
        component={Personal}
        options={{
          headerTitle: 'Personal',
          headerBackTitleVisible: false,
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />
      <Stack.Screen
        name="AboutYou"
        component={AboutYou}
        options={{
          headerTitle: 'About You',
          headerLeft: () => null,
          headerTitleAlign: 'center',
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />

      <Stack.Screen
        name="TaxPayerEditScreen"
        component={TaxPayerEditScreen}
        options={{
          headerTitle: 'TaxPayer',
          headerBackTitle: ' ',
          headerShown: false,
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />

      <Stack.Screen
        name="AddressEditScreen"
        component={AddressEditScreen}
        options={{
          headerTitle: 'TaxPayer',
          headerBackTitle: ' ',
          headerShown: false,
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />

      <Stack.Screen
        name="SpouseEditScreen"
        component={SpouseTaxPayerEditScreen}
        options={{
          headerTitle: 'TaxPayer',
          headerBackTitle: ' ',
          headerShown: false,
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />
      <Stack.Screen
        name="DependentsScreen"
        component={DependentsScreen}
        options={{
          headerShown: true,
          headerTitle:  t('dependent:DEPENDENT'),
          headerBackTitle: ' ',
          headerLeft: () => null,
          headerTitleStyle: {
            fontFamily: FontFamily.FiraSansRegular,
          },
        }}

      />
      <Stack.Screen
        name="TaxableScreen"
        component={Taxable}
        options={{
          headerTitle: t('taxable:NAV_TITLE'),
          headerLeft: () => null,
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />
      <Stack.Screen
        name="AddViewDepenedents"
        component={AddViewDepenedents}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="FillingDetailsScreen"
        component={FillingDetails}
        options={{
          headerTitle: 'Filing Details',
          headerLeft: () => null,
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />
      <Stack.Screen
        name="AddFinancialScreen"
        component={AddFinancial}
        options={{
          headerTitle: 'Filing Details',
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />
      <Stack.Screen
        name="AddElectronicFundsScreen"
        component={AddElectronicFunds}
        options={{
          headerTitle: t('electronicFunds:ELECTRONIC_TITTLE'),
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />

      <Stack.Screen
        name="AsstesScreen"
        component={AsstesScreen}
        options={{
          headerShown: false,
          headerTitle: 'AsstesScreen',
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />
      <Stack.Screen
        name="AddViewAssets"
        component={AddViewAssets}
        options={{
          headerShown: false,
          headerTitle: 'AddViewAssets',
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />
      <Stack.Screen
        name="AddViewAssetsBusiness"
        component={AddViewAssetsBusiness}
        options={{
          headerShown: false,
          headerTitle: t('AssetsBusiness:ASSETS'),
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />

      <Stack.Screen
        name="AddUpdateBusinessGeneralDetails"
        component={AddUpdateBusinessGeneralDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddUpdateFarmGeneralDetails"
        component={AddUpdateFarmGeneralDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddUpdateRentalGeneralDetails"
        component={AddUpdateRentalGeneralDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Income"
        component={Income}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="RentalIncome"
        component={RentalIncome}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="FarmIncome"
        component={FarmIncome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VehiclesScreen"
        component={VehiclesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ElectronicFundsScreen"
        component={ElectronicFundsScreen}
        options={{
          headerShown: true,
          headerTitle: t('electronicFunds:TITLE'),
          headerLeft: () => null,
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />

      <Stack.Screen
        name="BusinessExpensesView"
        component={BusinessExpensesView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddEditVehicleScreen"
        component={AddEditVehicle}
        options={{
          headerShown: true,
          headerTitle: t('vehicle:VEHICLE_TITLE'),
          headerBackTitle: ' ',
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />
      <Stack.Screen
        name="AddVehicleExpenseScreen"
        component={AddVehicleExpense}
        options={{
          headerShown: true,
          headerTitle: t('vehicle:VEHICLE_TITLE'),
          headerBackTitle: ' ',
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />

      <Stack.Screen
        name="FarmExpensesView"
        component={FarmExpensesView}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="RentalExpensesView"
        component={RentalExpensesView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StatutoryBusiness"
        component={StatutoryBusiness}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      />

      <Stack.Screen
        name={'AddNewDocument'}
        component={AddNewDocument}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen
        name={'DRLQuickNotes'}
        component={DRLQuickNotes}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen
        name={'PDFConversion'}
        component={PDFConversion}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen
        name={'AttachmentsMenu'}
        component={AttachmentsMenu}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen
        name={'ReplyWithAmount'}
        component={ReplyWithAmount}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen
        name={'AddingAdditionalDocument'}
        component={AddingAdditionalDocument}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen
        name="QuestionnaireBusiness"
        component={QuestionnaireBusiness}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BusinessInformation"
        component={BusinessInformation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdditionalBusiness"
        component={AdditionalBusiness}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AssetsBusiness"
        component={AssetsBusiness}
        options={{
          headerShown: true,
          headerTitle: t('AssetsBusiness:ASSETS'),
          headerLeft: () => null,
          headerBackTitle: t('vehicle:BACK_TITLE'),
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />
      <Stack.Screen
        name="TaxPaymentBusiness"
        component={TaxPaymentBusiness}
        options={{
          headerTitle: t('taxpayment:TITLE'),
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="TaxPaymentBusinessAddEdit"
        component={TaxPaymentBusinessAddEdit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdditionalInformation"
        component={AdditionalInformation}
        options={{
          headerShown: true,
          headerTitle: t('additional:ADDITIONAL'),
          headerLeft: () => null,
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />
      <Stack.Screen
        name="BusinessAdditionalInformation"
        component={BusinessAdditionalInformation}
        options={{
          headerShown: true,
          headerTitle: t('additional:ADDITIONAL'),
          headerLeft: () => null,
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />
      <Stack.Screen name="AddGifts" component={AddGifts} />
      <Stack.Screen
        name="AboutYouBusiness"
        component={AboutYouBusiness}
        options={{
          headerShown: true,
          headerTitle: 'About',
          headerBackTitle: ' ',
          headerLeft: () => null,
          headerTitleStyle: {
            fontFamily: FontFamily.FiraSansRegular,
          },
        }}
      />
      <Stack.Screen name="AddForgivenGifts" component={AddForgivenGifts} />

      <Stack.Screen
        name="MiscIncomeExpenses"
        component={MiscIncomeExpenses}
        options={{
          headerShown: true,
          headerTitle: t('questionnaire:MISC_INCOME_EXPENSES'),
          headerBackTitle: ' ',
          headerLeft: () => null,
          headerTitleStyle: {
            fontFamily: FontFamily.FiraSansRegular,
          },
        }}
      />
      <Stack.Screen
        name="Moving"
        component={Moving}
        options={{
          headerShown: true,
          headerTitle: t('questionnaire:MOVING'),
          headerBackTitle: ' ',
          headerLeft: () => null,
          headerTitleStyle: {
            fontFamily: FontFamily.FiraSansRegular,
          },
        }}
      />
      <Stack.Screen
        name="DynamicQuestions"
        component={DynamicQuestions}
        options={{
          headerShown: true,
          headerLeft: () => null,
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />
      <Stack.Screen
        name="Retirement"
        component={Retirement}
        options={{
          headerShown: true,
          headerLeft: () => null,
          headerTitleStyle: { color: Colors.black },
          headerTintColor: Colors.testColorBlue,
          headerBackTitleStyle: { color: Colors.testColorBlue },
        }}
      />
      <Stack.Screen
        name="ViewUpdateBusiness"
        component={ViewUpdateBusiness}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ViewUpdateAddress"
        component={ViewUpdateAddress}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ViewUpdatePrimaryContact"
        component={ViewUpdatePrimaryContact}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ViewUpdateAnnual"
        component={ViewUpdateAnnual}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Event"
        component={Event}
        options={{
          headerShown: true,
          headerTitle: t('questionnaireBusiness:EVENTS'),
          headerBackTitle: ' ',
          headerLeft: () => null,
          headerTitleStyle: {
            fontFamily: FontFamily.FiraSansRegular,
          },
        }}
      />

      <Stack.Screen
        name="BusinessManualSign"
        component={BusinessManualSign}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
