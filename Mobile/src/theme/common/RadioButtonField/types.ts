import { Color } from '../../../designSystem/constants'

export type RadioButtonGroup = {
  label: string
  value: string | number
}

export enum RadioButtonDirection {
  Row = 'row',
  Column = 'column',
}

export type RadioButtonFieldProp = {
  title: string
  selectedIndex: number
  radioButtonDirection?: RadioButtonDirection
  testID?: string
  radioGroup: Array<RadioButtonGroup>
  radioGroupColor?: Color
  callBack: (title: string, state: string) => void
}
