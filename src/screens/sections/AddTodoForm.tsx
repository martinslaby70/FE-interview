import {HStack} from '@chakra-ui/react';
import FormSubmitButton from 'Components/buttons/FormSubmitButton';
import FormInput from 'Components/form/FormInput';
import InputList from 'Components/form/InputList';
import {DateTime} from 'luxon';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {addTodo} from 'redux/actions';
import {Priority} from 'redux/types';
import {useAppDispatch, useAppSelector} from 'redux/store';

type FormValues = {title: string};
type AddTodoFormProps = {sectionId: string};
const AddTodoForm: FC<AddTodoFormProps> = ({sectionId}) => {
  const {t} = useTranslation();
  const methods = useForm<FormValues>({
    mode: 'onChange',
  });

  const {handleSubmit, formState, reset} = methods;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer);

  const onSubmit = ({title}: FormValues) => {
    // type definement
    if (!user?.fullName) return;

    dispatch(
      addTodo({
        title,
        author: user.fullName,
        isDone: false,
        createdAt: DateTime.now().toISO(),
        sectionId,
        priority: Priority.none,
        description: '',
      })
    );
    reset({title: ''});
  };

  return (
    <InputList {...methods}>
      <HStack p="8px">
        <FormInput name="title" variant="text" placeholder={t('todo.addTodo')} required />
        <FormSubmitButton
          formState={formState}
          onClick={handleSubmit(onSubmit)}
          title={t('buttons.add')}
        />
      </HStack>
    </InputList>
  );
};

export default AddTodoForm;
