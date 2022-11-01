import {View, Text} from 'react-native';
import React from 'react';
import SafeArea from '../../components/core/SafeArea';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ControlledInput from '../../components/core/controlled/ControlledInput';
import {createInvoice} from '../../redux/actions/invoice';
import {getRandNumber, getRandomWord, makeid} from '../../utils/functions';
import axios from 'axios';
import {BASE_URL} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const validationSchema = Yup.object().shape({
  invoiceRef: Yup.string().required('Please enter invoice refrence'),
  invoiceNum: Yup.string().required('Please enter invoice number'),
  description: Yup.string().required('Please enter description'),
  amount: Yup.string().required('Enter amount'),
  quantity: Yup.string().required('Enter Quantity'),
});
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
      invoiceDate: '2021-06-1',
      dueDate: '2021-11-11',
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
const CreateInvoice = () => {
  const dispatch = useDispatch<any>();
  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm({mode: 'all', resolver: yupResolver(validationSchema)});
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    console.log('Data --> ', data);
    const tokenData: any = await AsyncStorage.getItem('@accessToken');
    const orgToken: any = await AsyncStorage.getItem('@org_token');
    const accessToken = JSON.parse(tokenData).access_token;
    const body = hello;
    body.listOfInvoices[0].invoiceReference = data.invoiceRef;
    body.listOfInvoices[0].invoiceNumber = data.invoiceNum;
    body.listOfInvoices[0].description = data.description;
    body.listOfInvoices[0].items[0].quantity = getRandNumber();
    body.listOfInvoices[0].items[0].rate = getRandNumber();
    body.listOfInvoices[0].items[0].itemName = getRandomWord();
    body.listOfInvoices[0].items[0].description = makeid(10);
    // dispatch(createInvoice(data));
    axios
      .post(BASE_URL + '/invoice-service/2.0.0/invoices', body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   'Operation-Mode': 'SYNC',
          'org-token': orgToken,
          'Content-Type': 'application/json',
        },
      })
      .then(res => console.log('Create : ', res.data))
      .catch(err => console.log('Error :: ', err));
  };
  return (
    <SafeArea>
      <Container bounces={false}>
        <InputContainer>
          <InputLabel>Invoice Refrence</InputLabel>
          <ControlledInput
            control={control}
            errors={errors}
            defaultValue={''}
            name="invoiceRef"
            placeholder="Enter Refrence"
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Invoice Number</InputLabel>
          <ControlledInput
            control={control}
            errors={errors}
            defaultValue={''}
            name="invoiceNum"
            placeholder="Enter Invoice Number"
            keyboardType="default"
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Invoice Description</InputLabel>
          <ControlledInput
            control={control}
            errors={errors}
            defaultValue={''}
            name="description"
            placeholder="Enter Invoice Description"
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Quantity</InputLabel>
          <ControlledInput
            control={control}
            errors={errors}
            defaultValue={''}
            name="quantity"
            placeholder="Enter Quantity"
            keyboardType="number-pad"
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Amount</InputLabel>
          <ControlledInput
            control={control}
            errors={errors}
            defaultValue={''}
            name="amount"
            placeholder="Enter Invoice Amount"
            keyboardType="number-pad"
          />
        </InputContainer>
        <IButton onPress={handleSubmit(onSubmit)}>
          <ButtonText>Submit</ButtonText>
        </IButton>
      </Container>
    </SafeArea>
  );
};

export default CreateInvoice;

const Container = styled.ScrollView`
  flex: 1;
  /* justify-content: center;
  align-items: center; */
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  color: #000000;
  font-weight: bold;
  text-align: center;
`;

const InputLabel = styled.Text`
  color: #000;
  margin-bottom: 10px;
  font-size: 16px;
`;

const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

const IButton = styled.TouchableOpacity`
  background-color: #1a72d7;
  width: 100%;
  padding-vertical: 10px;
  margin-vertical: 10px;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: #ffffff;
  font-size: 20px;
`;
