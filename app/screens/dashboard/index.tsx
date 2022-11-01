import {View, Text} from 'react-native';
import React from 'react';
import SafeArea from '../../components/core/SafeArea';
import {useDispatch, useSelector} from 'react-redux';
import {MainState} from '../../redux/interfaces';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {CREATE_INVOICE_ROUTE, LIST_INVOICE_ROUTE} from '../../constants/routes';
const Dashboard = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeArea>
      <Container>
        <IButton onPress={() => navigation.navigate(CREATE_INVOICE_ROUTE)}>
          <ButtonText>Create Invoice</ButtonText>
        </IButton>
        <IButton onPress={() => navigation.navigate(LIST_INVOICE_ROUTE)}>
          <ButtonText>List all Invoices</ButtonText>
        </IButton>
      </Container>
    </SafeArea>
  );
};

export default Dashboard;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-left: 10px;
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
