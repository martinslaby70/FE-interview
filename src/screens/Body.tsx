import styled from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion';

import {useAppSelector} from 'redux/store';

import AddSectionForm from './shared/AddSectionForm';
import {NAVBAR_HEIGHT} from './shared/constants';
import Filter from './Filters';
import Section from './sections/Section';

const BodyWrapper = styled.div`
  width: 100%
  display: flex;
  padding: calc(16px + ${NAVBAR_HEIGHT}px) 16px 16px 16px;
  min-height: 100vh;
  background-color: #e5e5e5;
`;

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;

const transitionProps = {
  initial: {opacity: 0},
  animate: {opacity: 1},
  exit: {opacity: 0},
};

const Sections = () => {
  const user = useAppSelector((item) => item.userReducer);
  const sections = useAppSelector((item) => item.todoReducer);

  return (
    <BodyWrapper>
      <AnimatePresence key="loadingPresence">
        {!user ? (
          <motion.div {...transitionProps} key="emptyScreen" />
        ) : (
          <motion.div {...transitionProps} key="Sections">
            <Filter />
            <SectionWrapper>
              {sections.map((item) => (
                <Section {...item} />
              ))}
              <AddSectionForm />
            </SectionWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </BodyWrapper>
  );
};

export default Sections;
