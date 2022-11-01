import {View, Text, Button} from 'react-native';
import React from 'react';
import SafeArea from '../../components/core/SafeArea';
import styled from 'styled-components/native';
import ControlledInput from '../../components/core/controlled/ControlledInput';
import * as Yup from 'yup';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {getAccessToken} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {getUserProfile} from '../../redux/actions/authentication';
import {USER_PASSWORD, USER_USERNAME} from '../../constants';
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Please enter your username'),
  password: Yup.string().required('Please enter your password'),
});
const Login = () => {
  const dispatch = useDispatch<any>();
  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm({mode: 'all', resolver: yupResolver(validationSchema)});

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const userData = {
      username: data.username,
      password: data.password,
    };
    getAccessToken(userData)
      .then(async data => {
        console.log('Data : ', JSON.stringify(data.data));
        await AsyncStorage.setItem('@accessToken', JSON.stringify(data.data));
        dispatch(getUserProfile());
      })
      .catch(err => {
        console.log('Error :: ', err);
        reset();
      });
    console.log('Data --> ', data);
  };
  return (
    <SafeArea>
      <Container>
        <InputContainer>
          <InputLabel>Username</InputLabel>
          <ControlledInput
            control={control}
            errors={errors}
            defaultValue={USER_USERNAME}
            name="username"
            placeholder="Enter Username..."
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Password</InputLabel>
          <ControlledInput
            control={control}
            errors={errors}
            defaultValue={USER_PASSWORD}
            name="password"
            placeholder="Enter Password..."
          />
        </InputContainer>
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </Container>
    </SafeArea>
  );
};

export default Login;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
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
