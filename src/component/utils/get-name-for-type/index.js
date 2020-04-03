import _ from 'lodash';

/**
 * @param {{ name: string; title?: string; }} type - A field Type.
 */
const getNameForType = (type) => type.title || _.startCase(type.name);

export default getNameForType;
