import { Module, render } from 'viz.js/full.render';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Viz from 'viz.js';

import getEdgesFromTypes from './utils/get-edges-from-types';
import getNodesFromTypes from './utils/get-nodes-from-types';
import styles from './styles.css';

const newLine = '\n';

const header = [
  'strict digraph MyGraph {',
  'node [fontsize=16 fontname="Proxima Nova"];',
  'outputorder="edgesfirst"',
  'overlap = false;',
  'rankdir="LR"',
];

const footer = ['}'];

const removeExplicitDimensions = svgHtml =>
  _.replace(svgHtml, /width="(.*?)" height="(.*?)"/, 'width="100%" height="100%"');

const ContentModelGraph = ({ Switch, types }) => {
  const viz = new Viz({ Module, render });
  console.log('viz', viz);
  const [svgHtml, setSvgHtml] = useState('');
  const [isShowingFields, setIsShowingFields] = useState(false);

  const edges = getEdgesFromTypes(types);
  const nodes = getNodesFromTypes(types, isShowingFields);

  const allItems = [header, edges, nodes, footer];

  const graphVizString = _.invokeMap(allItems, 'join', newLine).join(newLine);

  viz
    .renderString(graphVizString)
    .then(setSvgHtml)
    .catch(setSvgHtml);

  return (
    <div className={styles.container}>
      <h1>Content Model Graph</h1>
      <Switch checked={isShowingFields} label="Show fields" onChange={() => setIsShowingFields(!isShowingFields)} />
      <div
        className={styles.wrapper}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: removeExplicitDimensions(svgHtml),
        }}
      />
    </div>
  );
};

ContentModelGraph.propTypes = {
  Switch: PropTypes.elementType.isRequired,
  types: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default ContentModelGraph;
