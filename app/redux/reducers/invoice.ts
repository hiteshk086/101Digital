import {AnyAction} from 'redux';
import {CREATE_INVOICE_SUCCESS} from '../../constants/actions';
import {defaultState} from '../initialState';

const invoiceReducer = (
  state: any = defaultState.invoice,
  action: AnyAction,
) => {
  switch (action.type) {
    case CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        createInvoice: action.data,
      };
    default:
      return state;
  }
};

export default invoiceReducer;
