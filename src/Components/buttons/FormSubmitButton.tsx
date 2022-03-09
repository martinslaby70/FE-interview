import {Button, ButtonProps} from '@chakra-ui/react';
import {memo} from 'react';
import type {FieldValues, FormState} from 'react-hook-form';
import {Text} from './utils';

const getFormButtonDisabled = (isSubmitting: boolean, isValid: boolean) => !isValid || isSubmitting;

type FormSubmitButtonProps<FV extends FieldValues> = ButtonProps & {
  formState: FormState<FV>;
};

// Disabled when form is invalid or submitting.
// Loading cursor when form is submitting
const FormSubmitButton = <FV extends FieldValues>({
  formState,
  className,
  disabled = false,
  ...props
}: FormSubmitButtonProps<FV>) => {
  const {isSubmitting, isValid} = formState;
  const {title, ...buttonProps} = props;
  return (
    <Button
      type="submit"
      className={className}
      h="32px"
      disabled={disabled || getFormButtonDisabled(isSubmitting, isValid)}
      colorScheme="blue"
      {...buttonProps}
    >
      <Text color="white">{title}</Text>
    </Button>
  );
};

export default memo(FormSubmitButton);
