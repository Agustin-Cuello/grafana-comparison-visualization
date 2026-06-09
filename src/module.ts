import { PanelPlugin } from '@grafana/data';
import { PanelOptions } from './types';
import { MatrixPanel } from './components/';

export const plugin = new PanelPlugin<PanelOptions>(MatrixPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'url',
      name: 'Image URL',
      defaultValue: 'https://',
    });
});
