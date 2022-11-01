import {
  FETCH_ACCESS_TOKEN_FAILURE,
  FETCH_ACCESS_TOKEN_REQUEST,
  FETCH_ACCESS_TOKEN_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
} from '../../constants/actions';
import qs from 'qs';
export const fetchUserDetail = () => {
  const data = {
    client_id: 'oO8BMTesSg9Vl3_jAyKpbOd2fIEa',
    client_secret: '0Exp4dwqmpON_ezyhfm0o_Xkowka',
    grant_type: 'password',
    scope: 'openid',
    username: 'dung+octopus4@101digital.io',
    password: 'Abc@123456',
  };
  return {
    method: 'post',
    data: qs.stringify(data),
    endpoint: '/token',
    types: [
      FETCH_ACCESS_TOKEN_REQUEST,
      FETCH_ACCESS_TOKEN_SUCCESS,
      FETCH_ACCESS_TOKEN_FAILURE,
    ],
  };
};

export const getUserProfile = () => {
  return {
    method: 'get',
    endpoint: '/membership-service/1.2.0/users/me',
    authenticated: true,
    types: [
      FETCH_USER_PROFILE_REQUEST,
      FETCH_USER_PROFILE_SUCCESS,
      FETCH_USER_PROFILE_FAILURE,
    ],
  };
};
