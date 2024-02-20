import { startCase } from 'lodash/fp';

import { Field } from '../../types';

const getNameForType = (type: Field): string => type.title || startCase(type.name);

export default getNameForType;
