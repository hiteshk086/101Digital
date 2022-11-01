import {AnyAction} from 'redux';
import {ADD_INVOICE, CREATE_INVOICE_SUCCESS} from '../../constants/actions';
import {defaultState} from '../initialState';

const invoiceReducer = (
  state: any = defaultState.invoice,
  action: AnyAction,
) => {
  switch (action.type) {
    case ADD_INVOICE:
      const arr = [...state.allInvoices];
      arr.push(action.data);
      return {
        ...state,
        allInvoices: arr,
      };
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
