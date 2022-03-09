import styled from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion';

import Masonry from 'react-masonry-css';

import {useAppSelector} from 'redux/store';

import AddSectionForm from './shared/AddSectionForm';
import {NAVBAR_HEIGHT, SECTION_BREAKPOINTS} from './constants';
import Filter from './Filters';
import Section from './sections';
import {ModalContextProvider} from './modals/ModalContextProvider';
import EditSectionModal from './modals/EditSectionModal';
import EditTodoModal from './modals/EditTodoModal';

const BodyWrapper = styled.div`
  width: 100%
  display: flex;
  padding: calc(16px + ${NAVBAR_HEIGHT}px) 16px 16px 16px;
  min-height: 100vh;
  background-color: #F4F5F7;
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
          <>
            <Filter />
            <ModalContextProvider>
              <motion.div layout key="Sections">
                <Masonry
                  breakpointCols={SECTION_BREAKPOINTS}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {sections.map((item, i) => (
                    <Section {...item} key={`section-${i.toFixed()}`} />
                  ))}

                  <AddSectionForm />
                </Masonry>
              </motion.div>
              <EditSectionModal />
              <EditTodoModal />
            </ModalContextProvider>
          </>
        )}
      </AnimatePresence>
    </BodyWrapper>
  );
};

export default Sections;
