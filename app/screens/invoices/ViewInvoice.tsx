// Screen that will be displayed when user want to see an invoice

import {View, Text} from 'react-native';
import React from 'react';
import SafeArea from '../../components/core/SafeArea';
import styled from 'styled-components/native';
import moment from 'moment';
const ViewInvoice = ({route}: any) => {
  const {item} = route.params;
  console.log('Item : ', item);
  return (
    <SafeArea>
      <Container>
        <ItemContainer>
          <Text>Invoice Number</Text>
          <Text>{item.invoiceNumber || item.invoiceNumber}</Text>
        </ItemContainer>
        <ItemContainer>
          <Text>Invoice Refrence</Text>
          <Text>{item.referenceNo}</Text>
        </ItemContainer>
        <ItemContainer>
          <Text>Invoice Date</Text>
          <Text>{moment(item.invoiceDate).format('ll')}</Text>
        </ItemContainer>
        <ItemContainer>
          <Text>Created At</Text>
          <Text>{moment(item.createdAt).format('ll')}</Text>
        </ItemContainer>
        <ItemContainer>
          <Text>Payment Due</Text>
          <Text>{moment(item.dueDate).format('ll')}</Text>
        </ItemContainer>
        <ItemContainer>
          <Text>Total({item.currency})</Text>
          <Text>{item.totalAmount}</Text>
        </ItemContainer>
        <ItemContainer>
          <Text>Description</Text>
          <Text>{item.description}</Text>
        </ItemContainer>
      </Container>
    </SafeArea>
  );
};

export default ViewInvoice;

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-vertical: 5px;
`;
