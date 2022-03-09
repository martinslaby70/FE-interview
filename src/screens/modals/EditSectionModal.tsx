import {useTranslation} from 'react-i18next';
import {useEffect} from 'react';
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
} from '@chakra-ui/react';

import InputList from 'Components/form/InputList';
import FormInput from 'Components/form/FormInput';
import FormSubmitButton from 'Components/buttons/FormSubmitButton';
import {Text as ButtonText} from 'Components/buttons/utils';

import {useSubHeaderText} from 'screens/sections/utils';
import {useAppDispatch, useAppSelector} from 'redux/store';
import {updateSection} from 'redux/actions';
import {useModalContext} from './ModalContextProvider';

type FormValues = {title: string};

const EditSectionModal = () => {
  const {
    sectionState: {isOpen, onToggle, section, setSection},
  } = useModalContext();

  const toggle = () => {
    setSection(null);
    onToggle();
  };

  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const user = useAppSelector((item) => item.userReducer);

  const methods = useForm<FormValues>({
    mode: 'onChange',
  });

  const {handleSubmit, formState, reset} = methods;

  useEffect(() => {
    if (isOpen && section) reset({title: section.title});
  }, [isOpen, reset, section]);

  const onSubmit = (data: FormValues) => {
    if (!section) return;

    dispatch(updateSection({id: section.id, title: data.title}));
    toggle();
  };

  const subheaderText = useSubHeaderText(user?.fullName, section?.createdAt);

  return (
    <Modal onClose={toggle} size="xl" isOpen={isOpen} autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="1px solid #DFE1E6">
          <Text fontWeight={500} fontSize="16px">
            {t('section.editSection')}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="14px" color="#7A869A" letterSpacing="0.16px" mt="5px" mb="16px">
            {subheaderText}
          </Text>
          <InputList {...methods}>
            <FormInput name="title" variant="text" title={t('section.title')} required />
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

export default EditSectionModal;
