import { GetTokenRequest } from './requestTypes'

export const ValidateFirmCodeQuery = (firmCode: string) => {
  const data = {
    url: `/engagement/api/m/auth/ValidateFirm?firmCode=${firmCode}`,
    method: 'get',
  }
  return data
}
export const FirmNameQuery = (firmCode: string) => {
  const data = {
    url: `/engagement/api/m/FirmDetails/Name?firmCode=${firmCode}`,
    method: 'get',
  }
  return data
}
export const GetTokenQuery = (data: GetTokenRequest) => {
  const request = {
    url: `/engagement/api/m/auth/GetToken?authCode=${data.authCode}&appCode=Client`,
    method: 'get',
    headers: {
      AuthToken: data.authToken,
    },
  }
  return request
}

export const RefreshTokenQuery = (data: GetTokenRequest) => {
  const request = {
    url: '/engagement/api/m/auth/RefreshToken?appCode=Client',
    method: 'get',
    headers: {
      Authorization: data.authCode,
      AuthToken: data.authToken,
    },
  }
  return request
}

export const RevokeTokenQuery = {
  url: '/engagement/api/m/auth/RevokeToken?appCode=Client',
  method: 'get',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
}
export const logoutAPIQuery = {
  url: '/engagement/api/m/auth/RevokeToken?appCode=Client',
  method: 'get',
}
