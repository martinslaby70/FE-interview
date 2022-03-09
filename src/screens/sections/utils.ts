import {DateTime} from 'luxon';
import {useTranslation} from 'react-i18next';
import {Priority} from 'redux/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ItemWithId = {id: string | number} & Record<string, any>;

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

export const GetPriorityColor = (priority: Priority) => {
  switch (priority) {
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

// eslint sees `t("")` as an object
/* eslint-disable @typescript-eslint/restrict-template-expressions */
export const useSubHeaderText = (
  name: string | null | undefined,
  createdAt: string | undefined | null
) => {
  const date = createdAt ? DateTime.fromISO(createdAt) : null;
  const {t} = useTranslation();

  if (!(name && date?.isValid)) return '';

  return `${t('section.createdBy')}: ${name} · ${t('section.createAt')}: ${date.toFormat(
    'dd/MM/yyyy'
  )} · ${date.toFormat('HH:mm')}`;
};

/* eslint-enable @typescript-eslint/restrict-template-expressions */
