import {FC, useMemo} from 'react';
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
import ReactDOM from 'react-dom';

import {List} from 'react-virtualized';

import {updateSection} from 'redux/actions';
import {useAppDispatch} from 'redux/store';
import {FilterType, Todo} from 'redux/types';
import {SECTION_WIDTH} from 'screens/shared/constants';
import {CSSProperties} from 'styled-components';
import TodoRow from './Todo';
import {MAX_ROWS, reorder, ROW_GAP, ROW_HEIGHT} from './utils';

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
            isDragging={snapshot.isDragging}
            style={{margin: 0, ...style}}
            index={index}
          />
        )}
      </Draggable>
    );
  };

const Board: FC<BoardProps> = ({items, sectionId, filter}) => {
  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || result.source.index === result.destination.index) return;

    const reorderedItem = reorder(items, result.source.index, result.destination.index);

    dispatch(updateSection({id: sectionId, items: reorderedItem}));
  };

  const height = useMemo(
    () => (items.length >= MAX_ROWS ? MAX_ROWS : items.length),
    [items.length]
  );

  const disableDnD = useMemo(() => filter !== 'all', [filter]);

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
          <List
            height={(ROW_HEIGHT + ROW_GAP) * height}
            rowCount={items.length}
            rowHeight={ROW_HEIGHT + ROW_GAP}
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
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
