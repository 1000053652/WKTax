export enum YesNoResult {
  YES = '1',
  NO = '0',
  NONE = '',
}

export type YesNoButtonProps = {
  apiKey: string
  title: string
  callback: (state: YesNoResult, data: YesNoButtonProps) => void
  index?: number
  defaultValue?: string
  leftStyle?: {}
  titleAbove?: string
  disable?: boolean
  control?: any
  name?: string
}
