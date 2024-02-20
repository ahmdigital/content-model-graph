export type Field = {
  name: string;
  title?: string;
};

export type Type = {
  fields: Array<Field>;
  name: string;
  title?: string;
};
