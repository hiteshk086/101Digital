import {Text, TextInput} from 'react-native';
import React, {ComponentProps} from 'react';
import {Control, Controller, FieldValues} from 'react-hook-form';
import styled from 'styled-components/native';
type Props = {
  name: string;
  control: Control<FieldValues, object>;
  errors?: any;
  rules?: any;
  defaultValue?: any;
} & ComponentProps<typeof TextInput>;
const ControlledInput = ({
  name,
  control,
  errors,
  rules,
  defaultValue,
  ...props
}: Props) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({field: {onChange, onBlur, value}}) => (
          <Input value={value} onChangeText={onChange} {...props} />
        )}
      />
      {!!errors?.[name] ? (
        <Text style={{color: !!errors?.[name] ? 'red' : '#000'}}>
          {errors?.[name] ? errors?.[name]?.message || 'Invalid field' : ''}
        </Text>
      ) : null}
    </>
  );
};

export default ControlledInput;

const Input = styled.TextInput`
  border-width: 1px;
  padding: 10px;
  width: 100%;
`;
