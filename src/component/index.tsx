import { get } from 'lodash/fp';
import { useSchema } from 'sanity';
import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import { Button, Inline, Label, Switch } from '@sanity/ui';

import getEdgesFromTypes from './utils/get-edges-from-types';
import getNodesFromTypes from './utils/get-nodes-from-types';
import FileSaver from 'file-saver';

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

const handleSave = ({ content, fileType, mimeType }) => {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  FileSaver.saveAs(blob, `content-model.${fileType}`);
};

const SwitchWithLabel = ({ checked, label, onChange }) => (
  <Inline space={[2, 3]}>
    <Switch checked={checked} label={label} onChange={onChange} />
    <Label size={0}>{label}</Label>
  </Inline>
);

export const ContentModelGraph = () => {
  const schema = useSchema();
  const types = get('_original.types', schema);

  const [svgString, setSvgString] = useState('');
  const [isShowingFields, setIsShowingFields] = useState(false);
  const [isShowingEdgeLabels, setIsShowingEdgeLabels] = useState(false);

  const edges = getEdgesFromTypes(types, isShowingEdgeLabels);
  const nodes = getNodesFromTypes(types, isShowingFields);

  const allItems = [header, edges, nodes, footer];

  const graphVizString = _.invokeMap(allItems, 'join', newLine).join(newLine);

  const fileDefinitions = [
    { content: svgString, fileType: 'svg', mimeType: 'image/svg+xml' },
    {
      content: graphVizString,
      fileType: 'gv',
      mimeType: 'application/octet-stream',
    },
  ];

  return (
    <Container>
      <h1>Content Model Graph</h1>
      <SwitchWithLabel
        checked={isShowingFields}
        label='Show fields'
        onChange={() => setIsShowingFields(!isShowingFields)}
      />
      <SwitchWithLabel
        checked={isShowingEdgeLabels}
        label='Show edge labels'
        onChange={() => setIsShowingEdgeLabels(!isShowingEdgeLabels)}
      />
      {_.map(fileDefinitions, (item) => (
        <Button
          key={item.fileType}
          type='button'
          onClick={() => handleSave(item)}
        >
          Save .{item.fileType}
        </Button>
      ))}
      <p>{JSON.stringify(types)}</p>
    </Container>
  );
};

export default ContentModelGraph;
