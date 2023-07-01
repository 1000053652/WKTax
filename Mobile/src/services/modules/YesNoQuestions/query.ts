import { apiServer } from '../../Constant'
export const getYesNoQuestionsQuery = (items: {}) => {
  return {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/Nav/UrlSubmit2/${items.id}`,
    method: 'post',
    body: items.data,
  }
}
