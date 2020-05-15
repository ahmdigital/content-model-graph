import { Module, render } from 'viz.js/full.render';
import _ from 'lodash';
import FileSaver from 'file-saver';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import Viz from 'viz.js';

import getEdgesFromTypes from './utils/get-edges-from-types';
import getNodesFromTypes from './utils/get-nodes-from-types';

const newLine = '\n';

const header = [
  'strict digraph ContentModel {',
  'node [fontname="inherit"];',
  'edge [fontname="inherit"];',
  'rankdir="LR"',
  'concentrate="true"',
];

const Container = styled.div`
  background-color: white;
  padding: 1rem;

  svg {
    display: block;
    max-width: 1500px;
  }
`;

const Wrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const footer = ['}'];

const removeExplicitDimensions = (svgHtml) =>
  _.replace(svgHtml, /width="(.*?)" height="(.*?)"/, 'width="100%" height="100%"');

const handleSave = ({ content, fileType, mimeType }) => {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  FileSaver.saveAs(blob, `content-model.${fileType}`);
};

const ContentModelGraph = ({ Button, Switch, types }) => {
  const viz = new Viz({ Module, render });
  const [svgString, setSvgString] = useState('');
  const [isShowingFields, setIsShowingFields] = useState(false);
  const [isShowingEdgeLabels, setIsShowingEdgeLabels] = useState(false);

  const edges = getEdgesFromTypes(types, isShowingEdgeLabels);
  const nodes = getNodesFromTypes(types, isShowingFields);

  const allItems = [header, edges, nodes, footer];

  const graphVizString = _.invokeMap(allItems, 'join', newLine).join(newLine);

  viz.renderString(graphVizString).then(setSvgString).catch(setSvgString);

  const fileDefinitions = [
    { content: svgString, fileType: 'svg', mimeType: 'image/svg+xml' },
    { content: graphVizString, fileType: 'gv', mimeType: 'application/octet-stream' },
  ];
  return (
    <Container>
      <h1>Content Model Graph</h1>
      <Switch checked={isShowingFields} label="Show fields" onChange={() => setIsShowingFields(!isShowingFields)} />
      <Switch
        checked={isShowingEdgeLabels}
        label="Show edge labels"
        onChange={() => setIsShowingEdgeLabels(!isShowingEdgeLabels)}
      />
      {_.map(fileDefinitions, (item) => (
        <Button key={item.fileType} type="button" onClick={() => handleSave(item)}>
          Save .{item.fileType}
        </Button>
      ))}
      <Wrapper
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: removeExplicitDimensions(svgString),
        }}
      />
    </Container>
  );
};

ContentModelGraph.propTypes = {
  Button: PropTypes.elementType.isRequired,
  Switch: PropTypes.elementType.isRequired,
  types: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default ContentModelGraph;
