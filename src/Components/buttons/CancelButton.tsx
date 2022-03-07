import {Button, ButtonProps} from '@chakra-ui/react';
import {FC, memo} from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import {Text} from './utils';

const StyledCancelButton = styled(Button)`
  background: #ebecf0;
  border-radius: 4px;
`;

const CancelButton: FC<ButtonProps> = (buttonProps) => {
  const {t} = useTranslation();
  return (
    <StyledCancelButton {...buttonProps} h="32px">
      <Text color="black">{t('buttons.cancel')}</Text>
    </StyledCancelButton>
  );
};

export default memo(CancelButton);
