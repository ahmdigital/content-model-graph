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

function handleSaveSvg() {

  let domUrl = window.URL || window.webkitURL || window;
  //border around object on export
  let margin = 0;

  if (!domUrl) {
    throw new Error(`(Browser does not support URI action ${domUrl})`)
  }

  // dynamically created viz doesn't have an id
  let src = document.querySelector(`.${styles.wrapper} > svg`);

  //get svg source
  let serializer = new XMLSerializer();
  let svgText = String(serializer.serializeToString(src));

  // it needs a namespace
  if (!svgText.match(/xmlns=\"/mi)){ //throws
    svgText = svgText.replace ('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ') ;  
  }

  // make a blob from the svg
  let svg = new Blob([svgText], {
    type: "image/svg+xml;charset=utf-8"
  });

  let url = domUrl.createObjectURL(svg);

  // figure out the height and width from svg text
  let matchH = (svgText).match(/height=\"(\d+)/m);
  let height = matchH && matchH[1] ? parseInt(matchH[1],10) : 200;
  let matchW = (svgText).match(/width=\"(\d+)/m);
  let width = matchW && matchW[1] ? parseInt(matchW[1],10) : 200;

  // create a canvas element to pass through
  let canvas = document.createElement("canvas");
  canvas.width = height+margin*2;
  canvas.height = width+margin*2;
  let ctx = canvas.getContext("2d");

  // create a new image to hold the converted type
  let img = new Image;
        
  // when the image is loaded we can get it as base64 url
  img.onload = function() {
    // draw it to the canvas
    ctx.drawImage(this, margin, margin);
    
    //optional fill - no client support at the moment
    // if it needs some styling, we need a new canvas
    // if (fill) {
    //   var styled = document.createElement("canvas");
    //   styled.width = canvas.width;
    //   styled.height = canvas.height;
    //   var styledCtx = styled.getContext("2d");
    //   styledCtx.save();
    //   styledCtx.fillStyle = fill;   
    //   styledCtx.fillRect(0,0,canvas.width,canvas.height);
    //   styledCtx.strokeRect(0,0,canvas.width,canvas.height);
    //   styledCtx.restore();
    //   styledCtx.drawImage (canvas, 0,0);
    //   canvas = styled;
    // }

    // we don't need the original any more
    domUrl.revokeObjectURL(url);
  };
  
  // load the image
  img.src = url;

  // pop up a download modal
  // must create element on the dom for firefox
  var downloadLink = document.createElement("a");
  downloadLink.href = img.src;
  downloadLink.download = "ContentModel.svg";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

const footer = ['}'];

const removeExplicitDimensions = svgHtml =>
  _.replace(svgHtml, /width="(.*?)" height="(.*?)"/, 'width="100%" height="100%"');

const ContentModelGraph = ({ Switch, types }) => {
  const viz = new Viz({ Module, render });
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
      <div className={styles.interactiveComponents}>
      <Switch checked={isShowingFields} label="Show fields" onChange={() => setIsShowingFields(!isShowingFields)} />
        <button onClick={handleSaveSvg}>Save</button>
      </div>
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
