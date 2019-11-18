import _ from 'lodash';

import getNameForType from '../get-name-for-type';

const toParameter = (key, value) => (value ? `${key}="${value}"` : '');

const builtInFieldTypes = [
  'array',
  'block',
  'boolean',
  'datetime',
  'file',
  'geopoint',
  'image',
  'number',
  'reference',
  'slug',
  'string',
  'text',
  'url',
];

const buildEdge = ({ arrowHead, from, label, to }) => {
  if (_.includes(builtInFieldTypes, to)) {
    return null;
  }
  return `"${from}" -> "${`${to}:root`}" [${[toParameter('label', label), toParameter('arrowhead', arrowHead)].join(' ')}]`;
};

const getUnusualInlinedFieldType = ({ field, from }) =>
  buildEdge({ arrowHead: 'dot', from, label: undefined, to: field.type });

const getReferences = ({ arrowHead, from, label, values }) =>
  _.map(_.isPlainObject(values) ? [values] : values, ({ type: to }) => buildEdge({ arrowHead, from, label, to }));

const buildFieldToEdges = fromType => field => {
  const label = getNameForType(field);
  const from = `${fromType}:${field.name}`;
  return [
    getUnusualInlinedFieldType({ field, from }),
    getReferences({ arrowHead: 'tee', from, label, values: field.to }),
    getReferences({ arrowHead: 'crow', from, label, values: field.of }),
  ];
};

const typeToEdges = type => _.map(type.fields, buildFieldToEdges(type.name));

const getEdgesFromTypes = types =>
  _(types)
    .map(typeToEdges)
    .flattenDeep()
    .compact()
    .uniq()
    .value();

export default getEdgesFromTypes;
