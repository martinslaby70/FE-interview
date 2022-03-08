import {Priority} from 'redux/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ItemWithId = {id: string} & Record<string, any>;

export const reorder = <I extends ItemWithId>(
  list: I[],
  startIndex: number,
  endIndex: number
): I[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const GetPrioColor = (prio: Priority) => {
  switch (prio) {
    case Priority.none:
      return 'transparent';
    case Priority.high:
      return '#E32C1E';
    case Priority.mid:
      return '#FF9800';
    case Priority.low:
      return '#24A148';
    default:
      throw new Error('unknown priority type');
  }
};

export const ROW_HEIGHT = 52;
export const MAX_ROWS = 8;
export const ROW_GAP = 8;
