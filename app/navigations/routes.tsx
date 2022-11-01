import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import {
  CREATE_INVOICE_ROUTE,
  DASHBOARD_ROUTE,
  LIST_INVOICE_ROUTE,
  LOGIN_ROUTE,
  VIEW_INVOICE,
} from '../constants/routes';
import Dashboard from '../screens/dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {MainState} from '../redux/interfaces';
import CreateInvoice from '../screens/invoices/CreateInvoice';
import ListInvoice from '../screens/invoices/ListInvoice';
import ViewInvoice from '../screens/invoices/ViewInvoice';
const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const user = useSelector((state: MainState) => state.auth.data);
  const fetchAccessToken = async () => {
    try {
      const response = await AsyncStorage.getItem('@access_token');
      console.log('AccessToken : ', response);
      if (response !== null) {
        const access_token = JSON.parse(response);
        setToken(access_token.access_token);
      }
      setLoading(false);
    } catch (err) {
      console.log('AsyncStorage access_token error :: ', err);
    }
  };

  console.log('user ->  ', user);
  useEffect(() => {
    fetchAccessToken();
  }, []);

  if (loading) return null;
  return (
    <NavigationContainer>
      {!user?.userId ? (
        <Stack.Navigator>
          <Stack.Screen name={LOGIN_ROUTE} component={Login} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name={DASHBOARD_ROUTE} component={Dashboard} />
          <Stack.Screen name={CREATE_INVOICE_ROUTE} component={CreateInvoice} />
          <Stack.Screen name={LIST_INVOICE_ROUTE} component={ListInvoice} />
          <Stack.Screen name={VIEW_INVOICE} component={ViewInvoice} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;
