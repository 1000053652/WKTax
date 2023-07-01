import { apiServer } from '../../Constant'

export const getHomeIndividualTilesQuery = (data: string) => {
  const request = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      '/organizer/api/nav/urlsubmit2/6008',
    method: 'post',
    body: JSON.stringify({
      data: data,
      grids: null,
    }),
  }
  return request
}
