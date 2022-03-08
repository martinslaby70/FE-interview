import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Box, Text, HStack} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';

import {addSection} from 'redux/actions';
import {useAppDispatch, useAppSelector} from 'redux/store';

import CancelButton from 'Components/buttons/CancelButton';
import FormSubmitButton from 'Components/buttons/FormSubmitButton';
import FormInput from 'Components/form/FormInput';
import InputList from 'Components/form/InputList';

import {SECTION_WIDTH} from './constants';

type FormValues = {title: string};

const AddSectionButton = styled.div`
  width: 100%;
  height: 32px;
  border-radius: 4px;
  background-color: #ebecf0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const transitionProps = {
  initial: {y: 10, opacity: 0},
  animate: {y: 0, opacity: 1},
  exit: {y: -10, opacity: 0},
  transition: {type: 'just'},
};

const AddSectionForm = () => {
  const {t} = useTranslation();
  const methods = useForm<FormValues>({
    mode: 'onChange',
  });
  const {formState, handleSubmit, reset} = methods;
  const sections = useAppSelector((state) => state.todoReducer);
  const dispatch = useAppDispatch();
  const [showButton, setShowButton] = useState(sections?.length >= 1);

  const onSubmit = ({title}: FormValues) => {
    dispatch(addSection({title, items: []}));
    setShowButton(true);
  };
  useEffect(() => {
    if (!showButton) reset({title: ''});
  }, [reset, showButton]);

  return (
    <Box w={SECTION_WIDTH} mt="16px">
      <motion.div layout>
        <AnimatePresence key="addSectionForm" exitBeforeEnter initial={false}>
          {showButton ? (
            <motion.div {...transitionProps} key="button">
              <AddSectionButton onClick={() => setShowButton(false)}>
                <AddIcon w="3" h="3" mr="8px" />
                <Text fontSize="14px" fontWeight={400}>
                  {t('buttons.addSection')}
                </Text>
              </AddSectionButton>
            </motion.div>
          ) : (
            <motion.div {...transitionProps} key="form">
              <InputList {...methods}>
                <FormInput name="title" variant="text" title={t('section.title')} />
                <HStack direction="row-reverse" w="100%" justify="flex-end">
                  <CancelButton onClick={() => setShowButton(true)}>
                    {t('buttons.cancel')}
                  </CancelButton>
                  <FormSubmitButton
                    title={t('buttons.save')}
                    formState={formState}
                    onClick={handleSubmit(onSubmit)}
                  />
                </HStack>
              </InputList>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Box>
  );
};

export default AddSectionForm;
