import { definePlugin } from 'sanity';
import { FaSitemap } from 'react-icons/fa';

import Component from './component';

interface ContentModelGraphConfig {
  /* nothing here yet */
}
export const ContentModelGraph = definePlugin<ContentModelGraphConfig | void>((config = {}) => ({
  ...config,
  tools: (prev) => {
    return [
      ...prev,
      {
        component: Component,
        name: 'sanity-plugin-content-model-graph',
        title: 'Content Model Graph',
        icon: FaSitemap,
      },
    ];
  },
}));

export default ContentModelGraph;
