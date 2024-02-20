import _ from 'lodash';

import { Type } from '../../types';
import getNameForType from '../get-name-for-type';

const typeToNode = (isShowingFields: boolean) => (type: Type) =>
  `"${type.name}" [ label=<<font face="Helvetica Neue"><table border="1" cellpadding="8" cellspacing="0"><tr><td ${
    isShowingFields ? 'bgcolor="mediumorchid"' : 'bgcolor="ghostwhite"'
  } border="0" port="root"><font ${isShowingFields ? 'color="white"' : ''} point-size="18">${getNameForType(
    type,
  )}</font></td></tr>${_.map(
    isShowingFields ? type.fields : [],
    (field) =>
      `<tr><td align="left" border="0" bgcolor="white" port="${field.name}">${getNameForType(field)}</td></tr>`,
  ).join('')}</table></font>> shape="none"]`;

const getNodesFromTypes = (types: Array<Type>, isShowingFields: boolean): string[] =>
  _.map(types, typeToNode(isShowingFields));

export default getNodesFromTypes;
