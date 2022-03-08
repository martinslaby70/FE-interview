import {Box, Checkbox, Text} from '@chakra-ui/react';
import {FC, memo} from 'react';
import {DraggableProvided} from 'react-beautiful-dnd';
import {useTranslation} from 'react-i18next';
import {toggleTodoStatus} from 'redux/actions';
import {useAppDispatch} from 'redux/store';
import {Priority, Todo} from 'redux/types';
import styled, {CSSProperties} from 'styled-components';
import {ROW_GAP, ROW_HEIGHT, GetPrioColor} from './utils';

type TodoProps = {
  provided: DraggableProvided;
  todo: Todo;
  isDragging: boolean;
  style: CSSProperties;
  index: number;
};

const TodoBoxWrapper = styled.div`
  height: ${ROW_HEIGHT + ROW_GAP}px;
`;

const TodoBox = styled.div<{priority: Priority; dragging: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  background-color: ${(p) => (p.dragging ? 'rgba(223, 225, 230, 0.6)' : 'inherit')};
  height: ${ROW_HEIGHT}px;
  border: 1px solid #dfe1e6;
  border-left: 1px solid
    ${(p) => (p.priority !== Priority.none ? GetPrioColor(p.priority) : '#dfe1e6')};
  margin: ${ROW_GAP / 2}px 8px ${ROW_GAP / 2}px 8px;
  overflow: hidden;
`;

const PriorityBorder = styled.div<{priority: Priority}>`
  height: 100%;
  width: 3px;
  background-color: ${(p) => GetPrioColor(p.priority)};
`;

export const SubMenuIcon = (
  <Text fontSize="16px" fontWeight={900}>
    &#8942;
  </Text>
);

const TodoRow: FC<TodoProps> = ({todo, isDragging, style, index, provided}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTodoStatus({id: todo.id, sectionId: todo.sectionId}));
  };

  return (
    <TodoBoxWrapper
      ref={provided.innerRef}
      {...provided.draggableProps}
      style={{...provided.draggableProps.style, ...style}}
      data-is-dragging={isDragging}
      data-testid={todo.id}
      data-index={index}
    >
      <TodoBox priority={todo.priority} dragging={isDragging}>
        <PriorityBorder priority={todo.priority} />
        <Checkbox mx="8px" defaultChecked={todo.isDone} onChange={handleToggle} iconColor="white" />
        <Text {...provided.dragHandleProps} isTruncated flexGrow="1" py="18px">
          {todo.title}
        </Text>
        <Box pl="26px" pr="18px" justifyContent="flex-end" display="flex">
          {SubMenuIcon}
        </Box>
      </TodoBox>
    </TodoBoxWrapper>
  );
};

export default memo(TodoRow);