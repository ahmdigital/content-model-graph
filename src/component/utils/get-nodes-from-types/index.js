import _ from 'lodash';

import getNameForType from '../get-name-for-type';

const typeToNode = (isShowingFields) => (type) =>
  `"${type.name}" [ label ="${[
    `<root> ${getNameForType(type)}`,
    ...(isShowingFields ? _.map(type.fields, (field) => `<${field.name}> ${getNameForType(field)}`) : []),
  ].join('|')}" shape="record" style=rounded]`;

/**
 * @param {any} types - The array of types for this document.
 * @param {boolean} isShowingFields - Whether to show the fields or just the document name.
 */
const getNodesFromTypes = (types, isShowingFields) => _.map(types, typeToNode(isShowingFields));

export default getNodesFromTypes;
