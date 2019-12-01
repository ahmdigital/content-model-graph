import { Module, render } from 'viz.js/full.render';
import _ from 'lodash';
import FileSaver from 'file-saver';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Viz from 'viz.js';

import getEdgesFromTypes from './utils/get-edges-from-types';
import getNodesFromTypes from './utils/get-nodes-from-types';
import styles from './styles.css';

const newLine = '\n';

const header = [
  'strict digraph ContentModel {',
  'node [fontname="inherit"];',
  'edge [fontname="inherit"];',
  'rankdir="LR"',
];

const footer = ['}'];

const removeExplicitDimensions = svgHtml =>
  _.replace(svgHtml, /width="(.*?)" height="(.*?)"/, 'width="100%" height="100%"');

const handleSave = ({ content, fileType, mimeType }) => {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  FileSaver.saveAs(blob, `content-model.${fileType}`);
};

const ContentModelGraph = ({ Button, Switch, types }) => {
  const viz = new Viz({ Module, render });
  const [svgString, setSvgString] = useState('');
  const [isShowingFields, setIsShowingFields] = useState(false);

  const edges = getEdgesFromTypes(types);
  const nodes = getNodesFromTypes(types, isShowingFields);

  const allItems = [header, edges, nodes, footer];

  const graphVizString = _.invokeMap(allItems, 'join', newLine).join(newLine);

  viz
    .renderString(graphVizString)
    .then(setSvgString)
    .catch(setSvgString);

  const fileDefinitions = [
    { content: svgString, fileType: 'svg', mimeType: 'image/svg+xml' },
    { content: graphVizString, fileType: 'gv', mimeType: 'application/octet-stream' },
  ];
  return (
    <div className={styles.container}>
      <h1>Content Model Graph</h1>
      <Switch checked={isShowingFields} label="Show fields" onChange={() => setIsShowingFields(!isShowingFields)} />
      {_.map(fileDefinitions, item => (
        <Button type="button" onClick={() => handleSave(item)}>
          Save .{item.fileType}
        </Button>
      ))}
      <div
        className={styles.wrapper}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: removeExplicitDimensions(svgString),
        }}
      />
    </div>
  );
};

ContentModelGraph.propTypes = {
  Button: PropTypes.elementType.isRequired,
  Switch: PropTypes.elementType.isRequired,
  types: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default ContentModelGraph;
