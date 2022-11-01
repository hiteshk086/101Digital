import {MainState} from '../redux/interfaces';

import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {AnyAction, Dispatch} from 'redux';

import {BASE_URL} from '../constants';
import {encryptRequestData} from '../utils/encryption';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CallApiProps = {
  data: any;
  method: Method;
  endpoint: string;
  params?: {
    [x: string]: any;
  };
  authenticated?: boolean;
  keysToEncrypt?: string[];
  id?: string | number;
  isOrg?: boolean;
};

type MiddlewareAsyncAction = {
  types: string[];
  payload?: any;
} & CallApiProps;

type SynchronousAction = {
  type: string;
  payload?: any;
};

const checkIfResponseHasToken = (response: any) => !!response?.access_token;

const callApi = async ({
  data,
  method,
  endpoint,
  params,
  authenticated,
  keysToEncrypt = [],
  isOrg,
}: CallApiProps): Promise<any> => {
  const url = BASE_URL + endpoint;
  console.log('API URL --> ', url);
  const config: AxiosRequestConfig = {method, url, params};

  if (data) {
    config.data = keysToEncrypt
      ? encryptRequestData(data, keysToEncrypt)
      : data;
  }
  if (authenticated) {
    const tokenData: any = await AsyncStorage.getItem('@accessToken');
    const orgToken: any = await AsyncStorage.getItem('@org_token');
    const accessToken = JSON.parse(tokenData).access_token;
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    if (isOrg) {
      config.headers = {
        ...config.headers,
        'org-token': orgToken,
      };
    }
  }
  console.log('Config : ', config);

  return axios(config)
    .then((response: AxiosResponse) => {
      /*
       * Store JWT in AsyncStorage
       */
      if (checkIfResponseHasToken(response?.data)) {
        const authData = {
          access_token: response?.data?.access_token,
          refresh_token: response?.data?.refresh_token,
        };
        AsyncStorage.setItem('@accessToken', JSON.stringify(authData));
      }
      return response;
    })
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch(err => {
      return err?.response;
    });
};

export default ({
    dispatch,
    getState,
  }: {
    dispatch: Dispatch<AnyAction>;
    getState: () => MainState;
  }) =>
  (next: Dispatch<AnyAction>) =>
  (action: MiddlewareAsyncAction | SynchronousAction) => {
    if ((action as SynchronousAction).type) {
      return next(action as SynchronousAction);
    }

    const {
      data,
      method,
      endpoint,
      params,
      authenticated,
      types,
      keysToEncrypt,
      id,
      isOrg,
    } = action as MiddlewareAsyncAction;
    const [requestType, successType, errorType] = types;

    const requestAction = {id, data, type: requestType, params};
    next(requestAction);

    return callApi({
      data,
      method,
      endpoint,
      params,
      authenticated,
      keysToEncrypt,
      isOrg,
    })
      .then(
        response => {
          const {data, message} = response;
          console.log('API CALLED --> ', JSON.stringify(data), response.status);
          if (
            data.status.code == '000000' ||
            data.status.code == 201 ||
            data.status.message == 'Request processed successfully' ||
            response.status == 200 ||
            response.status == 201
          ) {
            console.log('API SUCCESS : ');
            next({
              data,
              type: successType,
              message,
            });
          } else {
            next({error: message, data, type: errorType});
          }
        },
        error => {
          next({error, type: errorType});
        },
      )
      .catch(error => {
        console.log(error);
      });
  };
