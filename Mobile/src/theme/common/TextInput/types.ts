import { ReactElement } from 'react'
import { Control, FieldValues } from 'react-hook-form'
import { Maybe } from '../../../types'
import any = jasmine.any

export type NumberFieldType =
  | 'number'
  | 'currency'
  | 'days'
  | 'percentage'
  | 'pattern'
export interface FieldProps {
  control: Control<FieldValues, any>
  name: string
  label?: string
  accessibilityLabel?: string
  editable?: boolean
  placeholder?: string
  required?: boolean
  iconPressed?: (selected?: string) => void
  icon?: ReactElement<typeof any>
  isTextArea?: boolean
  heightForMultilineTextField?: number
  testID?: string
  disabled?: boolean
  defaultValue?: Maybe<string> | undefined
  styleTextBox?: {}
  labelStyle?: {}
  data?: {}
  max?: number
  min?: number
  onChangeText?: (value?: string) => void
  error?: string | null
  keyboardType?: string
  fieldType?: NumberFieldType | undefined
  maxValue?: number
  pattern?: string
  dropdownPosition?: 'auto' | 'top' | 'bottom'
}
