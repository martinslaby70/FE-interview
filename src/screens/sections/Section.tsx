import {Text, HStack} from '@chakra-ui/react';
import {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import {AnimateSharedLayout} from 'framer-motion';

import {useAppSelector} from 'redux/store';
import {FilterType, Section as SectionType} from 'redux/types';

import FilterButton from 'Components/buttons/FilterButton';

import {SECTION_WIDTH} from 'screens/shared/constants';

const SectionBox = styled.div`
  width: ${SECTION_WIDTH}px;
  background-color: white;
  border: 1px solid #dfe1e6;
  box-sizing: border-box;
  border-radius: 4px;
`;

const Section: FC<SectionType> = (section) => {
  const globalFilter = useAppSelector((state) => state.filterReducer);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    if (globalFilter.valid) setFilter(globalFilter.filter);
  }, [globalFilter]);

  return (
    <SectionBox>
      <HStack justifyContent="space-between" p="16px">
        <Text fontWeight={500} fontSize="16px">
          {section.title}
        </Text>
      </HStack>

      <HStack justifyContent="flex-start">
        <AnimateSharedLayout>
          <FilterButton name="all" state={[filter, setFilter]} />
          <FilterButton name="todo" state={[filter, setFilter]} />
          <FilterButton name="done" state={[filter, setFilter]} />
        </AnimateSharedLayout>
      </HStack>
    </SectionBox>
  );
};

export default Section;
