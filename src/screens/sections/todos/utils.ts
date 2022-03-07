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

export const ROW_HEIGHT = 52;
export const MAX_ROWS = 8;
export const ROW_GAP = 8;
