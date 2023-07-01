import React from "react";

interface listDataType {
  title: string
  data: data[]
}
type ListItemBaseType =
    | string
    | React.ReactElement
    | (() => React.ReactElement)
    | undefined
    | null // handle undefined element
type ListItemNodeType = ListItemBaseType | ListItemBaseType[]
interface data {
  name: string
  firmName: string
  description: string
  entityID: string
  fieldValue: string
  isProforma: boolean
  processedFieldValue: string
  renderItem?:ListItemNodeType
  renderHiddenItem?:ListItemNodeType
}
export type SwipeListProps = {
  listData: any
  rowClick?: (data: {}) => void
  deleteRow?: (data: {}) => void
  closeRow?: (data: {}, rowKeys: {}) => void
  refreshPage?: boolean
  rightOpenValue?: number
  previewRowKey?: string
  previewOpenValue?: number
  previewOpenDelay?: number
  leftOpenValue?: number
  rowHeight?: number
  deleteText?: string
  name?: string
  onSwipeValueChange?: (data: {}, rowKeys: {}) => void
  isShowDelete?: boolean
  renderItem?:any
  renderHiddenItem?:any
  keyExtractor?:any
  
}
export const dataDefaultValue: listDataType = {
  title: 'test',
  data: [
    {
      name: 'test',
      firmName: 'rr',
      description: 'test',
      entityID: '1',
      fieldValue: 'test',
      isProforma: false,
      processedFieldValue: 'test',
    },
  ],
}
