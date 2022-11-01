import axios from 'axios';
import {BASE_URL} from '../constants';
import qs from 'qs';

interface IUserData {
  username: string;
  password: string;
}
export const getAccessToken = async (user: IUserData) => {
  try {
    const data = {
      client_id: 'oO8BMTesSg9Vl3_jAyKpbOd2fIEa',
      client_secret: '0Exp4dwqmpON_ezyhfm0o_Xkowka',
      grant_type: 'password',
      scope: 'openid',
      username: user.username,
      password: user.password,
    };
    const response = await axios.post(BASE_URL + '/token', qs.stringify(data));
    return response;
  } catch (err: any) {
    throw new Error(err);
  }
};
