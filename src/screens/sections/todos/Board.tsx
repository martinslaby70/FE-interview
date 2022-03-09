import {FC, useCallback, useMemo} from 'react';
import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableRubric,
  DroppableProvided,
  Draggable,
} from 'react-beautiful-dnd';
import {motion} from 'framer-motion';
import ReactDOM from 'react-dom';
import {CSSProperties} from 'styled-components';
import {List, Index} from 'react-virtualized';

import {updateSection} from 'redux/actions';
import {useAppDispatch, useAppSelector} from 'redux/store';
import {FilterType, Todo} from 'redux/types';

import {MAX_ROWS, ROW_HEIGHT, SECTION_WIDTH, ROW_GAP} from 'screens/constants';
import TodoRow from './Todo';

import {reorder} from '../utils';

type BoardProps = {items: Todo[]; sectionId: string; filter: FilterType};

type RowProps = {
  index: number;
  style: CSSProperties;
};

const getRowRender =
  (ToDos: Todo[], isDragDisabled: boolean) =>
  ({index, style}: RowProps) => {
    const todo: Todo = ToDos[index];

    return (
      <Draggable draggableId={todo.id} index={index} key={todo.id} isDragDisabled={isDragDisabled}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <TodoRow
            provided={provided}
            todo={todo}
            style={{margin: 0, ...style}}
            index={index}
            isDragging={snapshot.isDragging}
          />
        )}
      </Draggable>
    );
  };

const Board: FC<BoardProps> = ({items, sectionId, filter}) => {
  const dispatch = useAppDispatch();
  const popover = useAppSelector((state) => state.popoverReducer);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || result.source.index === result.destination.index) return;

    const reorderedItem = reorder(items, result.source.index, result.destination.index);

    dispatch(updateSection({id: sectionId, items: reorderedItem}));
  };

  const listHeight = useMemo(
    () => (items.length >= MAX_ROWS ? MAX_ROWS : items.length),
    [items.length]
  );

  // TODO: come up with the solution on how the list should be reordered if one of the filters is selected
  const disableDnD = useMemo(() => filter !== 'all', [filter]);

  // HACK: this is not a good solution, currently iam saving popover status inside redux state, and recalculating height
  // on every opening witch is bad on performance. This hacky solution solves issue with displaying popovers inside virtualized lists
  // there should be a better way to do this, but dealing with that is way over time-budget.

  const getRowHeight = useCallback(
    ({index}: Index) => {
      let defaultHeight = ROW_HEIGHT + ROW_GAP;

      // type definement
      if (!popover) return defaultHeight;

      if (items[index].id === popover.todoId && items.length <= 2)
        defaultHeight += popover.popoverHeight;

      return defaultHeight;
    },
    [items, popover]
  );

  const totalHeight = useMemo(() => {
    let defaultHeight = (ROW_HEIGHT + ROW_GAP) * listHeight;

    if (items.length <= 2 && sectionId === popover?.sectionId)
      defaultHeight += popover.popoverHeight;

    return defaultHeight;
  }, [items.length, listHeight, popover, sectionId]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="droppable"
        mode="virtual"
        renderClone={(
          provided: DraggableProvided,
          snapshot: DraggableStateSnapshot,
          rubric: DraggableRubric
        ) => (
          <TodoRow
            provided={provided}
            isDragging={snapshot.isDragging}
            todo={items[rubric.source.index]}
            style={{margin: 0}}
            index={rubric.source.index}
          />
        )}
      >
        {(droppableProvided: DroppableProvided) => (
          <motion.div layout>
            <List
              height={totalHeight}
              rowCount={items.length}
              rowHeight={popover ? getRowHeight : ROW_HEIGHT + ROW_GAP}
              width={SECTION_WIDTH}
              autoWidth
              style={{marginTop: '10px'}}
              ref={(ref) => {
                if (ref) {
                  // react-virtualized has no way to get the list's ref.
                  // eslint-disable-next-line react/no-find-dom-node
                  const whatHasMyLifeComeTo = ReactDOM.findDOMNode(ref);
                  if (whatHasMyLifeComeTo instanceof HTMLElement) {
                    droppableProvided.innerRef(whatHasMyLifeComeTo);
                  }
                }
              }}
              rowRenderer={getRowRender(items, disableDnD)}
            />
          </motion.div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
