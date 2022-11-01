import {View, Text} from 'react-native';
import React from 'react';
import Dashboard from './app/screens/dashboard';
import {Provider} from 'react-redux';
import {store} from './app/redux/store';
import RootNavigation from './app/navigations/routes';

// const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
