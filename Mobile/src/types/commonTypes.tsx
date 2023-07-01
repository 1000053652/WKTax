export enum FilePickerTypes {
  Camera,
  PhotoLibrary,
  Upload,
}
export type AttachmentFileData = {
  uri?: string
  fileSize?: number | null
  fileName?: string | null
}
