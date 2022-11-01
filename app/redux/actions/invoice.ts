import {
  ADD_INVOICE,
  CREATE_INVOICE_FAILURE,
  CREATE_INVOICE_REQUEST,
  CREATE_INVOICE_SUCCESS,
} from '../../constants/actions';
import {getRandNumber, getRandomWord, makeid} from '../../utils/functions';

export const createInvoice = (data: any) => {
  const body = hello;
  body.listOfInvoices[0].invoiceReference = data.invoiceRef;
  body.listOfInvoices[0].invoiceNumber = data.invoiceNum;
  body.listOfInvoices[0].description = data.description;
  body.listOfInvoices[0].items[0].quantity = getRandNumber();
  body.listOfInvoices[0].items[0].rate = getRandNumber();
  body.listOfInvoices[0].items[0].itemName = getRandomWord();
  body.listOfInvoices[0].items[0].description = makeid(10);
  return {
    method: 'post',
    endpoint: '/invoice-service/2.0.0/invoices',
    data: hello,
    authenticated: true,
    isOrg: true,
    types: [
      CREATE_INVOICE_REQUEST,
      CREATE_INVOICE_SUCCESS,
      CREATE_INVOICE_FAILURE,
    ],
  };
};

export const pushNewInvoice = (data: any) => {
  return {
    type: ADD_INVOICE,
    data,
  };
};
const hello = {
  listOfInvoices: [
    {
      bankAccount: {
        bankId: '',
        sortCode: '09-01-01',
        accountNumber: '12345678',
        accountName: 'John Terry',
      },
      customer: {
        firstName: 'Nguyen',
        lastName: 'Dung 2',
        contact: {
          email: 'nguyendung2@101digital.io',
          mobileNumber: '+6597594971',
        },
        addresses: [
          {
            premise: 'CT11',
            countryCode: 'VN',
            postcode: '1000',
            county: 'hoangmai',
            city: 'hanoi',
          },
        ],
      },
      documents: [
        {
          documentId: '96ea7d60-89ed-4c3b-811c-d2c61f5feab2',
          documentName: 'Bill',
          documentUrl: 'http://url.com/#123',
        },
      ],
      invoiceReference: '#123456',
      invoiceNumber: 'INV123456701',
      currency: 'GBP',
      invoiceDate: '2021-05-27',
      dueDate: '2021-06-04',
      description: 'Invoice is issued to Akila Jayasinghe',
      customFields: [
        {
          key: 'invoiceCustomField',
          value: 'value',
        },
      ],
      extensions: [
        {
          addDeduct: 'ADD',
          value: 10,
          type: 'PERCENTAGE',
          name: 'tax',
        },
        {
          addDeduct: 'DEDUCT',
          type: 'FIXED_VALUE',
          value: 10.0,
          name: 'discount',
        },
      ],
      items: [
        {
          itemReference: 'itemRef',
          description: 'Honda RC150',
          quantity: 1,
          rate: 1000,
          itemName: 'Honda Motor',
          itemUOM: 'KG',
          customFields: [
            {
              key: 'taxiationAndDiscounts_Name',
              value: 'VAT',
            },
          ],
          extensions: [
            {
              addDeduct: 'ADD',
              value: 10,
              type: 'FIXED_VALUE',
              name: 'tax',
            },
            {
              addDeduct: 'DEDUCT',
              value: 10,
              type: 'PERCENTAGE',
              name: 'tax',
            },
          ],
        },
      ],
    },
  ],
};
