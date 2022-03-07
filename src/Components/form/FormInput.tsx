import {Controller} from 'react-hook-form';
import ReactSelect from 'react-select';
import {Input, Textarea, Text} from '@chakra-ui/react';
import styled from 'styled-components';

import {usePartialFormContext} from './contexts/partialForm';
import {FormInputProps} from './types';

const StyledInput = styled(Input)<{displayMargin?: boolean}>`
  height: 32px !important;
  background-color: white !important;
  border: 1px solid #b3bac5 !important;
  box-sizing: border-box;
  border-radius: 4px !important;
  ${(p) =>
    p.displayMargin &&
    `
  margin-top: 4px;
  margin-bottom: 11px;
  `}
`;

const InputTitle = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: #42526e;
`;

const FormInput = (props: FormInputProps) => {
  const {control, register} = usePartialFormContext();
  const {name, required, variant} = props;

  if (variant === 'Combobox')
    return (
      <Controller
        render={({field: {ref: __, ...inputProps}, fieldState}) => (
          <>
            <ReactSelect {...props} {...inputProps} />
            {fieldState.error && (
              <Text fontSize="xs" color="red">
                {fieldState.error.message}
              </Text>
            )}
          </>
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
        {props.title && <InputTitle>{props.title}</InputTitle>}
        <StyledInput
          placeholder={props.placeholder}
          displayMargin={!!props.title}
          {...register(name, {required})}
        />
      </>
    );

  if (variant === 'textarea')
    return <Textarea placeholder={props.placeholder} {...register(name, {required})} />;

  return null;
};

export default FormInput;
