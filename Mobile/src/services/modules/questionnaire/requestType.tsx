export type DetailPageRequest<T extends unknown> = {
  entityPageID: string
  pagecode: string
  entityId: string
  modelJson: DetailsModelJson<T>
}
export type DetailsModelJson<T> = {
  data: T | null
  grids: null
}

export type IndividualTileRequest = {
  pageCode: string
  gridCode: string
  entityID: string
}
