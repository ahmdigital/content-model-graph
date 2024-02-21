export type Field = {
  name: string;
  to: Array<object>;
  type: string;
};

export type Type = {
  fields: Array<Field>;
  name: string;
  title?: string;
};
