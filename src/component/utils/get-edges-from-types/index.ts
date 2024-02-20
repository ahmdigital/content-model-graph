import _ from 'lodash';

import { Type } from '../../types';
import getNameForType from '../get-name-for-type';

const toParameter = (key: any, value: any) => (value ? `${key}="${value}"` : '');

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

const ensureArray = (values: any) => (_.isArray(values) ? values : [values]);

const buildEdge = ({
  arrowHead,
  from,
  label,
  to,
}: {
  arrowHead: string;
  from: string;
  label: string | undefined;
  to: string;
}) => {
  if (_.includes(builtInFieldTypes, to)) {
    return null;
  }
  return `${from} -> ${`"${to}":root`} [penwidth="2" color="gray30" arrowsize="2" ${[
    toParameter('label', label),
    toParameter('arrowhead', arrowHead),
  ].join(' ')}]`;
};

const getUnusualInlinedFieldType = ({ field, from }: { field: any; from: string }) =>
  buildEdge({ arrowHead: 'dot', from, label: undefined, to: field.type });

const getReferences = ({
  arrowHead,
  from,
  label,
  values,
}: {
  arrowHead: string;
  from: string;
  label: string | undefined;
  values: any;
}): any =>
  _.map(_.compact(ensureArray(values)), ({ type, to }) => {
    if (type === 'reference') {
      return _.map(_.compact(ensureArray(to)), (toItem) =>
        getReferences({ arrowHead, from, label, values: { type: toItem.type } }),
      );
    }
    return buildEdge({ arrowHead, from, label, to: type });
  });

const buildFieldToEdges =
  ({ fromType, isShowingEdgeLabels }: { fromType: any; isShowingEdgeLabels: boolean }) =>
  (field: any) => {
    const label = isShowingEdgeLabels ? getNameForType(field) : undefined;
    const from = `"${fromType}":${field.name}`;
    return [
      getUnusualInlinedFieldType({ field, from }),
      getReferences({ arrowHead: 'tee', from, label, values: field.to }),
      getReferences({ arrowHead: 'crow', from, label, values: field.of }),
    ];
  };

const typeToEdges = ({ isShowingEdgeLabels, type }: { isShowingEdgeLabels: boolean; type: any }) =>
  _.map(type.fields, buildFieldToEdges({ fromType: type.name, isShowingEdgeLabels }));

const getEdgesFromTypes = (types: any, isShowingEdgeLabels: boolean = false): any[] =>
  _(types)
    .map((type) => typeToEdges({ isShowingEdgeLabels, type }))
    .flattenDeep()
    .compact()
    .uniq()
    .value();

export default getEdgesFromTypes;
