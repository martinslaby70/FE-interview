import styled from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion';

import {useAppSelector} from 'redux/store';

import AddSectionForm from './shared/AddSectionForm';
import {NAVBAR_HEIGHT} from './shared/constants';
import Filter from './Filters';

const SectionListWrapper = styled.div`
width: 100%
  display: flex;
  padding: calc(16px + ${NAVBAR_HEIGHT}px) 16px 16px 16px;
  min-height: 100vh;
  background-color: #e5e5e5;
`;

const transitionProps = {
  initial: {opacity: 0},
  animate: {opacity: 1},
  exit: {opacity: 0},
};

const Sections = () => {
  const user = useAppSelector((item) => item.userReducer);

  return (
    <SectionListWrapper>
      <AnimatePresence key="loadingPresence">
        {!user ? (
          <motion.div {...transitionProps} key="emptyScreen" />
        ) : (
          <motion.div {...transitionProps} key="Sections">
            <Filter />
            <AddSectionForm />
          </motion.div>
        )}
      </AnimatePresence>
    </SectionListWrapper>
  );
};

export default Sections;
