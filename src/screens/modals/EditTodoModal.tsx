import {useTranslation} from 'react-i18next';
import {FC, useEffect, useMemo} from 'react';
import {StylesConfig} from 'react-select';

import {useForm} from 'react-hook-form';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
} from '@chakra-ui/react';

import InputList from 'Components/form/InputList';
import FormInput from 'Components/form/FormInput';
import FormSubmitButton from 'Components/buttons/FormSubmitButton';
import {Text as ButtonText} from 'Components/buttons/utils';

import {useAppDispatch, useAppSelector} from 'redux/store';
import {Priority, updateTodo} from 'redux/actions';
import {useSubHeaderText} from '../sections/utils';
import {useModalContext} from './ModalContextProvider';

type FormValues = {
  title: string;
  description: string;
  priority: Priority;
};

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const EditTodoModal: FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const {
    todoState: {todo, isOpen, onToggle, setTodo},
  } = useModalContext();

  const toggle = () => {
    setTodo(null);
    onToggle();
  };

  const user = useAppSelector((item) => item.userReducer);

  const subheader = useSubHeaderText(user?.fullName, todo?.createdAt);

  const methods = useForm<FormValues>({
    mode: 'onChange',
  });

  const {handleSubmit, formState, reset} = methods;

  const onSubmit = (data: FormValues) => {
    if (!todo) return;
    const {id, sectionId} = todo;
    const {priority, ...submitData} = data;

    dispatch(updateTodo({id, sectionId, priority: priority ?? Priority.none, ...submitData}));
    toggle();
  };

  useEffect(() => {
    if (todo && isOpen)
      reset({title: todo.title, description: todo.description, priority: todo.priority});
  }, [isOpen, reset, todo]);

  const options = useMemo(
    () => [
      {id: Priority.low, color: '#24A148', title: t('todo.priority.low')},
      {id: Priority.mid, color: '#FF9800', title: t('todo.priority.mid')},
      {id: Priority.high, color: '#E32C1E', title: t('todo.priority.high')},
    ],
    [t]
  );

  const comboBoxStyles: StylesConfig<typeof options[0]> = useMemo(
    () => ({
      option: (styles, {data}) => ({
        ...styles,
        backgroundColor: 'white',
        color: 'Black',
        ...dot(data.color),
      }),
      input: (styles) => ({...styles, ...dot()}),
      placeholder: (styles) => ({...styles, ...dot('#ccc')}),
      singleValue: (styles, {data}) => ({...styles, ...dot(data.color)}),
    }),
    []
  );

  return (
    <Modal onClose={toggle} size="xl" isOpen={isOpen} autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="1px solid #DFE1E6">
          <Text fontWeight={500} fontSize="16px">
            {t('todo.edit')}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="14px" color="#7A869A" letterSpacing="0.16px" mt="5px" mb="16px">
            {subheader}
          </Text>
          <InputList {...methods}>
            <FormInput name="title" variant="text" title={t('todo.name')} required />
            <FormInput
              name="description"
              variant="textarea"
              placeholder={t('todo.descriptionPlaceholder')}
              required
            />
            <Box w="50%">
              <FormInput
                name="priority"
                variant="ComboBox"
                options={options}
                placeholder={t('todo.priority.none')}
                textField="title"
                isClearable
                styles={comboBoxStyles}
                title={t('todo.priority.header')}
              />
            </Box>
          </InputList>
        </ModalBody>
        <ModalFooter>
          <Button h="32px" mr="8px" onClick={toggle}>
            <ButtonText color="black">{t('buttons.cancel')}</ButtonText>
          </Button>
          <FormSubmitButton
            formState={formState}
            onClick={handleSubmit(onSubmit)}
            title={t('buttons.save')}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTodoModal;
