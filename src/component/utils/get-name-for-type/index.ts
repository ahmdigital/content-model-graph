import { startCase } from 'lodash/fp';

type Type = {
  name: string;
  title?: string;
};

const getNameForType = (type: Type): string => type.title || startCase(type.name);

export default getNameForType;
