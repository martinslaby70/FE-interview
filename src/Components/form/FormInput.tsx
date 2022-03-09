import {Controller} from 'react-hook-form';
import ReactSelect from 'react-select';
import {Input, Textarea, Text, Box} from '@chakra-ui/react';
import styled from 'styled-components';

import {usePartialFormContext} from './contexts/partialForm';
import {BaseComboBoxProps, ComboBoxOption, FormInputProps} from './types';
import Combobox from './Combobox';

const StyledInput = styled(Input)`
  height: 32px !important;
  background-color: white !important;
  border: 1px solid #b3bac5 !important;
  box-sizing: border-box;
  border-radius: 4px !important;
`;

const InputTitle = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: #42526e;
  margin-bottom: 5px;
`;

// for total of 3 input variants, i just shoved them into one file, but later on, it should be
// divided between controlled and uncontrolled with each having `transform props` hook.

const FormInput = (props: FormInputProps) => {
  const {control, register} = usePartialFormContext();
  const {name, required, variant} = props;

  if (variant === 'ComboBox')
    return (
      <Controller
        render={({field: {ref: __, ...inputProps}, fieldState}) => (
          <Box mt="16px">
            {props.title && (
              <Box mb="5px">
                <InputTitle>{props.title}</InputTitle>
              </Box>
            )}
            <Combobox {...(props as BaseComboBoxProps)} {...inputProps} />
            {fieldState.error && (
              <Text fontSize="xs" color="red">
                {fieldState.error.message}
              </Text>
            )}
          </Box>
        )}
        rules={{
          required,
        }}
        control={control}
        name={name}
      />
    );
  if (variant === 'text')
    return (
      <>
        {props.title && (
          <Box mb="5px" mt="16px">
            <InputTitle>{props.title}</InputTitle>
          </Box>
        )}
        <StyledInput
          placeholder={props.placeholder}
          displayMargin={!!props.title}
          {...register(name, {required})}
        />
      </>
    );

  if (variant === 'textarea')
    return (
      <Textarea
        mt="16px"
        placeholder={props.placeholder}
        borderColor="#B3BAC5"
        {...register(name, {required})}
      />
    );

  return null;
};

export default FormInput;
