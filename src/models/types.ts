export type Todo = {
  id: number,
  label: string,
  text: string,
  completed: boolean,
  dueDate: number | null,
  tag: number | null,
};

export type Tag = {
  id: number,
  name: string,
};

export type DeleteCheck = {
  id: number,
  delete: boolean,
}

export const enum ShowMode { All, OnlyDone, OnlyPending };
