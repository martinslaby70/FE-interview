import {Box, Text} from '@chakra-ui/react';
import {FC, useMemo} from 'react';
import {DraggableProvided} from 'react-beautiful-dnd';
import {useTranslation} from 'react-i18next';
import {Todo} from 'redux/types';
import styled, {CSSProperties} from 'styled-components';
import {ROW_GAP, ROW_HEIGHT} from './utils';

type TodoProps = {
  provided: DraggableProvided;
  todo: Todo;
  isDragging: boolean;
  style: CSSProperties;
  index: number;
};

// react-virtualized doesn't respect margins
const TodoBoxWrapper = styled.div`
  height: ${ROW_HEIGHT + ROW_GAP}px;
`;

const TodoBox = styled.div`
  border-radius: 4px;
  height: ${ROW_HEIGHT}px;
  border: 1px solid #dfe1e6;
  margin: ${ROW_GAP / 2}px 8px ${ROW_GAP / 2}px 8px;
`;

const TodoRow: FC<TodoProps> = ({todo, isDragging, style, index, provided}) => {
  const {t} = useTranslation();

  return (
    <TodoBoxWrapper
      ref={provided.innerRef}
      {...provided.draggableProps}
      style={{...provided.draggableProps.style, ...style}}
      data-is-dragging={isDragging}
      data-testid={todo.id}
      data-index={index}
    >
      <TodoBox>
        <div {...provided.dragHandleProps}>foo</div>
      </TodoBox>
    </TodoBoxWrapper>
  );
};

export default TodoRow;
