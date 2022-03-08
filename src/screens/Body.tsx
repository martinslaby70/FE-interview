import styled from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion';

import Masonry from 'react-masonry-css';

import {useAppSelector} from 'redux/store';

import AddSectionForm from './shared/AddSectionForm';
import {NAVBAR_HEIGHT} from './shared/constants';
import Filter from './Filters';
import Section from './sections';

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

  const breakpointColumnsObj = {
    default: 5,
    1800: 4,
    1440: 3,
    1100: 2,
    730: 1,
  };

  return (
    <BodyWrapper>
      <AnimatePresence key="loadingPresence">
        {!user ? (
          <motion.div {...transitionProps} key="emptyScreen" />
        ) : (
          <motion.div {...transitionProps} key="Sections">
            <Filter />
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {sections.map((item) => (
                <Section {...item} />
              ))}
              <AddSectionForm />
            </Masonry>
          </motion.div>
        )}
      </AnimatePresence>
    </BodyWrapper>
  );
};

export default Sections;
