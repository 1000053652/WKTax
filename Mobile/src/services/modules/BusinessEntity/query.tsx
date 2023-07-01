import { apiServer } from '../../Constant'

export const getBusinessEntityMultipleQuery = () => {
  return {
    url: apiServer.API_BASE_URL_QUESTIONNAIRE + `/organizer/api/Questions/9001`,
    method: 'GET',
  }
}

export const getBusinessEntityEventQuery = (data: any) => {
  return {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/urlsubmit2/9001`,
    method: 'POST',
    body: data,
  }
}

export const getSubmitCustomQuestions = (data: any) => {
  return {
    url: `https://zuscudtclbaps002.azurewebsites.net/organizer/api/Questions/SubmitCustomQuestions`,
    method: 'PUT',
    body: data,
  }
}
