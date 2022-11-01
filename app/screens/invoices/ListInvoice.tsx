// Screen that will be displayed when user want to see all invoices

import {View, Text, FlatList, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeArea from '../../components/core/SafeArea';
import axios from 'axios';
import {BASE_URL} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {VIEW_INVOICE} from '../../constants/routes';
import {useDispatch, useSelector} from 'react-redux';
import {pushNewInvoice} from '../../redux/actions/invoice';
import {MainState} from '../../redux/interfaces';
import _ from 'lodash';
const ListInvoice = () => {
  //   const [invoices, setInvoices] = useState([]);
  const [searchInvoice, setSearchInvoices] = useState<any[]>([]);
  const [searchString, setSearchString] = useState('');
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const invoices = useSelector((state: MainState) => state.invoice.allInvoices);
  const fetchInvoice = async () => {
    const tokenData: any = await AsyncStorage.getItem('@accessToken');
    const orgToken: any = await AsyncStorage.getItem('@org_token');
    const accessToken = JSON.parse(tokenData).access_token;
    const queryParams: any = {};
    queryParams.pageNum = 1;
    queryParams.pageSize = 10;
    queryParams.dateType = 'INVOICE_DATE';
    queryParams.sortBy = 'CREATED_DATA';
    queryParams.ordering = 'ASCENDING';
    console.log('Headers : ', {
      Authorization: `Bearer ${accessToken}`,
      org_token: orgToken,
    });

    axios({
      url: BASE_URL + '/invoice-service/1.0.0/invoices',
      method: 'GET',
      params: queryParams,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        org_token: orgToken,
      },
    })
      .then(res => {
        console.log('LIST INVOICE : ', JSON.stringify(res.data.data));
        res.data.data.map((res: any) => {
          dispatch(pushNewInvoice(res));
        });
        // setInvoices(res.data.data);
        setSearchInvoices(res.data.data);
      })
      .catch(err => console.log('List Invoice Error --> ', err));
  };
  useEffect(() => {
    if (_.isEmpty(invoices)) {
      fetchInvoice();
    }
  }, []);
  useEffect(() => {
    if (searchString !== '') {
      const data = invoices.filter((res: any) => {
        const string = res.invoiceNumber.toLowerCase();
        return string.includes(searchString.toLowerCase());
      });
      setSearchInvoices(data);
    } else {
      setSearchInvoices(invoices);
    }
  }, [searchString]);
  return (
    <SafeArea>
      <FlatList
        data={searchInvoice}
        style={{paddingHorizontal: 10}}
        ListHeaderComponent={
          <SearchContainer>
            <SearchInput
              placeholder="Search by number"
              onChangeText={e => setSearchString(e)}
            />
          </SearchContainer>
        }
        renderItem={({item, index}: any) => {
          return (
            <InvoiceContainer
              onPress={() => navigation.navigate(VIEW_INVOICE, {item})}>
              <Text>Invoice no:- {item.invoiceNumber}</Text>
            </InvoiceContainer>
          );
        }}
      />
    </SafeArea>
  );
};

export default ListInvoice;

const InvoiceContainer = styled.TouchableOpacity`
  border-width: 1px;
  padding: 10px;
  margin-vertical: 10px;
`;

const SearchInput = styled.TextInput`
  background-color: #dfdfdf;
  padding: 10px;
  border-radius: 5px;
`;
const SearchContainer = styled.View`
  margin-top: 10px;
`;
