import {combineReducers} from 'redux';
import authReducer from './authentication';
import invoiceReducer from './invoice';

const appReducer = combineReducers({
  invoice: invoiceReducer,
  auth: authReducer,
});
export default appReducer;
