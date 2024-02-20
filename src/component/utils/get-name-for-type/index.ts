import { startCase } from 'lodash/fp';

import { Field, Type } from '../../types';

type FieldOrType = Field | Type;

const getNameForType = (type: FieldOrType): string => {
  if ('title' in type) {
    return type.title ?? '';
  }

  return startCase(type.name);
};

export default getNameForType;
