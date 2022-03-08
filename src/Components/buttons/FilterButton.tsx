import {Button, VStack} from '@chakra-ui/react';
import {FC, useMemo, memo} from 'react';
import {useTranslation} from 'react-i18next';
import {FilterType} from 'redux/types';
import {motion} from 'framer-motion';
import styled from 'styled-components';

type FilterButtonProps = {
  state: [FilterType, React.Dispatch<React.SetStateAction<FilterType>>];
  name: FilterType;
};

const SharedLayout = styled(motion.div)`
  width: 70%;
  height: 2px;
  background-color: #0065ff;
  margin-top: 0px;
  position: absolute;
  bottom: 0;
  left: 15%;
`;

const sharedButtonProps = {
  variant: 'ghost',
  _focus: {boxShadow: 'none'},
  _hover: {backgroundColor: 'transparent'},
  _active: {backgroundColor: 'transparent'},
};

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};

const FilterButton: FC<FilterButtonProps> = ({state, name}) => {
  const {t} = useTranslation();
  const [filter, setFilter] = state;

  const isSelected = useMemo(() => filter === name, [filter, name]);

  return (
    <VStack position="relative">
      <Button
        {...sharedButtonProps}
        colorScheme={isSelected ? 'blue' : undefined}
        onClick={() => setFilter(name)}
      >
        {t(`section.filter.${name}`)}
      </Button>
      {isSelected && (
        <SharedLayout
          initial={false}
          transition={spring}
          layoutId="underline"
          key="filterUnderline"
        />
      )}
    </VStack>
  );
};

export default memo(FilterButton);
