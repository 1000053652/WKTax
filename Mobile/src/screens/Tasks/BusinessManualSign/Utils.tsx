import { UserProfileData } from '../../../../src/services/modules/profile'
import { TaxReturnPackageDetails } from '../../../../src/services/modules/task/responseTypes'
import { t } from 'i18next'

export const dropDownData = [
  { value: 0, label: t('task:DOWNLOAD_SIGN') },
  { value: 1, label: t('task:UPLOAD_MARK_AS_SIGNED') },
]
export type TaxReturnPackageDetailsItemProps = {
  taxReturnData: TaxReturnPackageDetails
  onPressDownload: (item: TaxReturnPackageDetails) => void
  onPressUpload: (item: TaxReturnPackageDetails) => void
}
export type BusinessManualSignHeaderProps = {
  profileData: UserProfileData
  isAnySignatureRequired: boolean
}
