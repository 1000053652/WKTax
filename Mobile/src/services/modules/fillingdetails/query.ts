import { apiServer } from '../../Constant'
export const getFillingDetailsQuery = (items: {}) => {
  const data = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/Nav/UrlSubmit2/${items.id}`,
    method: 'post',
    body: items.data,
  }
  return data
}
export const getFillingDetailsDeleteQuery = (items: {}) => {
  const data = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/deletepageentity/0/${items.id}`,
    method: 'post',
    body: items?.data,
    headers: { modelJson: items?.headers },
  }
  return data
}
export const getFillingDetailsDoneQuery = (item: any) => {
  const data = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      '/organizer/api/Nav/UrlSubmit2/6006',
    method: 'post',
    body: item,
  }
  return data
}

export const getFillingDetailsEditQuery = (item: {}) => {
  const data = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/editpageentity/${item.id}`,
    method: 'post',
    body: item.data,
    headers: { modelJson: item.headers },
  }
  return data
}
export const getFillingDetailsSaveQuery = (item: {}) => {
  const data = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/addpageentity/${item.id}`,
    method: 'post',
    body: item?.data,
    headers: { modelJson: item?.headers },
  }
  return data
}
export const getFillingDetailsPageQuery = (item: {}) => {
  const data = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/detailpage?code=${item.id}`,
    method: 'get',
    headers: { modelJson: item.headers },
  }
  return data
}
