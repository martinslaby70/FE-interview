import {CalendarIcon, CheckIcon, HamburgerIcon, SettingsIcon} from '@chakra-ui/icons';
import {Box, HStack, Text} from '@chakra-ui/react';
import CustomizedMenu, {MenuItemType} from 'Components/Menu';
import {DateTime} from 'luxon';
import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {clearTodos} from 'redux/actions';
import {changeFilter} from 'redux/actions/filter';
import {useAppDispatch} from 'redux/store';
import {FilterType} from 'redux/types';
import styled from 'styled-components';

const Divider = styled.div`
  background-color: #dfe1e6;
  width: 100%;
  height: 1px;
  margin-top: 5px;
`;

const Filter = () => {
  const {t} = useTranslation();

  const currentDate = useMemo(() => DateTime.now().toFormat('ccc dd LLL'), []);
  const dispatch = useAppDispatch();

  const handleFilterUpdate = useCallback(
    (filter: FilterType) => {
      dispatch(changeFilter(filter));
    },
    [dispatch]
  );

  const handleClearTasks = useCallback(
    (onlyDone: boolean) => {
      dispatch(clearTodos({onlyDone}));
    },
    [dispatch]
  );

  const filterMenuItems: MenuItemType[] = useMemo(
    () => [
      {
        title: t('buttons.filters.all'),
        icon: <HamburgerIcon w="3" h="3" mr="15px" />,
        onClick: () => handleFilterUpdate('all'),
      },
      {
        title: t('buttons.filters.done'),
        icon: <CheckIcon w="3" h="3" mr="15px" />,
        onClick: () => handleFilterUpdate('done'),
      },
      {
        title: t('buttons.filters.todo'),
        icon: <CalendarIcon w="3" h="3" mr="15px" />,
        onClick: () => handleFilterUpdate('todo'),
      },
    ],
    [handleFilterUpdate, t]
  );
  const SettingsMenuItems: MenuItemType[] = useMemo(
    () => [
      {
        title: t('buttons.settings.clearAll'),
        icon: <HamburgerIcon w="3" h="3" mr="15px" />,
        onClick: () => handleClearTasks(false),
      },
      {
        title: t('buttons.settings.clearDone'),
        icon: <CheckIcon w="3" h="3" mr="15px" />,
        onClick: () => handleClearTasks(true),
      },
    ],
    [handleClearTasks, t]
  );

  return (
    <Box>
      <HStack justify="space-between">
        <HStack align="flex-end">
          <Text fontWeight={700} fontSize={16}>
            {t('navigation.today')}
          </Text>
          <Text fontWeight={400} fontSize={12} ml="5px">
            {currentDate}
          </Text>
        </HStack>
        <HStack>
          <CustomizedMenu icon={<HamburgerIcon />} items={filterMenuItems} />
          <CustomizedMenu icon={<SettingsIcon />} items={SettingsMenuItems} />
        </HStack>
      </HStack>
      <Divider />
    </Box>
  );
};
export default Filter;
