import {View, Text} from 'react-native';
import React from 'react';
import SafeArea from '../../components/core/SafeArea';
import styled from 'styled-components/native';

const ViewInvoice = ({route}: any) => {
  const {item} = route.params;
  console.log('Item : ', item);
  return (
    <SafeArea>
      <Container>
        <ItemContainer>
          <Text>Invoice Number</Text>
          <Text>{item.invoiceNumber}</Text>
        </ItemContainer>
        <ItemContainer>
          <Text>Invoice Refrence</Text>
          <Text>{item.referenceNo}</Text>
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
