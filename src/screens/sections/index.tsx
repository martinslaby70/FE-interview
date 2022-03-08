import {Text, HStack} from '@chakra-ui/react';
import {CheckIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons';
import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {AnimateSharedLayout, motion} from 'framer-motion';

import {useAppSelector, useAppDispatch} from 'redux/store';
import {FilterType, Section as SectionType, Todo} from 'redux/types';

import FilterButton from 'Components/buttons/FilterButton';
import CustomizedMenu, {MenuItemType} from 'Components/Menu';

import {SECTION_WIDTH} from 'screens/shared/constants';
import {markAllTodosAsDone, removeSection} from 'redux/actions';
import {useTranslation} from 'react-i18next';
import {invalidateFilter} from 'redux/actions/filter';
import AddTodoForm from './AddTodoForm';
import Board from './todos/Board';
import {SubMenuIcon} from './todos/Todo';

const SectionBox = styled(motion.div)`
  width: ${SECTION_WIDTH}px;
  background-color: white;
  border: 1px solid #dfe1e6;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 6px;
  margin-top: 16px;
`;

const Section: FC<SectionType> = (section) => {
  const {t} = useTranslation();
  const globalFilter = useAppSelector((state) => state.filterReducer);
  const [filter, setFilter] = useState<FilterType>('all');

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (globalFilter.valid) {
      setFilter(globalFilter.filter);
      dispatch(invalidateFilter());
    }
  }, [dispatch, globalFilter]);

  const sectionOptionItems: MenuItemType[] = [
    {
      icon: <CheckIcon w="3" h="3" mr="15px" />,
      title: t('section.actions.allAsDone'),
      onClick: () => dispatch(markAllTodosAsDone(section.id)),
    },
    {
      icon: <EditIcon w="3" h="3" mr="15px" />,
      title: t('section.actions.edit'),
      onClick: () => {},
    },
    {
      icon: <DeleteIcon color="priority.high" w="3" h="3" mr="15px" />,
      title: t('section.actions.delete'),
      onClick: () => dispatch(removeSection(section.id)),
      textColor: 'priority.high',
    },
  ];

  const handleFilter = useCallback(
    (todo: Todo) => {
      switch (filter) {
        case 'all':
          return true;
        case 'done':
          return todo.isDone;
        case 'todo':
          return !todo.isDone;

        default:
          throw new Error('unknown filter type');
      }
    },
    [filter]
  );

  const FilteredItems = useMemo(
    () => section.items.filter(handleFilter),
    [handleFilter, section.items]
  );

  return (
    <SectionBox
      transition={{type: 'spring', bounce: 0}}
      initial={false}
      layout
      layoutId="animatedHeight"
      key="AnimatedHeight"
    >
      <motion.div layout>
        <HStack justifyContent="space-between" p="16px">
          <Text fontWeight={500} fontSize="16px">
            {section.title}
          </Text>
          <CustomizedMenu icon={SubMenuIcon} background="white" items={sectionOptionItems} />
        </HStack>

        <HStack justifyContent="flex-start">
          {section.items.length >= 1 && (
            <AnimateSharedLayout>
              <FilterButton name="all" state={[filter, setFilter]} id={section.id} />
              <FilterButton name="todo" state={[filter, setFilter]} id={section.id} />
              <FilterButton name="done" state={[filter, setFilter]} id={section.id} />
            </AnimateSharedLayout>
          )}
        </HStack>
      </motion.div>

      <Board items={FilteredItems} sectionId={section.id} filter={filter} />

      <AddTodoForm sectionId={section.id} />
    </SectionBox>
  );
};

export default Section;
