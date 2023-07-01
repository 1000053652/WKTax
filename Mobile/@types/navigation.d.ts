import { NavigatorScreenParams } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import {
  DRLListResponse,
  DRLAttachmentsResponse,
} from '../src/services/modules/questionnaire/responseTypes'
import { FilePickerTypes, AttachmentFileData } from '../src/types/commonTypes'
import DynamicQuestions from "../src/screens/Questionnaire/Tabs/DynamicQuestions";
import { Retirement } from "../src/screens"

export interface OptimisticNavigation<T> {
  primaryKey: string
  context?: T
  data?: T
}

export type MainParamsList = {
  Home: undefined
}
export type PDFViewerScreenProps = {
  url: string
  title: string
}
export type AddUpdateGeneralDetailsProps = {
  selectedItemName: string | undefined | null
  entityPageID: string | undefined | null
  entityId?: string | undefined | null
}
export type QuestionnaireScreenProps = {
  selectedIndex: number,
  showMissingDocs?: boolean
}
export type SelectedFilesData = {
  files: AttachmentFileData[]
  type: FilePickerTypes
}
export type AddNewDocumentProps = {
  isSupplimental?: boolean
  onlyPhotos?: boolean
  selectedFiles: (data: SelectedFilesData) => void
}
export type DRLQuickNotesProps = {
  lineItem: DRLListResponse | null
}
export type DRLReplyWithAmoutProps = {
  item: DRLListResponse | null
}
export type AttachmentsMenuProps = {
  attachment?: DRLAttachmentsResponse
  lineItem: DRLListResponse | null
}
export type PDFConversionProps = {
  selectedImages: AttachmentFileData[] | null
  fileName: string,
  onSave: (data: AttachmentFileData) => void
  onCancel: () => void
}
export type AddAdditionalDocumentProps = {
  lineItem: DRLListResponse | null
}
export type ApplicationStackParamList = {
  Login: undefined
  MyWebComponent: undefined
  Main: undefined
  RequestListScreen: undefined
  PDF: undefined
  Auth: undefined
  AddFirm: undefined
  Main: NavigatorScreenParams<MainParamsList>
  Share: undefined
  ContactScreen: undefined
  DrawerHomeScreen: undefined
  TasksScreen: undefined
  ChangePasswordScreen: undefined
  ProfileScreen: undefined
  FirmConnections: undefined
  HomeScreen: undefined
  ServiceRequestList: undefined
  WebComponentScreen: undefined
  AboutYou: undefined
  ViewPdfScreen: undefined
  AnswerQuestionnaireScreen: undefined
  QuestionnaireScreen: QuestionnaireScreenProps
  PersonalScreen: undefined
  DependentsScreen: undefined
  TaxPayerEditScreen: undefined
  SpouseEditScreen: undefind
  AddressEditScreen: undefined
  TaxableScreen: undefined
  FillingDetailsScreen: undefined
  AddFinancialScreen: undefined
  AddElectronicFundsScreen: undefined
  AddViewDepenedents: undefined
  AsstesScreen: undefined
  AddViewAssets: undefined
  AddViewAssetsBusiness:undefined
  AddUpdateBusinessGeneralDetails: AddUpdateGeneralDetailsProps
  AddUpdateFarmGeneralDetails: AddUpdateGeneralDetailsProps
  AddUpdateRentalGeneralDetails: AddUpdateGeneralDetailsProps
  Income: undefined
  BusinessRentalHomeScreen: undefined
  BusinessEntityInfo: undefined
  RentalEntityInfo: undefined
  FarmEntityInfo: undefined
  RentalIncome: undefined
  FarmIncome: undefined
  HomeOfficeListing: undefined
  HomeOfficeAddEdit: undefined
  VehiclesScreen: undefined
  AddEditVehicleScreen: undefined
  AddVehicleExpenseScreen: undefined
  DRLLandingScreen: undefined
  AddNewDocument: AddNewDocumentProps
  BusinessExpensesView: undefined
  FarmExpensesView: undefined
  RentalExpensesView: undefined
  HomeOfficeExpense: undefined
  StatutoryBusiness: undefined
  DRLQuickNotes: DRLQuickNotesProps
  PDFConversion: PDFConversionProps
  AttachmentsMenu: AttachmentsMenuProps
  ReplyWithAmount: DRLReplyWithAmoutProps
  AddingAdditionalDocument: AddAdditionalDocumentProps
  AddFirmConnection: undefined
  AuthNavigator: undefined
  AfterLoginNavigator: undefined
  TaxPayment: undefined
  QuestionnaireBusiness: QuestionnaireScreenProps
  BusinessInformation: undefined
  AdditionalBusiness: undefined
  AssetsBusiness: undefined
  TaxPaymentBusiness: undefined
  Gifts: undefined
  ElectronicFundsScreen: undefined
  AboutYouBusiness: undefined
  TaxPaymentAddEdit: undefined
  TaxPaymentBusinessAddEdit: undefined
  AddGifts: undefined
  AddForgivenGifts: undefined
  AdditionalInformation: undefined
  MiscIncomeExpenses: undefined
  Moving: undefined
  DynamicQuestions:ApplicationScreenProps
  AddIncomeModal:undefined
  Retirement:ApplicationScreenProps
  BusinessAdditionalInformation: undefined
  ViewUpdateBusiness: undefined
  ViewUpdateAddress: undefined
  ViewUpdatePrimaryContact:undefined
  ViewUpdateAnnual:undefined
  Event:undefined
  BusinessManualSign: undefined
  AppDrawerNavigator: undefined
  MenuScreen: undefined
}

export type ApplicationScreenProps = StackScreenProps<ApplicationStackParamList>
