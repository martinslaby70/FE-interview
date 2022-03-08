export enum Priority {
  none = 0,
  low = 1,
  mid = 2,
  high = 3,
}

export type Todo = {
  id: string;
  sectionId: string;
  createdAt: string; // iso string
  title: string;
  description: string;
  priority: Priority;
  author: string;
  isDone: boolean;
};

export type Section = {
  id: string;
  title: string;
  createdAt: string; // iso string
  items: Todo[];
};

export type User = {
  createdAt: string; // iso string
  fullName: string | null;
};

export type FilterType = 'all' | 'done' | 'todo';
