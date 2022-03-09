import {DeleteIcon, EditIcon} from '@chakra-ui/icons';
import {Box, Checkbox, Text} from '@chakra-ui/react';
import CustomizedMenu, {MenuItemType} from 'Components/Menu';
import {FC, memo} from 'react';
import {DraggableProvided} from 'react-beautiful-dnd';
import {useTranslation} from 'react-i18next';
import {removeToDo, toggleTodoStatus} from 'redux/actions';
import {useAppDispatch} from 'redux/store';
import {Priority, Todo} from 'redux/types';
import {useModalContext} from 'screens/modals/ModalContextProvider';
import styled, {CSSProperties} from 'styled-components';
import {ROW_GAP, ROW_HEIGHT, GetPrioColor} from '../utils';

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

  const {
    todoState: {setTodo, onToggle},
  } = useModalContext();

  const handleToggle = () => {
    setTodo(todo);
    onToggle();
  };

  const {id, sectionId} = todo;

  const handleCheckbox = () => {
    dispatch(toggleTodoStatus({id, sectionId}));
  };

  const sectionOptionItems: MenuItemType[] = [
    {
      icon: <DeleteIcon color="priority.high" w="3" h="3" mr="15px" />,
      title: t('todo.delete'),
      onClick: () => dispatch(removeToDo({id, sectionId})),
    },
    {
      icon: <EditIcon w="3" h="3" mr="15px" />,
      title: t('todo.edit'),
      onClick: handleToggle,
    },
  ];

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
        <Checkbox mx="8px" isChecked={todo.isDone} onChange={handleCheckbox} iconColor="white" />
        <Text {...provided.dragHandleProps} isTruncated flexGrow="1" py="18px">
          {todo.title}
        </Text>
        <Box pl="26px" pr="18px" justifyContent="flex-end" display="flex">
          <CustomizedMenu
            icon={SubMenuIcon}
            background="white"
            items={sectionOptionItems}
            todo={{todoId: todo.id, sectionId: todo.sectionId}}
          />
        </Box>
      </TodoBox>
    </TodoBoxWrapper>
  );
};

export default memo(TodoRow);
