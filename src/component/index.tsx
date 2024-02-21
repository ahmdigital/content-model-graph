import { get } from 'lodash/fp';
// @ts-ignore - It's complaining about typings here, but it's fine
import { Module, render } from 'viz.js/full.render';
import { useEffect, useState } from 'react';
import { useSchema } from 'sanity';
import _ from 'lodash';
import FileSaver from 'file-saver';
import styled from 'styled-components';
import Viz from 'viz.js';

import getEdgesFromTypes from './utils/get-edges-from-types';
import getNodesFromTypes from './utils/get-nodes-from-types';
import ToolbarHeader from './sub-components/toolbar-header';

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

const removeExplicitDimensions = (svgHtml: string) =>
  _.replace(svgHtml, /width="(.*?)" height="(.*?)"/, 'width="100%" height="100%"');

const handleSave = ({ content, fileType, mimeType }: { content: string; fileType: string; mimeType: string }) => {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  FileSaver.saveAs(blob, `content-model.${fileType}`);
};

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

  useEffect(() => {
    const viz = new Viz({ Module, render });
    viz.renderString(graphVizString).then(setSvgString).catch(setSvgString);
  }, [graphVizString]);

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
      <ToolbarHeader
        fileDefinitions={fileDefinitions}
        isShowingEdgeLabels={isShowingEdgeLabels}
        isShowingFields={isShowingFields}
        onChangeShowFields={() => setIsShowingFields(!isShowingFields)}
        onChangeShowEdgeLabels={() => setIsShowingEdgeLabels(!isShowingEdgeLabels)}
        onSaveClicked={handleSave}
      />
      <Wrapper
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: removeExplicitDimensions(svgString),
        }}
      />
    </Container>
  );
};

export default ContentModelGraph;
