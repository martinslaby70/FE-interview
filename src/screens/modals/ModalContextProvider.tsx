import {createContext, useContext, FC, useState, ContextType} from 'react';
import {useDisclosure, UseDisclosureReturn} from '@chakra-ui/react';
import {Section, Todo} from 'redux/types';

type ModalContextType = {
  todoState: UseDisclosureReturn & {
    todo: Todo | null;
    setTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  };
  sectionState: UseDisclosureReturn & {
    section: Section | null;
    setSection: React.Dispatch<React.SetStateAction<Section | null>>;
  };
};

const ModalContext = createContext<ModalContextType | null>(null);

// this would be way easier: https://recoiljs.org/docs/api-reference/utils/atomFamily

export const ModalContextProvider: FC = ({children}) => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [section, setSection] = useState<Section | null>(null);

  const todoState = useDisclosure();
  const sectionState = useDisclosure();

  return (
    <ModalContext.Provider
      value={{
        todoState: {...todoState, todo, setTodo},
        sectionState: {...sectionState, section, setSection},
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used under ModalContextProvider');
  }
  return context;
};
