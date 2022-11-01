import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnyAction} from 'redux';
import {FETCH_USER_PROFILE_SUCCESS} from '../../constants/actions';
import {defaultState} from '../initialState';

const authReducer = (state: any = defaultState.auth, action: AnyAction) => {
  switch (action.type) {
    case FETCH_USER_PROFILE_SUCCESS:
      console.log('SSSS');
      AsyncStorage.setItem('@org_token', action.data.data.memberships[0].token);
      return {
        ...state,
        data: action.data.data,
      };
    default:
      return state;
  }
};

export default authReducer;
