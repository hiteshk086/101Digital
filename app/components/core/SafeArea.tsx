import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
interface ISafeArea {
  children: React.ReactNode;
}

const SafeArea: React.FC<ISafeArea> = props => {
  const {children} = props;
  return <SafeAreaContainer>{children}</SafeAreaContainer>;
};

export default SafeArea;

const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;
