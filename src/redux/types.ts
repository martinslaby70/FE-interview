export enum Priority {
  low = 0,
  mid = 1,
  high = 2,
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
  items: Todo[];
};

export type User = {
  createdAt: string; // iso string
  fullName: string | null;
};

export type FilterType = 'all' | 'done' | 'todo';
