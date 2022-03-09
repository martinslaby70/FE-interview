import {DateTime} from 'luxon';
import {HStack} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {setUser} from 'redux/actions';
import {useAppDispatch, useAppSelector} from 'redux/store';

import InputList from 'Components/form/InputList';
import FormInput from 'Components/form/FormInput';
import FormSubmitButton from 'Components/buttons/FormSubmitButton';
import {NAVBAR_HEIGHT} from './constants';

const NavbarBox = styled.div`
  background-color: #fff;
  height: ${NAVBAR_HEIGHT}px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: space-between;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
`;

const Heading = styled.h1`
  margin: 0;
  padding: 0;
  background-color: transparent;

  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

type FormValues = {fullName: string};

const Navbar = () => {
  const user = useAppSelector((item) => item.userReducer);
  const {t} = useTranslation();

  const methods = useForm<FormValues>({
    mode: 'onChange',
  });

  const {formState, handleSubmit} = methods;

  const dispatch = useAppDispatch();

  const onSubmit = (data: FormValues) => {
    const currentDate = DateTime.now().toISO();
    dispatch(setUser({...data, createdAt: currentDate}));
  };

  return (
    <NavbarBox>
      <Heading>{t('navigation.header')}</Heading>
      {!user && (
        <InputList {...methods} className="d-flex">
          <HStack>
            <FormInput
              variant="text"
              name="fullName"
              placeholder={t('navigation.userName')}
              required
            />
            <FormSubmitButton
              formState={formState}
              title={t('buttons.save')}
              onClick={handleSubmit(onSubmit)}
            />
          </HStack>
        </InputList>
      )}
    </NavbarBox>
  );
};

export default Navbar;
