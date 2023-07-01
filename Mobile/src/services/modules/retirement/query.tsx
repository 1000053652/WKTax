import { apiServer } from '../../Constant'

export const getRetirementDetailsQuery = (items: {}) => {
  return {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      '/organizer/api/nav/urlsubmit2/7007',
    method: 'post',
    body: items?.data,
    headers: null,
  }
}
