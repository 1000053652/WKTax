import { StackNavigationProp } from '@react-navigation/stack'
import {
  DRLAttachmentsResponse,
  DRLCategoriesResponse,
  DRLListResponse,
} from '../../../services/modules/questionnaire/responseTypes'
import { ApplicationStackParamList } from '../../../../@types/navigation'
export interface DRLListItemProps {
  item: DRLCategoriesResponse
  onHeaderPress: (item: DRLCategoriesResponse) => void
  onPressAttachment: (
    category: DRLCategoriesResponse,
    lineItem: DRLListResponse
  ) => void
  navigation: StackNavigationProp<
    ApplicationStackParamList,
    keyof ApplicationStackParamList,
    undefined
  >
}
export interface DRLLineItemProps {
  lineItems: [DRLListResponse]
  onAttachmentCountClick: (item: DRLListResponse) => void
  navigation: StackNavigationProp<
    ApplicationStackParamList,
    keyof ApplicationStackParamList,
    undefined
  >
}
export interface AttachmentsProps {
  lineItem: DRLListResponse
  attachments: [DRLAttachmentsResponse]
  navigation: StackNavigationProp<
    ApplicationStackParamList,
    keyof ApplicationStackParamList,
    undefined
  >
}
